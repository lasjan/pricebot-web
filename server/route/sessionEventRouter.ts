import express from "express";
import Container from "typedi";
import { BuildSessionChangeParams } from "../../common/service/dal/model/search-builders/TradingSessionChangeEventParamBuilder";
import { MongoLogger } from "../../common/service/dal/MongoLogService";
import { MongoTradingSessionChangeEventService } from "../../common/service/dal/MongoTradingSessionChangeEventService";
import { MongoTradingSessionEntryService } from "../../common/service/dal/MongoTradingSessionEntryService";
import { NULL_VAL } from "../../common/wildcards";

let sessionEventRouter = express.Router();
const serviceInstance = Container.get(MongoLogger);
let tradingSessionEventService = new MongoTradingSessionChangeEventService(serviceInstance);

//-----------------SESSION---------------------------------


sessionEventRouter.get('/instrumentId/:instrumentId/type/:type/subtype/:subtype/top/:top',async (req, res)=>{
    try{
        let top = Number(req.params['top']);
        let searchParams = BuildSessionChangeParams(req.params["instrumentId"],
        req.params["type"],
        req.params["subtype"],
        NULL_VAL,
        NULL_VAL);
        var dbEntries = await tradingSessionEventService.getTradingSessionChangeEventWithMarketEntry(
            searchParams,
            [],
            {
                Top:top,
                SortBy:"TimeStamp",
                SortDirection:"desc"
            });
        res.send(dbEntries);
    }
    catch(ex){
        res.send(ex);
    }

});
sessionEventRouter.get('/instrumentId/:instrumentId/type/:type/subtype/:subtype/markettypes/:markettypes/top/:top',async (req, res)=>{
    try{
        let top = Number(req.params['top']);
        let searchParams = BuildSessionChangeParams(req.params["instrumentId"],
        req.params["type"],
        req.params["subtype"],
        NULL_VAL,
        NULL_VAL);
        let auxMktTypes:string[] = [];
        if(req.params["markettypes"]!=null && req.params["markettypes"]!=NULL_VAL){
            auxMktTypes = req.params["markettypes"].split(",");
        }
        var dbEntries = await tradingSessionEventService.getTradingSessionChangeEventWithMarketEntry(
            searchParams,
            auxMktTypes,
            {
                Top:top,
                SortBy:"TimeStamp",
                SortDirection:"desc"
            });
        res.send(dbEntries);
    }
    catch(ex){
        res.send(ex);
    }

});
sessionEventRouter.post('/',async (req, res)=>{

    try{
        await tradingSessionEventService.addTradingSessionChangeEvent(req.body)
        res.sendStatus(200);
    }
    catch(ex){
        console.log(ex);
        res.send(ex);
    }
})
export { sessionEventRouter } 