"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MongoInstrumentService_1 = require("../../common/service/dal/MongoInstrumentService");
var heartRoute = express_1.default.Router();
var instrumentService = new MongoInstrumentService_1.MongoInstrumentService();
