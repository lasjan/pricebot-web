import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const tradeSchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    Size: { type: String, required: true },
    Currency: { type: String, required: true },
    DateTime: {type:Date, required:true},
    Price: { type: String, required: true },
    TimeStamp: {type:Date, required:true}
    });
let TradeModelCollection = mongoose.model('trades', tradeSchema);

export default TradeModelCollection;

