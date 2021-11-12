import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const tradingSessionChangeEventSchema = new mongoose.Schema({
    InstrumentId: {  type: String, required: true },
    CurrentSessionSubId: { type: String, required: true },
    PreviousSessionSubId: { type: String, required: true },
    CurrentSessionStatus: { type: String, required: false },
    PreviousSessionStatus: { type: String, required: false },
    TimeStamp: {type:Date}
    });
let TradingSessionChangeEventCollection = mongoose.model('session-events', tradingSessionChangeEventSchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default TradingSessionChangeEventCollection;