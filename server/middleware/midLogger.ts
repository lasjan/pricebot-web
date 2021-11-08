import express from 'express';
import { Service } from 'typedi';
import { MongoLogger } from '../../common/service/dal/MongoLogService';
import "reflect-metadata";

@Service()
export class MiddleLogger{
    excludedIps: Array<string> = [];
    constructor(
        private dbLogger: MongoLogger
      ) {     
      }

    public process(req: any) {
      const {APP_LOG_EXCLUDED_IPS} = process.env;
      this.excludedIps = (APP_LOG_EXCLUDED_IPS??"").split("#"); 
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      const body = JSON.stringify(req.body??"");
      console.log(this.excludedIps);
      if(this.excludedIps.indexOf(ip) < 0){
        this.dbLogger.InternalLog(ip,fullUrl,body,"","");
      }
    }
}



  