import moment from "moment";
import { Moment } from "moment";
import { connect } from "mongoose";
import { Service } from "typedi";
import { Instrument } from "../../model/Instrument";
import { getCurrentDate, getMDBConnString } from "../../utils";
import InstrumentModelCollection from "./model/InstrumentSchema";
import "reflect-metadata";
import { SearchOptions } from "./MongoSearchOptions";
import { InstrumentSearchParams } from "./model/InstrumentSearchParams";
import mongoDefaultConnection from "../../database/config";
import { NOLServerException } from "../../exception/NOLServerException";
@Service()
export class MongoInstrumentService {

    async getInstrument(search:InstrumentSearchParams = {},
        options:SearchOptions = 
        {
            Top:0,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }): Promise<any> {
        
        await mongoDefaultConnection();
        const sortDirection= options.SortDirection;
        const limit = options.Top??0;
        let results = await InstrumentModelCollection.find(search).sort({sortField: sortDirection}).limit(limit);

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
          });
        return mapped;
    }
    async addInstrument(instrument:Instrument):Promise<any>{
        await mongoDefaultConnection();
        
        let now = getCurrentDate();
        console.log(now);
        let dbEntry = new InstrumentModelCollection({
            InstrumentId:       instrument.InstrumentId,
            Status:             instrument.Status,
            Ticker:             instrument.Ticker,
            TaxId:              instrument.TaxId,
            IsTrackable:        instrument.IsTrackable,
            IsPersistent:       instrument.IsPersistent,
            ModifyDate:         now,
            TimeStamp:          now
        });

        if(!await InstrumentModelCollection.exists({InstrumentId:instrument.InstrumentId}))
        {
            await dbEntry.save();
        }
    }
    async setInstrument(id:string,instrument:Instrument):Promise<any>{
        await mongoDefaultConnection();
        let now = getCurrentDate();
        var item = await InstrumentModelCollection.findOne({InstrumentId:id});
        item.InstrumentId       = instrument.InstrumentId;
        item.Status             = instrument.Status;
        item.Ticker             = instrument.Ticker,
        item.TaxId              = instrument.TaxId,
        item.IsTrackable        = instrument.IsTrackable,
        item.IsPersistent       = instrument.IsPersistent,
        item.ModifyDate         = now;

        await item.save();
    }
    async putInstrument(id:string,partialInstrument:{}):Promise<any>{
        await mongoDefaultConnection();
        let now = getCurrentDate();
        let modDate = { ModifyDate: now};
        let extentedUpdateParams = {...partialInstrument,...modDate};
       
        await InstrumentModelCollection.findOneAndUpdate({InstrumentId:id},extentedUpdateParams);

    }
}