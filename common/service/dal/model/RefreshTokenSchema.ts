import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const refreshTokenSchema = new mongoose.Schema({
    tokenUserId: { type: String, required: true },
    tokenAction: { type: String, required: true },
    tokenValue:  { type: String, required: true },
    tokenRefreshDate: {type:Date, required:true}
    });
let RefreshTokenModelCollection = mongoose.model('refresh-tokens', refreshTokenSchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default RefreshTokenModelCollection;