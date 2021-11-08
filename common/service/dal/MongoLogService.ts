import { Service } from "typedi";
import mongoDefaultConnection from "../../database/config";
import { getCurrentDate } from "../../utils";
import LogModelCollection from "./model/LogSchema";


@Service()
export class MongoLogger{
   
    public async InternalLog(reqIp:string,reqUrl:string,arg1:string,arg2:string,arg3:string)
    {
        const { APP_INSTANCE } = process.env;
        const { APP_SERVER } = process.env;
        console.log("internal: " + APP_INSTANCE + "," + APP_SERVER);

        await mongoDefaultConnection();
        let now = getCurrentDate();
        console.log(now);
        let dbEntry = new LogModelCollection({
            AppName:        APP_INSTANCE,
            AppServer:      APP_SERVER,
            Context:        reqIp,
            Slot1:          reqUrl,
            Slot2:          arg1,    
            Slot3:          arg2,  
            TimeStamp:      now
        });
        await dbEntry.save();
    }
}