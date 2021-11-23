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
const allowedOrigins = ['http://localhost:4200','http://viewer.server487122.nazwa.pl'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

let logger = Container.get(MiddleLogger);
console.log(logger);
let app = express();
app.locals.logger = logger;
app.use(cors(options));
app.use(express.json());
app.use((req, res, next)=>{
  req.app.locals.logger.process(req);
  next();
});
const serverStart = ()=>{
    app.use('/token', tokenRouter);
    app.use('/marketEntry',marketEntryRouter);
    app.use('/sessionEntry',sessionEntryRouter);
    app.use('/instrument',instrumentRouter);
    app.use('/sessionEvent',sessionEventRouter);
    app.use(function(err:any, req:any, res:any, next:any) {
      
        console.error(err.stack);
        res.status(500).send('Something broke!');
      });
    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });
}
export default serverStart;

