"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var tradingSessionChangeEventSchema = new mongoose.Schema({
    EventId: { type: String, required: false },
    InstrumentId: { type: String, required: true },
    CurrentSessionSubId: { type: String, required: false },
    PreviousSessionSubId: { type: String, required: false },
    CurrentSessionStatus: { type: String, required: false },
    PreviousSessionStatus: { type: String, required: false },
    Type: { type: String, required: true },
    SubType: { type: String, required: false },
    TimeStamp: { type: Date }
});
var TradingSessionChangeEventCollection = mongoose.model('session-events', tradingSessionChangeEventSchema);
//export default  RefreshTokenModelCollection;
/*module.exports = {
    RefreshTokenModelCollection: mongoose.model('refresh-tokens', refreshTokenSchema)
}*/
exports.default = TradingSessionChangeEventCollection;
