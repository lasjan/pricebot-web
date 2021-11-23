import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const logSchema = new mongoose.Schema({
    AppName: { type: String, required: true },
    AppServer: { type: String, required: true },
    Context:  { type: String, required: true },
    LogType: { type: String, required: true,default:'D' },
    Slot1:  { type: String, required: false },
    Slot2:  { type: String, required: false },
    Slot3:  { type: String, required: false },
    TimeStamp: {type:Date, required:true}
    });
let LogModelCollection = mongoose.model('logs', logSchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default LogModelCollection;