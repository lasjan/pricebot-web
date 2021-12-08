import express from "express";
import Container from "typedi";
import { NOLServerException } from "../../common/exception/NOLServerException";
import { MongoInstrMarketEntryService } from "../../common/service/dal/MongoInstrMarketEntryService";
import { MongoInstrumentService } from "../../common/service/dal/MongoInstrumentService";
import { MongoLogger } from "../../common/service/dal/MongoLogService";

let marketEntryRouter = express.Router();
marketEntryService : MongoInstrMarketEntryService;

const serviceInstance = Container.get(MongoInstrumentService);
const loggerInstance = Container.get(MongoLogger);
let marketEntryService = new MongoInstrMarketEntryService(serviceInstance,loggerInstance);

marketEntryRouter.get('/instrument/:instrument/type/:type/top/:top',async (req, res)=>{
    try{
        let top = Number(req.params['top']);
        var dbEntries = await marketEntryService.getInstrumentMarketEntry(
        {
            InstrumentId:req.params['instrument'].toUpperCase(),
            Type:req.params['type'].toUpperCase()
        },
        {
            Top:top,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        });
        res.send(dbEntries);
    }
    catch(ex){
        if(ex instanceof NOLServerException) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("Instrument not supported");
            res.end();
        }
        else {
            console.log(ex);
            res.sendStatus(400);
        }
    }

});

marketEntryRouter.post('/',async (req, res)=>{
    try {
        await marketEntryService.addInstrumentMarketEntry(req.body)

    res.sendStatus(200);}
    catch(ex){
        console.log(ex);
        res.sendStatus(400);
    } 
})


export { marketEntryRouter } 
