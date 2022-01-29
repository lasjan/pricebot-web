import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const instrAggregateEntrySchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    Date: {type:Date,required: true },
    DateString: {type:String,required: true },
    VolSize: {type:Number,required: false },
    VolTurnover: {type:Number,required: false },
    TradePrice : {type:Number,required: false },
    TradeCurrency: {type:String,required: false },
    TradeDate: {type:Date,required: false },
    TradeSize: {type:Number,required: false },
    OpenCurrency : {type:String,required: false },
    OpenPrice : {type:Number,required: false },
    OpenTurnover : {type:Number,required: false },
    CloseCurrency : {type:String,required: false },
    ClosePrice: {type:Number,required: false },
    CloseTurnover:{type:Number,required: false },
    HighCurrency : {type:String,required: false },
    HighPrice: {type:Number,required: false },
    LowCurrency : {type:String,required: false },
    LowPrice: {type:Number,required: false },
    RefCurrency : {type:String,required: false },
    RefPrice : {type:Number,required: false },
    GrowthVector : {type:Number,required: false },
    TimeStamp: {type:Date,required: true }
    });
let InstrumentAggregateCollection = mongoose.model('aggregates', instrAggregateEntrySchema);
export default InstrumentAggregateCollection;

