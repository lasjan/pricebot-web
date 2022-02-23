import * as mongoose from 'mongoose';
import { model } from 'mongoose';


const processSchema = new mongoose.Schema({
    LastAggrDate: {  type: Date, required: false },
    LastAggrDateString:{ type: String, required: false },
    DailyInfo:{type:Object , required:false }
    },{ collection: 'process' });
let ProcessCollection = mongoose.model('process', processSchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
export default ProcessCollection;