import InstrumentAggregateCollection from "../dal/model/InstrumentAggregateEntry";
import { MongoLogger } from "../dal/MongoLogService";

export class InstrumentAggregateSearch
{
    logger:MongoLogger;
    constructor(logger:MongoLogger) 
    {
        this.logger = logger;
    }
    async search(searchParams:any,sortParams:any){

        let result = await InstrumentAggregateCollection.find(searchParams).sort(sortParams);//.limit(limit);
        return result;
    }
}