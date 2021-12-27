import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const instrumentSchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    Status: {type: String,default:"NEW"},
    Ticker: { type: String, required: true },
    TaxId: { type: String, required: true },
    IsPersistent: { type: Boolean, required: true ,default:false},
    IsTrackable: { type: Boolean, required: true ,default:false},
    ModifyDate: {type:Date, required:true},
    TimeStamp: {type:Date, required:true},
    });
let InstrumentModelCollection = mongoose.model('instruments', instrumentSchema);

export default InstrumentModelCollection;