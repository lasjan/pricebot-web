import { Service } from "typedi";
import mongoDefaultConnection from "../../database/config";
import TradeSchema from "./model/TradeSchema";

@Service()
export class MongoTradeService {
    async get(search:any = {}, options:any = {}): Promise<any> {
        
        await mongoDefaultConnection();
        let results = await TradeSchema.find(search).sort({DateTime: 1});
/*
        let mapped = results.map(item=>{

            let instrument = new Instrument ({
            InstrumentId:item.InstrumentId,
            Status:item.Status,
            Ticker:item.Ticker,
            TaxId:item.TaxId,
            IsTrackable:item.IsTrackable,
            IsPersistent:item.IsPersistent,
            }); 
            return instrument;
        });*/
        return results;
    }
}