import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const heartSchema = new mongoose.Schema({
    HeartId: { type: String, required: true },
    Status: {type: String,default:"UNKNOWN"},
    ModifyDate: {type:Date, required:true},
    TimeStamp: {type:Date, required:true},
    });
let HeartModelCollection = mongoose.model('instruments', heartSchema);

export default HeartModelCollection;