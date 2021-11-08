import express from 'express';
import { MongoTokenService } from '../../common/service/dal/MongoTokenService';
import { sleep } from '../../common/utils';
var tokenRouter = express.Router();
let tokenService = new MongoTokenService();
//-------------------TOKEN-----------------------------

tokenRouter.get('/test/:init',async (req, res)=>{
    
    let cnt = req.params['init'] ;
    var cntInt: number = +cnt;
    while(cntInt<10){
        console.log(cntInt++);
        var tokenInfo = await tokenService.getTokenForUserAction("ja","ja");
        console.log(tokenInfo);
        await sleep(1000);
    }
    res.status(200);
});
tokenRouter.get('/get', async function(req, res) {
    try{
        let userId = req.query.userId as string;
        let action = req.query.action as string;
        let token = req.query.token as string;

        var tokenInfo = await tokenService.getTokenForUserAction(userId,action);
        res.send(tokenInfo);
    }
    catch(ex){
        res.send(ex);
    }
});
export { tokenRouter } 