import express from 'express';
import { NOLServerException } from '../../common/exception/NOLServerException';
import { Instrument } from '../../common/model/Instrument';
import { BuildInstrumentSearchParams } from '../../common/service/dal/model/search-builders/InstrumentParamBuilder';
import { BuildInstrumentUpdateParams } from '../../common/service/dal/model/search-builders/InstrumentUpdateParamBuilder';
import { MongoInstrumentService } from '../../common/service/dal/MongoInstrumentService';
import { MongoTokenService } from '../../common/service/dal/MongoTokenService';
import { sleep } from '../../common/utils';
var instrumentRouter = express.Router();
let instrumentService = new MongoInstrumentService();
//-------------------TOKEN-----------------------------

//--RESTFUL--//
instrumentRouter.get('/',async (req, res)=>{
    let instruments = await instrumentService.getInstrument(
        {},
        {
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }
    );
    res.send(instruments);
});

instrumentRouter.get('/:id',async (req, res)=>{
    try{
        let instruments = await instrumentService.getInstrument(
            {
                InstrumentId:req.params['id']
            },
            {
            }
        );
        if(instruments == null || instruments.length == 0 )
        {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("Instrument not found");
            res.end();
        }
        else {
            res.send(instruments[0]);
        }
    }
    catch(ex){
        if(ex instanceof NOLServerException) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write(ex.message);
            res.end();
        }
        else {
            console.log(ex);
            res.sendStatus(400);
        }
    }
});

instrumentRouter.post('/',async (req, res)=>{
    console.log(req.body);
    try{
        await instrumentService.addInstrument(req.body);
        res.sendStatus(200);
    }catch(ex){
        console.log(ex);
        res.sendStatus(400);
    }   
});
instrumentRouter.put('/:id',async (req, res)=>{
    console.log(req.body);
    try{
        await instrumentService.setInstrument(req.params.id,req.body);
        res.sendStatus(200);
    }catch(ex){
        console.log(ex);
        res.sendStatus(400);
    }   
});

instrumentRouter.patch('/:id',async (req, res)=>{
    console.log(req.body);
    try{
        var params = BuildInstrumentUpdateParams(req.body); 
        await instrumentService.putInstrument(req.params.id,params);
        console.log(params);
        res.sendStatus(200);
    }catch(ex){
        console.log(ex);
        res.sendStatus(400);
    }   
});

//--EXTRA--//
instrumentRouter.get('/status/:status/top/:top',async (req, res)=>{
    let top = Number(req.params['top']);
    let instruments = await instrumentService.getInstrument(
        {
            Status:req.params["status"].toUpperCase()
        },
        {
            Top:top,
            SortBy:"TimeStamp",
            SortDirection:"desc"
        }
    );
    res.send(instruments);
});

instrumentRouter.get('/id/:id/ticker/:ticker/taxid/:taxid/status/:status/istrackable/:istrackable/ispersistent/:ispersistent',async (req, res)=>{
    let instruments;
    let searchParams =  BuildInstrumentSearchParams(req.params["id"],
    req.params["ticker"],
    req.params["taxid"],
    req.params["status"],
    req.params["istrackable"],
    req.params["ispersistent"]);

    instruments = await instrumentService.getInstrument(
        searchParams
    );

    if(instruments == null || instruments.length == 0 )
        {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("Instrument not found");
            res.end();
        }
        else {
            res.send(instruments);
        }
});
export { instrumentRouter } 