import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const requestTokenSchema = new mongoose.Schema({
    Id: {  type: String, required: true },
    Type:{ type: String, required: true },
    Requestor: { type: String, required: true },
    RequestParams:{ type: String, required: false },
    State : { type: String, required: true },
    Resolver: { type: String, required: false },
    Response:  { type: String, required: false },
    TimeStamp: {type:Date}
    });
let RequestTokenCollection = mongoose.model('request-tokens', requestTokenSchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default RequestTokenCollection;