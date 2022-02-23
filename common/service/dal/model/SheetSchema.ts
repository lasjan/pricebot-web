import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const sheetSchema = new mongoose.Schema({
    InstrumentId: { type: String, required: true },
    Level: { type: String, required: true },
    Type: { type: String, required: true },
    Currency: { type: String, required: true },
    OrdersCount: { type: String, required: true },
    Price: {type:String, required:true},
    Size: {type:String, required:true},
    TimeStamp: {type:Date}
    },{ collection : 'sheets' }
    );
let SheetModelCollection = mongoose.model('sheets', sheetSchema);

export default SheetModelCollection;

