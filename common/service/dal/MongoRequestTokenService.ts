//import { randomUUID } from "crypto";
import {v4 as uuidv4} from "uuid";
import mongoDefaultConnection from "../../database/config";
import { RequestToken } from "../../model/RequestToken";
import { getCurrentDate } from "../../utils";
import RequestTokenCollection from "./model/RequestTokenSchema";
import { RequestTokenSearchParams } from "./model/RequestTokenSearchParams";

export class MongoRequestTokenService{

    async getToken(search:RequestTokenSearchParams): Promise<any> {
        await mongoDefaultConnection();
        console.log(search);
        let results = await RequestTokenCollection.find(search).limit(1);
        if(results != null && results.length)
        {  
            
            let mapped = results.map(r=>{
                let smth =  {
                  Id:r.Id,
                  State:r.State,
                  Type:r.Type,
                  Requestor:r.Requestor,
                  RequestParams:r.RequestParams,
                  Response:r.Response,
                  TimeStamp:r.TimeStamp
                }  
                return smth;
              });

            return mapped;
        }
        return null;
    }
    async addToken(token:RequestToken): Promise<any> {
        console.log("this is roken: " +token);
        await mongoDefaultConnection();
        let query = 
        {   
            Id:             token.Id??uuidv4(),
            Type:           token.Type,
            Requestor:      token.Requestor,
            RequestParams:  token.RequestParams,
            Resolver:       token.Resolver,
            State:          "NEW",
            TimeStamp:      token.TimeStamp
        };
        var result = await RequestTokenCollection.create(query);
        //let mapped = result.map((r:any) =>  {Id:r.Id});
        return result.Id;
    }
    async setToken(id:string,token:RequestToken):Promise<any>{;
        await mongoDefaultConnection();
        var item = await RequestTokenCollection.findOne({Id:id});
        console.log("-->" + item);
        let now = getCurrentDate();
        item.State = token.State;
        item.RequestParams = token.RequestParams;
        item.Type = token.Type;
        item.Requestor = token.Requestor;
        item.Response = token.Response;
        item.Resolver = token.Resolver,
        item.TimeStamp = token.TimeStamp??now;

        await item.save();

    }
}