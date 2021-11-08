import express from 'express';
import { MongoInstrumentService } from '../../common/service/dal/MongoInstrumentService';

var heartRoute = express.Router();
let instrumentService = new MongoInstrumentService();