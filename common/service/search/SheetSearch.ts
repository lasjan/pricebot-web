import mongoDefaultConnection from "../../database/config";
import SheetModelCollection from "../dal/model/SheetSchema";
import TradeSchema from "../dal/model/TradeSchema";
import { MongoLogger } from "../dal/MongoLogService";
import { MongoTradeService } from "../dal/MongoTradeService";
import { SheetSearchParams } from "../dal/model/SheetSearchParams";
export class SheetSearch{
    //instrumentCollection:MongoInstrumentService;
    logger:MongoLogger;
    constructor(logger:MongoLogger) 
    {
        this.logger = logger;
    }
    async search(searchParams:SheetSearchParams,sortParams:any){
        await mongoDefaultConnection();
        console.log(JSON.stringify(searchParams));
        let results = await SheetModelCollection.find(searchParams).sort({DateTime: 1});
        let map = results.map(item=>{
            return  {
                        InstrumentId:item.InstrumentId,
                        Level:item.Level,
                        Type: item.Type,
                        Currency: item.Currency,
                        OrdersCount: item.OrdersCount,
                        Price: item.Price,
                        Size:item.Size,
                        TimeStamp: item.TimeStamp
                    }
        })
        //console.log(map);
        return map;
    }
}
    