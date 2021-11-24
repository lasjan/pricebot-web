import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const tradingSessionStatusEntrySchema = new mongoose.Schema({
    InstrumentId: {  type: String, required: true },
    SessionSubId: { type: String, required: true },
    SessionId : { type: String},
    InstrumentSecId:  { type: String},
    InstrumentSecIdSource : { type: String},
    SessionStatus : { type: String},
    TimeStamp: {type:Date}
    });
let TradingSessionStatusEntryCollection = mongoose.model('session-status-entries', tradingSessionStatusEntrySchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default TradingSessionStatusEntryCollection;