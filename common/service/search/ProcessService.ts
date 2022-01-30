import { Service } from "typedi";
import mongoDefaultConnection from "../../database/config";
import ProcessSchema from "../dal/model/ProcessSchema";



@Service()
export class ProcessService {
    async get(search:any = {}, options:any = {}): Promise<any> {
        
        await mongoDefaultConnection();
        let results = await ProcessSchema.findOne(search);

        return results;
    }
}