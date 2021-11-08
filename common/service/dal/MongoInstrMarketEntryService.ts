import { connect } from "mongoose";
import { NOLServerException } from "../../exception/NOLServerException";
import { InstrumentMarketEntry } from "../../model/InstrumentMarketEntry";
import InstrMarketEntryCollection from "./model/InstrumentMarketEntrySchema";
import { InstrumentMarketSearchParams } from "./model/InstrumentMarketSearchParams";
import { SearchOptions } from "./MongoSearchOptions";
import { MongoInstrumentService } from "./MongoInstrumentService";
import { Container, Service } from 'typedi';
import { getMDBConnString, sleep } from "../../utils";
import { verify } from "crypto";
import { Instrument } from "../../model/Instrument";
import mongoDefaultConnection from "../../database/config";

export class MongoInstrMarketEntryService{
    /**
     * @param {MongoInstrumentService} instrumentService
     */
    allowedInstr: Array<string> = ["BUMECH","ONEMORE"];
    private _instrumentService: MongoInstrumentService;
 
    constructor(instrumentService: MongoInstrumentService) {
        this._instrumentService = instrumentService;
    }
    async getInstrumentMarketEntry(
        search:InstrumentMarketSearchParams = {},
        options:SearchOptions = 
        {
            Top:1,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }): Promise<any> 
    {
        
        await mongoDefaultConnection();
     
        const sortDirection= options.SortDirection=="desc"?"-":"";
        const limit = options.Top??1;
        const sortParams = sortDirection + options.SortBy;
        console.log(options);
        console.log(sortParams);
        let instrument = await this._instrumentService.getInstrument(
        {
            InstrumentId:search.InstrumentId
        });

        if(instrument == null || instrument.length == 0){
            let freshInstrument = new Instrument({InstrumentId:search.InstrumentId});
            await this._instrumentService.addInstrument(freshInstrument);   

            let cntInt = 0 ;
            while(cntInt++<10){

                instrument = await this._instrumentService.getInstrument(
                    {
                        InstrumentId:search.InstrumentId
                    });
                if(instrument != null && instrument.length != 0 &&instrument[0].Status != "NEW"){
                    break;
                }
                await sleep(1000);
            }
        }
        if(instrument != null && instrument.length != 0){
            if(instrument[0].Status == "REJECTED"){;
                throw new NOLServerException("Bad instrument name");
            }
        }
        let results = await InstrMarketEntryCollection.find(search).sort(sortParams).limit(limit);

        if(results == null || !results.length)
        { 
            let cntInt = 0 ;
            while(cntInt++<10){
                results = await InstrMarketEntryCollection.find(search).sort(sortParams).limit(limit);
                if(!(results == null || !results.length)){
                    break;
                }
                await sleep(1000);
            }
        }
       
        let mapped = results.map(r=>{
            let smth =  {
              InstrumentId:r.InstrumentId,
              Type:r.Type,
              DateTime:r.DateTime,
              TimeStamp: r.TimeStamp,
              Price:r.Price
            }  
            return smth;
          });

          return mapped;
    }

    async addInstrumentMarketEntry(entry:InstrumentMarketEntry):Promise<any>{
        await mongoDefaultConnection();
        
        let dbEntry = new InstrMarketEntryCollection({
            InstrumentId:   entry.InstrumentId,
            Type:           entry.Type,
            TimeStamp:      entry.TimeStamp,
            DateTime:       entry.DateTime,
            Price:          entry.Price,
            Currency:       entry.Currency,
            size:           entry.Size,
            OrdersCount:    entry.OrdersCount,
            PriceLevel:     entry.PriceLevel,
            Turnover:       entry.Turnover
        });

        await dbEntry.save();
    }
} 