import { query } from "express";
import mongoDefaultConnection from "../../database/config";
import { NOLServerException } from "../../exception/NOLServerException";
import { InstrumentMarketEntry } from "../../model/InstrumentMarketEntry";
import InstrMarketEntryCollection from "./model/InstrumentMarketEntrySchema";
import { InstrumentMarketSearchParams } from "./model/InstrumentMarketSearchParams";
import { MongoLogger } from "./MongoLogService";
import { SearchOptions } from "./MongoSearchOptions";

export class MongoMarketEntryService{
    private _logger: MongoLogger;
    constructor(logger:MongoLogger) 
    {
        this._logger = logger;
    }
    async getMarketEntry(
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

        let results = await InstrMarketEntryCollection.find(search).sort(sortParams).limit(limit);
        if(results == null || !results.length)
        { 
            throw new NOLServerException("Not found");
        }
        let mapped = results.map(r=>{
            let smth =  {
              InstrumentId:r.InstrumentId,
              Type:r.Type,
              DateTime:r.DateTime,
              TimeStamp: r.TimeStamp,
              Price:r.Price,
              TurnoverValue:r.TurnoverValue,
              OrdersCount:r.OrdersCount
            }  
            return smth;
          });
          this._logger.InternalLog("D", "MongoMarketEntryService.getMarketEntry",JSON.stringify(search.InstrumentId),"mapped",JSON.stringify(search),JSON.stringify(mapped));
              
          return mapped;
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
            TurnoverValue:  entry.TurnoverValue
        };
        let update = 
        {
            TimeStamp:      entry.TimeStamp
        };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await InstrMarketEntryCollection.findOneAndUpdate(query,update,options);
    }

    async addInstrumentMarketEntryMulti(entries:[])
    {
        await mongoDefaultConnection();
        console.log("start");
        for(const element of entries)
        {
            let entry = new InstrumentMarketEntry(element);
            let query = 
            {   
                InstrumentId:   entry.InstrumentId,
                Type:           entry.Type
            };
            if(entry.Type.toUpperCase() == "TRADE")
            {
                let dateQuery = {
                    DateTime:entry.DateTime
                };
                query = {...query,...dateQuery };
            }
            let update = 
            {
                Price:          entry.Price,
                Currency:       entry.Currency,
                Size:           entry.Size,
                OrdersCount:    entry.OrdersCount,
                PriceLevel:     entry.PriceLevel,
                TurnoverValue:  entry.TurnoverValue,
                DateTime:       entry.DateTime,
                TimeStamp:      entry.TimeStamp
            }
            let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await InstrMarketEntryCollection.findOneAndUpdate(query,update,options);
        }
        //await InstrMarketEntryCollection.insertMany(entries);
        console.log("stop");
    }
}