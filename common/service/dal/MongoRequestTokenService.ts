import { randomUUID } from "crypto";
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
        await mongoDefaultConnection();
        let query = 
        {   
            Id:             token.Id??randomUUID(),
            Type:           token.Type,
            Requestor:      token.Requestor,
            RequestParams:  JSON.stringify(token.RequestParams),
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
        item.Response = JSON.stringify(token.Response);
        item.Type = token.Type;
        item.Requestor = token.Requestor;
        item.Resolver = token.Resolver,
        item.Response = JSON.stringify(token.Response);
        item.TimeStamp = token.TimeStamp??now;

        await item.save();

    }
}