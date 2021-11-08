import { connect } from "mongoose";
import mongoDefaultConnection from "../../database/config";
import { TradingSessionEntry } from "../../model/TradingSessionEntry";
import InstrumentModelCollection from "./model/InstrumentSchema";
import TradingSessionStatusEntryCollection from "./model/TradingSessionStatusEntrySchema";
import { TradingSessionStatusSearchParams } from "./model/TradingSessionStatusSearchParams";
import { SearchOptions } from "./MongoSearchOptions";


export class MongoTradingSessionEntryService{

    async getTradingSessionEntry(
        search: TradingSessionStatusSearchParams = {},
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
        
        return await TradingSessionStatusEntryCollection.find(search).sort(sortParams).limit(limit);
    }

    async addTradingSessionEntry(entry:TradingSessionEntry):Promise<any>{
        await mongoDefaultConnection();
        
        let dbEntry = new TradingSessionStatusEntryCollection({
            InstrumentId:           entry.InstrumentId,
            SessionSubId:           entry.SessionSubId,
            SessionId:              entry.SessionId,
            InstrumentSecId:        entry.InstrumentSecId,
            InstrumentSecIdSource:  entry.InstrumentSecIdSource,
            SessionStatus:          entry.SessionStatus,
            TimeStamp:              entry.TimeStamp
        });

        await dbEntry.save();
    }
    async getSessionEventTable():Promise<any>{
        await mongoDefaultConnection();
        
        var verifiedInstruments = await InstrumentModelCollection.find({"Status":"VERIFIED"});
        console.log(verifiedInstruments);
        if(!verifiedInstruments.length){
            return null;
        }
        else {
            verifiedInstruments.forEach(element => {
                console.log(element.InstrumentId);
            });
            const merged = verifiedInstruments.map(async (item)=>{
                const status = await TradingSessionStatusEntryCollection.findOne({"InstrumentId":item.InstrumentId}).sort({TimeStamp:-1});
                let mergedItem: { InstrumentId: string, SessionSubId: string, SessionStatus: string, TimeStamp: string }[] = [
                    { 
                        "InstrumentId": item.InstrumentId, 
                        "SessionSubId": status.SessionSubId,
                        "SessionStatus":status.SessionStatus,
                        "TimeStamp":status.TimeStamp
                    }
                ];
                return mergedItem;
                
            });
            var final = Promise.all(merged);
        }
        return final;
    }
} 


/*
return  {
                    InstrumentId:item.InstrumentId,
                    SessionSubId:status.SessionSubId,
                    SessionStatus:status.SessionStatus,
                    TimeStamp:status.TimeStamp
                }   
*/