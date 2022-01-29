import express from 'express';
import { MongoLogger } from '../../common/service/dal/MongoLogService';
import { InstrumentSearchEngine } from '../../common/service/search/InstrumentSearchEngine';
import Container from "typedi";
import { sleep } from '../../common/utils';
import { InstrumentSearchParamsBuild } from '../../common/service/search/model/search-builder/InstrumentSearchBuilder';
import { TradeSearch } from '../../common/service/search/InstrumentTradeSearch';
import { TradeSearchBuilderParamsBuild } from '../../common/service/search/model/search-builder/TradeSearchBuilder';
import { InstrumentSortParamsBuild } from '../../common/service/search/model/search-builder/InstrumentSortParamsBuild';
import { CollarSearchBuilderParamsBuild } from '../../common/service/search/model/search-builder/CollarSearchBuilder';
import { CollarSearch } from '../../common/service/search/InstrumentCollarSearch';
import { AggregateSearchBuilderParamsBuild } from '../../common/service/search/model/search-builder/AggregateSearchBuilder';
import { InstrumentAggregateSearch } from '../../common/service/search/InstrumentAggregateSearch';

const searchRouter = express.Router();
const logger = Container.get(MongoLogger);
const instrumentSearchEngine = new InstrumentSearchEngine(logger);
const tradeSerchEngine = new TradeSearch(logger);
const collarSearchEngine = new CollarSearch(logger);
const aggreegateSearchEngine = new InstrumentAggregateSearch(logger);
searchRouter.get('/aggregate/instrumentid/:instrumentid/periodtype/:periodtype/from/:from/to/:to', async function(req, res){
    try{
        let searchQ = AggregateSearchBuilderParamsBuild(req.params["instrumentid"],req.params["periodtype"],req.params["from"],req.params["to"] );
        var results = await aggreegateSearchEngine.search(searchQ,{TimeStamp:-1});
        logger.InternalLog("I","searchRouterAggregate.get","",JSON.stringify(searchQ),"start","");
        res.send(results);
    }
    catch(ex){
        let message = "";
        if (typeof ex === "string") {
            message = ex.toUpperCase();
        } else if (ex instanceof Error) {
            message = ex.message ;
        }  
        logger.InternalLog("E","searchRouterAggregate.get","",message,"","");
        res.send(ex);
    }
});
searchRouter.get('/collar/instrumentid/:instrumentid/collartype/:collartype/periodtype/:periodtype/from/:from/to/:to', async function(req, res){
    try{
        let searchQ = CollarSearchBuilderParamsBuild(req.params["instrumentid"],req.params["collartype"],req.params["periodtype"],req.params["from"],req.params["to"] );
        var results = await collarSearchEngine.search(searchQ,null);
        logger.InternalLog("I","searchRouterCollar.get","",JSON.stringify(searchQ),"start","");
        res.send(results);
    }
    catch(ex){
        let message = "";
        if (typeof ex === "string") {
            message = ex.toUpperCase();
        } else if (ex instanceof Error) {
            message = ex.message ;
        }  
        logger.InternalLog("E","searchRouterCollar.get","",message,"","");
        res.send(ex);
    }
});
searchRouter.get('/instrument/multiname/:multiname/trackable/:trackable/persistent/:persistent/checkdate/:checkdate/sortby/:sortby/sortdir/:sortdir/pagesize/:pagesize/index/:index', async function(req, res) {
    try{

        let searchQ = InstrumentSearchParamsBuild(req.params["multiname"],req.params["trackable"],req.params["persistent"],req.params["checkdate"] );
        let sortQ = InstrumentSortParamsBuild(req.params["sortby"],req.params["sortdir"]);
        logger.InternalLog("I","searchRouter.get","",JSON.stringify(searchQ),"start","");
        var results = await instrumentSearchEngine.search(
                Number(req.params["pagesize"]),
                Number(req.params["index"]),
                searchQ,
                sortQ);
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