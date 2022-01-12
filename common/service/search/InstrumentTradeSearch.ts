import mongoDefaultConnection from "../../database/config";
import TradeSchema from "../dal/model/TradeSchema";
import { MongoLogger } from "../dal/MongoLogService";
import { MongoTradeService } from "../dal/MongoTradeService";

export class TradeSearch{
    //instrumentCollection:MongoInstrumentService;
    logger:MongoLogger;
    constructor(logger:MongoLogger) 
    {
        this.logger = logger;
    }
    async search(searchParams:any,sortParams:any){
        await mongoDefaultConnection();
        let results = await TradeSchema.find(searchParams.searchParamsTrades).sort({DateTime: 1});

        return results;
    }
}
    