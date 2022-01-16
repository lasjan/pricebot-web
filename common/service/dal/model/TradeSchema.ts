import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const tradeSchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    MaxPrice: { type: Number, required: true },
    MinPrice: { type: Number, required: true },
    AvgPrice: { type: Number, required: true },
    SumSize: { type: Number, required: true },
    DateTime: {type:Date, required:true}
    },{ collection : 'tradeAggregates' }
    );
let TradeModelCollection = mongoose.model('tradeAggregates', tradeSchema);

export default TradeModelCollection;

