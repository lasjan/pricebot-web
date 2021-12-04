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
        return await InstrumentModelCollection.find(search).sort({sortField: sortDirection}).limit(limit);
    }
    async addInstrument(instrument:Instrument):Promise<any>{
        await mongoDefaultConnection();
        
        let now = getCurrentDate();
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
    async setInstrument(instrument:Instrument):Promise<any>{
        //await connect(getMDBConnString(process.env.DB_NOL3_USER!,process.env.DB_NOL3_USER_PASS!));
        await mongoDefaultConnection();
        let now = getCurrentDate();;
        await InstrumentModelCollection.updateOne({InstrumentId:instrument.InstrumentId},{Status:instrument.Status});

    }
}