import express from 'express';
import { MongoLogger } from '../../common/service/dal/MongoLogService';
import { InstrumentSearchEngine } from '../../common/service/search/InstrumentSearchEngine';
import Container from "typedi";
import { sleep } from '../../common/utils';
import { InstrumentSearchParamsBuild } from '../../common/service/search/model/search-builder/InstrumentSearchBuilder';
import { TradeSearch } from '../../common/service/search/InstrumentTradeSearch';
import { TradeSearchBuilderParamsBuild } from '../../common/service/search/model/search-builder/TradeSearchBuilder';

const searchRouter = express.Router();
const logger = Container.get(MongoLogger);
const instrumentSearchEngine = new InstrumentSearchEngine(logger);
const tradeSerchEngine = new TradeSearch(logger);
//-------------------TOKEN-----------------------------

searchRouter.get('/instrument/multiname/:multiname/trackable/:trackable/persistent/:persistent/checkdate/:checkdate/sortby/:sortby/sortdir/:sortdir/pagesize/:pagesize/index/:index', async function(req, res) {
    try{

        let searchQ = InstrumentSearchParamsBuild(req.params["multiname"],req.params["trackable"],req.params["persistent"],req.params["checkdate"] );
        
        logger.InternalLog("I","searchRouter.get","",JSON.stringify(searchQ),"start","");
        var results = await instrumentSearchEngine.search(
                Number(req.params["pagesize"]),
                Number(req.params["index"]),
                searchQ,
                {
                    sortby:req.params["sortby"],
                    sortdir:req.params["sortdir"]
                });
        logger.InternalLog("I","searchRouterInstrument.get","",JSON.stringify(results),"finish","");
        res.send(results);
    }
    catch(ex){
        let message = "";
        if (typeof ex === "string") {
            message = ex.toUpperCase();
        } else if (ex instanceof Error) {
            message = ex.message ;
        }  
        logger.InternalLog("E","searchRouterInstrument.get","",message,"","");
        res.send(ex);
    }
});
searchRouter.get('/trade/indestrumentid/:instrumentid/periodtype/:periodtype/from/:from/to/:to', async function(req, res){
    try{
        let searchQ = TradeSearchBuilderParamsBuild(req.params["instrumentid"],req.params["periodtype"],req.params["from"],req.params["to"] );
        var results = await tradeSerchEngine.search(searchQ,null);
        logger.InternalLog("I","searchRouterTrade.get","",JSON.stringify(searchQ),"start","");
        res.send(results);
    }
    catch(ex){
        let message = "";
        if (typeof ex === "string") {
            message = ex.toUpperCase();
        } else if (ex instanceof Error) {
            message = ex.message ;
        }  
        logger.InternalLog("E","searchRouterTrade.get","",message,"","");
        res.send(ex);
    }
});
export { searchRouter } 