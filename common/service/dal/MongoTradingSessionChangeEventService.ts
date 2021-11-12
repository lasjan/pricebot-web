import { connect } from "mongoose";
import mongoDefaultConnection from "../../database/config";
import { TradingSessionChangeEvent } from "../../model/TradingSessionChangeEvent";
import { TradingSessionEntry } from "../../model/TradingSessionEntry";
import InstrumentModelCollection from "./model/InstrumentSchema";
import TradingSessionChangeEventCollection from "./model/TradingSessionChangeEventSchema";
import TradingSessionStatusEntryCollection from "./model/TradingSessionStatusEntrySchema";
import { TradingSessionStatusSearchParams } from "./model/TradingSessionStatusSearchParams";
import { SearchOptions } from "./MongoSearchOptions";


export class MongoTradingSessionChangeEventService{

    async getTradingSessionChangeEvent(
        search: {},
        options:SearchOptions = 
        {
            Top:1,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }): Promise<any> {
        await mongoDefaultConnection();
        const sortDirection= options.SortDirection=="desc"?"-":"";
        const limit = options.Top??1;
        const sortParams = sortDirection + options.SortBy;
        
        return await TradingSessionChangeEventCollection.find(search).sort(sortParams).limit(limit);
    }

    async addTradingSessionChangeEvent(event:TradingSessionChangeEvent):Promise<any>{
        await mongoDefaultConnection();
        
        let dbEntry = new TradingSessionChangeEventCollection({
            InstrumentId:           event.InstrumentId,
            CurrentSessionSubId:    event.CurrentSessionSubId,
            PreviousSessionSubId:   event.PreviousSessionSubId,
            CurrentSessionStatus:   event.CurrentSessionStatus,
            PreviousSessionStatus:  event.PreviousSessionStatus,
            TimeStamp:              event.TimeStamp
        });

        await dbEntry.save();
    }
    
} 

