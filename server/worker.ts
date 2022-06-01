import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { instrumentRouter } from './route/instrumentRoute';
import { marketEntryRouter } from './route/marketEntryRouter';
import { sessionEntryRouter } from './route/sessionEntryRouter';
import { tokenRouter } from './route/tokenRoute';
import "reflect-metadata";
import { MiddleLogger } from './middleware/midLogger';
import Container from 'typedi';
import { sessionEventRouter } from './route/sessionEventRouter';
import { requestTokenRouter } from './route/requestTokenRoute';
import { searchRouter } from './route/searchApi';
import { MongoLogger } from '../common/service/dal/MongoLogService';
const allowedOrigins = ['http://localhost:4200','http://viewer.server487122.nazwa.pl','http://argonviewer.server487122.nazwa.pl','http://price-bot.pl'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

let logger = Container.get(MiddleLogger);
let dbLogger = Container.get(MongoLogger);
let app = express();
app.locals.logger = logger;
app.use(cors(
  {
    origin:function(origin,callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.' + "[" + origin + "]" + JSON.stringify(allowedOrigins);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

app.use(express.json({limit: '50mb'}));
app.use((req, res, next)=>{
  req.app.locals.logger.process("I", req);
  req.app.locals.logger.process("I",req,JSON.stringify(options),"");
  next();
});
const serverStart = ()=>{
  
    app.use('/token', tokenRouter);
    app.use('/marketEntry',marketEntryRouter);
    app.use('/sessionEntry',sessionEntryRouter);
    app.use('/instrument',instrumentRouter);
    app.use('/sessionEvent',sessionEventRouter);
    app.use('/requestToken',requestTokenRouter);
    app.use('/searchApi',searchRouter);
    app.use(function(err:any, req:any, res:any, next:any) {
      
        console.error(err.stack);
        req.app.locals.logger.process("Err", req,err.stack);
        res.status(500).send('Something broke!');
      });
    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });
}
export default serverStart;

