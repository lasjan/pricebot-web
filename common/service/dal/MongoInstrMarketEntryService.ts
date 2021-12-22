import { connect } from "mongoose";
import { NOLServerException } from "../../exception/NOLServerException";
import { InstrumentMarketEntry } from "../../model/InstrumentMarketEntry";
import InstrMarketEntryCollection from "./model/InstrumentMarketEntrySchema";
import { InstrumentMarketSearchParams } from "./model/InstrumentMarketSearchParams";
import { SearchOptions } from "./MongoSearchOptions";
import { MongoInstrumentService } from "./MongoInstrumentService";
import { MongoLogger } from "./MongoLogService";
import { Container, Service } from 'typedi';
import { verify } from "crypto";
import { Instrument } from "../../model/Instrument";
import mongoDefaultConnection from "../../database/config";
import { MongoRequestTokenService } from "./MongoRequestTokenService";
import { getCurrentDate, sleep } from "../../utils";
import { RequestToken } from "../../model/RequestToken";
export class MongoInstrMarketEntryService{
    /**
     * @param {MongoInstrumentService} instrumentService
     */

    private _instrumentService: MongoInstrumentService;
    private _logger: MongoLogger;
    private _tokenService:MongoRequestTokenService;
    constructor(instrumentService: MongoInstrumentService,
        logger:MongoLogger,
        tokenService:MongoRequestTokenService) {
        this._instrumentService = instrumentService;
        this._logger = logger;
        this._tokenService = tokenService;
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
        console.log(search);
        let instrument = await this._instrumentService.getInstrument(
        {
            InstrumentId:search.InstrumentId
        });
        this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"search",JSON.stringify(search),"");
        let now = getCurrentDate();
        if(instrument == null || instrument.length == 0 || (instrument.length > 0 && instrument[0].Status == "FETCHED")){
            this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"not found",JSON.stringify(search),"");
            let freshInstrument = new Instrument({InstrumentId:search.InstrumentId});
            
            let token = new RequestToken({
                Type: "PUTINSTRUMENT",
                Requestor:"WEBAPI",
                RequestParams: {InstrumentId:search.InstrumentId,AddToListIfValid:true},
                TimeStamp:now.toString()
            });
            await this._tokenService.addToken(token);
            this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"saved",JSON.stringify(search),"");
            let cntInt = 0 ;
            while(cntInt++<10){

                instrument = await this._instrumentService.getInstrument(
                    {
                        InstrumentId:search.InstrumentId
                    });
                this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"checking",JSON.stringify(search),cntInt.toString());
                if(instrument != null 
                    && instrument.length != 0 
                    && instrument[0].Status != "NEW"
                    && instrument[0].Status != "PENDING"){
                    break;
                }
                await sleep(1000);
            }
            this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"loop finish",JSON.stringify(search),cntInt.toString());
        }
        console.log(instrument);
        if(instrument != null && instrument.length != 0){
            if(instrument[0].Status == "REJECTED"){;
                this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"rejected",JSON.stringify(search),"");
                throw new NOLServerException("Bad instrument name");
            }
        }
        let resultsMkt = await InstrMarketEntryCollection.find(search).sort(sortParams).limit(limit);
        this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"searchMKT",JSON.stringify(search),JSON.stringify(resultsMkt));
        if(!(resultsMkt == null || !resultsMkt.length))
        { 
            return resultsMkt;
        }

        let tokenMkt = new RequestToken({
            Type: "GETMARKETDATA",
            Requestor:"WEBAPI",
            RequestParams: {InstrumentId:search.InstrumentId,EntryType:search.Type},
            TimeStamp:now.toString()
        });
        var tokenMarketId = await this._tokenService.addToken(tokenMkt);
        this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"searchTOKEN",JSON.stringify(search),tokenMarketId);


        let cntInt = 0 ;

        while(cntInt++<15){
            let results = await this._tokenService.getToken({Id:tokenMarketId,State:"RESOLVED"});
            this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"searchTOKEN",JSON.stringify(results),cntInt.toString());
            if(!(results == null || !results.length)){
                this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"searchTOKEN",JSON.stringify(results),cntInt.toString());
                let fakeArr = [];
                let mapped = new InstrumentMarketEntry(JSON.parse(results[0].Response));
                fakeArr.push(mapped);
                return fakeArr;
            }
            await sleep(1000);
        }
        return null;
        /*
        let results = await InstrMarketEntryCollection.find(search).sort(sortParams).limit(limit);
        this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"searchMKT",JSON.stringify(search),JSON.stringify(results));
        if(results == null || !results.length)
        { 
            this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"noResultsMKT",JSON.stringify(search),"");
            let cntInt = 0 ;
            while(cntInt++<15){
                results = await InstrMarketEntryCollection.find(search).sort(sortParams).limit(limit);
                this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"searchLoopMKT",JSON.stringify(results),cntInt.toString());
                if(!(results == null || !results.length)){
                    this._logger.InternalLog("D", "getInstrumentMarketEntry",JSON.stringify(instrument),"foundMKT",JSON.stringify(results),cntInt.toString());
              
                    break;
                }
                await sleep(1000);
            }
        }
       */

    }

    async addInstrumentMarketEntry(entry:InstrumentMarketEntry):Promise<any>{
        await mongoDefaultConnection();
        
        let query = 
        {   
            InstrumentId:   entry.InstrumentId,
            Type:           entry.Type,
            DateTime:       entry.DateTime,
            Price:          entry.Price,
            Currency:       entry.Currency,
            Size:           entry.Size,
            OrdersCount:    entry.OrdersCount,
            PriceLevel:     entry.PriceLevel,
            Turnover:       entry.TurnoverValue
        };
        let update = 
        {
            TimeStamp:      entry.TimeStamp
        };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };

        /*let dbEntry = new InstrMarketEntryCollection({
            InstrumentId:   entry.InstrumentId,
            Type:           entry.Type,
            TimeStamp:      entry.TimeStamp,
            DateTime:       entry.DateTime,
            Price:          entry.Price,
            Currency:       entry.Currency,
            size:           entry.Size,
            OrdersCount:    entry.OrdersCount,
            PriceLevel:     entry.PriceLevel,
            Turnover:       entry.TurnoverValue
        });*/

        await InstrMarketEntryCollection.findOneAndUpdate(query,update,options);
    }

} 