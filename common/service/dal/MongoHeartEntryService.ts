import { connect } from "mongoose";
import { Service } from "typedi";
import { getCurrentDate, getMDBConnString } from "../../utils";
import "reflect-metadata";
import { SearchOptions } from "./MongoSearchOptions";
import HeartModelCollection from "./model/HeartEntrySchema";
import { Heart } from "../../model/Heart";
import mongoDefaultConnection from "../../database/config";

@Service()
export class MongoInstrumentService {

    async getHeart(search: {},
        options:SearchOptions = 
        {
            Top:1,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }): Promise<any> {
        
        await mongoDefaultConnection();
        const sortDirection= options.SortDirection;
        const limit = options.Top??1;
            //console.log(search);
        return await HeartModelCollection.find(search).sort({sortField: sortDirection}).limit(limit);
    }
    async addHeart(heart:Heart): Promise<any> {
        
        await mongoDefaultConnection();
        let now = getCurrentDate();
        let dbEntry = new HeartModelCollection({
            HeartId:        heart.HeartId,
            Status:         heart.Status,
            ModifyDate:     now,
            TimeStamp:      now
        });
        if(!await HeartModelCollection.exists({HeartId:heart.HeartId}))
        {
            await dbEntry.save();
        }
    }
    async setHeart(heart:Heart): Promise<any> {
        
        await mongoDefaultConnection();
        let now = getCurrentDate();
        await HeartModelCollection.updateOne({HeartId:heart.HeartId},{Status:heart.Status});
    }
}