import TradingSessionChangeEventCollection from "../dal/model/TradingSessionChangeEventSchema";
import { MongoLogger } from "../dal/MongoLogService";

export class CollarSearch{
    //instrumentCollection:MongoInstrumentService;
    logger:MongoLogger;
    constructor(logger:MongoLogger) 
    {
        this.logger = logger;
    }
    async search(searchParams:any,sortParams:any){

        let result = await TradingSessionChangeEventCollection.find(searchParams.searchParamsCollar).sort({TimeStamp:1});//.limit(limit);
        return result;
    }
}


