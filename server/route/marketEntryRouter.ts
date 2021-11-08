import express from "express";
import Container from "typedi";
import { NOLServerException } from "../../common/exception/NOLServerException";
import { MongoInstrMarketEntryService } from "../../common/service/dal/MongoInstrMarketEntryService";
import { MongoInstrumentService } from "../../common/service/dal/MongoInstrumentService";

let marketEntryRouter = express.Router();
marketEntryService : MongoInstrMarketEntryService;

const serviceInstance = Container.get(MongoInstrumentService);
let marketEntryService = new MongoInstrMarketEntryService(serviceInstance);

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
    console.log('Got body:', req.body);
    await marketEntryService.addInstrumentMarketEntry(req.body)
    //res.send('post!');
    res.sendStatus(200);
})


export { marketEntryRouter } 