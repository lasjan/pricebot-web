import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const instrMarketEntrySchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    Type: { type: String, required: true },
    DateTime: {type:Date,required: true },
    Price:  { type: String},
    Currency:  { type: String},
    Size:  { type: String},
    OrdersCount:  { type: String},
    PriceLevel:  { type: String},
    TurnoverValue: {type:String},
    TimeStamp: {type:Date,required: true }
    });
let InstrMarketEntryCollection = mongoose.model('instr-market-entries', instrMarketEntrySchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default InstrMarketEntryCollection;