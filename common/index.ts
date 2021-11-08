import { Guid } from "guid-typescript";
import { MongoTokenService } from "./service/dal/MongoTokenService";
require('dotenv').config();

let service = new MongoTokenService();

(async ()=>{ 
    console.log(process.env.DB_CONN_STRING!);
    //var resolution = await service.setTokenForUserAction("runner","instrumentListGet",Guid.create().toString());
    var resolution = await service.getTokenForUserAction("runner","instrumentListGet");
    console.log(resolution);

})();