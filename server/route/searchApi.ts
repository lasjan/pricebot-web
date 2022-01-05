import express from 'express';
import { MongoLogger } from '../../common/service/dal/MongoLogService';
import { InstrumentSearchEngine } from '../../common/service/search/InstrumentSearchEngine';
import Container from "typedi";
import { sleep } from '../../common/utils';
import { InstrumentSearchParamsBuild } from '../../common/service/search/model/search-builder/InstrumentSearchBuilder';

const searchRouter = express.Router();
const logger = Container.get(MongoLogger);
const instrumentSearchEngine = new InstrumentSearchEngine(logger);
//-------------------TOKEN-----------------------------

searchRouter.get('/instrument/multiname/:multiname/trackable/:trackable/persistent/:persistent/sortby/:sortby/sortdir/:sortdir/pagesize/:pagesize/index/:index', async function(req, res) {
    try{
        let searchQ = InstrumentSearchParamsBuild(req.params["multiname"],req.params["trackable"],req.params["persistent"]);
        logger.InternalLog("I","searchRouter.get","",JSON.stringify(searchQ),"start","");
        var results = await instrumentSearchEngine.search(
                Number(req.params["pagesize"]),
                Number(req.params["index"]),
                searchQ,
                {
                    sortby:req.params["sortby"],
                    sortdir:req.params["sortdir"]
                });
        logger.InternalLog("I","searchRouter.get","",JSON.stringify(results),"finish","");
        res.send(results);
    }
    catch(ex){
        let message = "";
        if (typeof ex === "string") {
            message = ex.toUpperCase();
        } else if (ex instanceof Error) {
            message = ex.message ;
        }  
        logger.InternalLog("E","searchRouter.get","",message,"","");
        res.send(ex);
    }
});
export { searchRouter } 