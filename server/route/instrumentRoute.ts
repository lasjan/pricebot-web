import express from 'express';
import { MongoInstrumentService } from '../../common/service/dal/MongoInstrumentService';
import { MongoTokenService } from '../../common/service/dal/MongoTokenService';
import { sleep } from '../../common/utils';
var instrumentRouter = express.Router();
let instrumentService = new MongoInstrumentService();
//-------------------TOKEN-----------------------------

instrumentRouter.get('/anynew',async (req, res)=>{
    let instruments = await instrumentService.getInstrument(
        {
            Status:"NEW"
        }
    );

    res.send(`{any:${instruments!=null && instruments.length>0}}`);
});
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

instrumentRouter.get('instrument/:instrument/status/:status/top/:top',async (req, res)=>{
    let instruments;
    let searchParam = {};
    if(req.params['instrument']!= null && req.params['instrument']!=undefined){
        searchParam = {...searchParam, ...{InstrumentId:req.params['instrument'].toUpperCase()}};
    }
    if(req.params['status']!= null && req.params['status']!=undefined){
        searchParam = {...searchParam, ...{Status:req.params['status'].toUpperCase()}};
    }
    instruments = await instrumentService.getInstrument(
        searchParam
    );

    res.send(instruments);
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
instrumentRouter.put('/',async (req, res)=>{
    console.log(req.body);
    try{
        await instrumentService.setInstrument(req.body);
        res.sendStatus(200);
    }catch(ex){
        console.log(ex);
        res.sendStatus(400);
    }   
});

export { instrumentRouter } 