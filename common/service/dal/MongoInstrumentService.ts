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
            Top:1,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }): Promise<any> {
        
        await mongoDefaultConnection();
        const sortDirection= options.SortDirection;
        const limit = options.Top??0;
            //console.log(search);
        let results = await InstrumentModelCollection.find(search).sort({sortField: sortDirection}).limit(limit);
        if(results == null || !results.length)
        { 
            throw new NOLServerException("Not found");
        }
        let mapped = results.map(r=>{
            let smth =  {
              InstrumentId:r.InstrumentId,
              Status:r.Status,
              ModifyDate:r.ModifyDate,
              TimeStamp:r.TimeStamp
            }  
            return smth;
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
        console.log("-->" + item);
        item.InstrumentId = instrument.InstrumentId;
        item.Status = instrument.Status;
        item.ModifyDate = now;

        await item.save();

    }
}