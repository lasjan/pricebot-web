import express from "express";
import { MongoTradingSessionChangeEventService } from "../../common/service/dal/MongoTradingSessionChangeEventService";
import { MongoTradingSessionEntryService } from "../../common/service/dal/MongoTradingSessionEntryService";

let sessionEventRouter = express.Router();
let tradingSessionEventService = new MongoTradingSessionChangeEventService();

//-----------------SESSION---------------------------------

sessionEventRouter.get('/instrument/:instrument/top/:top',async (req, res)=>{
    try{
        let top = Number(req.params['top']);
        var dbEntries = await tradingSessionEventService.getTradingSessionChangeEvent(
        {
            InstrumentId:req.params["instrument"]
        },
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
sessionEventRouter.get('/top/:top',async (req, res)=>{
    try{
        let top = Number(req.params['top']);
        var dbEntries = await tradingSessionEventService.getTradingSessionChangeEvent(
        {},
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