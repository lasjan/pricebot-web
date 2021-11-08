import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const instrumentSchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    Status: {type: String,default:"NEW"},
    ModifyDate: {type:Date, required:true},
    TimeStamp: {type:Date, required:true},
    });
let InstrumentModelCollection = mongoose.model('instruments', instrumentSchema);

export default InstrumentModelCollection;