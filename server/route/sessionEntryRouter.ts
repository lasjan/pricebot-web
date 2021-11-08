import express from "express";
import { MongoTradingSessionEntryService } from "../../common/service/dal/MongoTradingSessionEntryService";

let sessionEntryRouter = express.Router();
let tradingSessionEntryService = new MongoTradingSessionEntryService();

//-----------------SESSION---------------------------------

sessionEntryRouter.get('/instrument/:instrument/top/:top',async (req, res)=>{
    try{
        let top = Number(req.params['top']);
        var dbEntries = await tradingSessionEntryService.getTradingSessionEntry(
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
sessionEntryRouter.get('/event',async (req, res)=>{
    try{
        var dbEntries = await tradingSessionEntryService.getSessionEventTable();
        res.send(dbEntries);
    }
    catch(ex){
        res.send(ex);
    }

});
sessionEntryRouter.post('/',async (req, res)=>{
    console.log('Got body:', req.body);
    try{
        await tradingSessionEntryService.addTradingSessionEntry(req.body)
        res.sendStatus(200);
    }
    catch(ex){
        console.log(ex);
        res.send(ex);
    }
})
export { sessionEntryRouter } 