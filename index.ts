import { InstrumentMarketEntry } from "./common/model/InstrumentMarketEntry";
import { MongoInstrMarketEntryService } from "./common/service/dal/MongoInstrMarketEntryService";
import { getMDBConnString } from "./common/utils";
import serverStart from "./server/worker";

require('dotenv').config();


serverStart();

/*
let marketMongoService = new MongoInstrMarketEntryService();

(async ()=>{marketMongoService.addInstrumentMarketEntry(new InstrumentMarketEntry({
    InstrumentId : "COMANCZ",
    Type:"low"
}));})();


(async ()=>{console.log(await marketMongoService.getInstrumentMarketEntry({}));})();
*/