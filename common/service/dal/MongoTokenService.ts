import moment from "moment";
import { Moment } from "moment";
import { connect } from "mongoose";
import { getMDBConnString } from "../../utils";
import { ITokenService } from "../ITokenService";
import RefreshTokenModelCollection from "./model/RefreshTokenSchema";

//const tokens = require ("./model/RefreshTokenSchema");


export class MongoTokenService implements ITokenService{

    async getTokenForUserAction(userId:string,actionName:string): Promise<string> {
        
        await connect(getMDBConnString(process.env.DB_NOL3_USER!,process.env.DB_NOL3_USER_PASS!));
        //(process.env.DB_CONN_STRING! +"/" + process.env.DB_NAME + process.env.DB_AUTHSOURCE_URI);
        return await RefreshTokenModelCollection.findOne({tokenUserId:userId,tokenAction:actionName});
    }
    async setTokenForUserAction(userId:string,actionName:string,tokenValue:string):Promise<any>{
        await connect(process.env.DB_CONN_STRING! +"/" + process.env.DB_NAME + process.env.DB_AUTHSOURCE_URI);
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'; 
        let now: Moment;
        now = moment(new Date(), DATE_TIME_FORMAT);
        await RefreshTokenModelCollection.findOneAndUpdate(
                                                    {tokenUserId:userId,tokenAction:actionName},
                                                    {tokenValue:tokenValue,tokenRefreshDate:now},
                                                    {upsert: true});
    }
}