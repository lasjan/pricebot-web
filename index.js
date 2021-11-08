"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var worker_1 = __importDefault(require("./server/worker"));
require('dotenv').config();
(0, worker_1.default)();
/*
let marketMongoService = new MongoInstrMarketEntryService();

(async ()=>{marketMongoService.addInstrumentMarketEntry(new InstrumentMarketEntry({
    InstrumentId : "COMANCZ",
    Type:"low"
}));})();


(async ()=>{console.log(await marketMongoService.getInstrumentMarketEntry({}));})();
*/ 
