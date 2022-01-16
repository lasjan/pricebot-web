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
        console.log(JSON.stringify(searchParams));
        let results = await TradeSchema.find(searchParams.searchParamsTrades).sort({DateTime: 1});
        let map = results.map(item=>{
            return  {
                        InstrumentId:item.InstrumentId,
                        DateTime:item.DateTime,
                        AvgPrice:item.AvgPrice,
                        MinPrice:item.MinPrice,
                        MaxPrice:item.MaxPrice
                    }
        })
        //console.log(map);
        return map;
    }
}
    