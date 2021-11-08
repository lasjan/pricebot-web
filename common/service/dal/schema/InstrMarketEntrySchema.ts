import * as moongose from "mongoose";


const InstrMarketEntrySchema = new moongose.Schema({
    InstrumentId: { type: String, required: true },
    Type: { type: String, required: true },
    TimeStamp: {type:Date},
    DateTime: {type:Date},
    Price:  { type: String},
    Currency:  { type: String},
    Size:  { type: String},
    OrdersCount:  { type: String},
    PriceLevel:  { type: String}
    });

export default InstrMarketEntrySchema;