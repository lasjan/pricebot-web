import { connect } from "mongoose";
import mongoDefaultConnection from "../../database/config";
import { TradingSessionChangeEvent } from "../../model/TradingSessionChangeEvent";
import { TradingSessionEntry } from "../../model/TradingSessionEntry";
import InstrMarketEntryCollection from "./model/InstrumentMarketEntrySchema";
import InstrumentModelCollection from "./model/InstrumentSchema";
import TradingSessionChangeEventCollection from "./model/TradingSessionChangeEventSchema";
import { TradingSessionChangeEventSearchParams } from "./model/TradingSessionChangeEventSearchParams";
import TradingSessionStatusEntryCollection from "./model/TradingSessionStatusEntrySchema";
import { TradingSessionStatusSearchParams } from "./model/TradingSessionStatusSearchParams";
import { MongoLogger } from "./MongoLogService";
import { SearchOptions } from "./MongoSearchOptions";


export class MongoTradingSessionChangeEventService{
    private _loggerService: MongoLogger;
    constructor(loggerService: MongoLogger) {
        this._loggerService = loggerService;
    }
    async getTradingSessionChangeEvent(
        search: TradingSessionChangeEventSearchParams = {},
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
            Type:                   event.Type,
            SubType:                event.SubType,
            TimeStamp:              event.TimeStamp
        });
        try{
            await dbEntry.save();
        }
        catch(ex:any){
            if(ex instanceof Error){
            this._loggerService.InternalLog("E","MongoTradingSessionChangeEventService.addTradingSessionChangeEvent",(ex as Error).message,dbEntry,"","");
        }
        }
    }
    async getTradingSessionChangeEventWithMarketEntry(
        search: TradingSessionChangeEventSearchParams = {},
        marketEntriesTypeToJoin: string[] = [],
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
        let eventColletion = await TradingSessionChangeEventCollection.find(search).sort(sortParams).limit(limit);
        if(!eventColletion.length){
            return null;
        }
        //console.log(eventColletion);
        const merged = eventColletion.map(async (item)=>{
            let auxData: Array<{ 
                "Type" : string, 
                "Price": string, 
                "Turnover": string,
                "TimeStamp":Date
             }>;
            auxData = [];
            for(const mktReqType of marketEntriesTypeToJoin) {
                const marketEntry = await InstrMarketEntryCollection.findOne({"InstrumentId":item.InstrumentId,"Type":mktReqType}).sort({TimeStamp:-1});
                //console.log(item.InstrumentId +"," +marketEntry);
                if(marketEntry){
                    auxData.push({
                        "Type": marketEntry.Type,
                        "Price":marketEntry.Price,
                        "Turnover":marketEntry.Turnover,
                        "TimeStamp": marketEntry.TimeStamp
                    });
                }
                //console.log(auxData);
            };
            //console.log("==>" + auxData);
            //let mergedItem = {...item.toObject(), ...{ market: auxData} };
            let smth =  {
                EventId:item.EventId,
                InstrumentId:item.InstrumentId,
                CurrentSessionSubId: item.CurrentSessionSubId,
                PreviousSessionSubId: item.PreviousSessionSubId,
                CurrentSessionStatus: item.CurrentSessionStatus,
                PreviousSessionStatus: item.PreviousSessionStatus,
                Type: item.Type,
                SubType: item.SubType,
                TimeStamp: item.TimeStamp,
                market:auxData
              }  
              return smth;

            //return mergedItem;
           
        });
        var final = Promise.all(merged);
        return final;
    }
    
} 

