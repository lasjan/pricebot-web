import express from 'express';
import { BuildRequestTokenParams } from '../../common/service/dal/model/search-builders/RequestTokenParamBuilder';
import { MongoRequestTokenService } from '../../common/service/dal/MongoRequestTokenService';

var requestTokenRouter = express.Router();
let requestTokeService = new MongoRequestTokenService();
//-------------------TOKEN-----------------------------

requestTokenRouter.get('/id/:id/type/:type/state/:state/requestor/:requestor',async (req, res)=>{
    let searchParams = BuildRequestTokenParams(req.params['id'],req.params['type'],req.params['state'],req.params['requestor']);
    let tokens = await requestTokeService.getToken(searchParams);

    res.send(tokens);
});


requestTokenRouter.post('/',async (req, res)=>{
    console.log(req.body);
    try{
        let newToken = await requestTokeService.addToken(req.body);
        res.send(newToken);
    }catch(ex){
        console.log(ex);
        res.sendStatus(400);
    }   
});

requestTokenRouter.put('/:id',async (req, res)=>{
    console.log(req.body);
    try{
        let newToken = await requestTokeService.setToken(req.params.id,req.body);
        res.send(newToken);
    }catch(ex){
        console.log(ex);
        res.sendStatus(400);
    }   
});
/*
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
*/
export { requestTokenRouter } 