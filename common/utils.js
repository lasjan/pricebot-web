"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = exports.getMDBConnString = exports.sleep = void 0;
var moment_1 = __importDefault(require("moment"));
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function getMDBConnString(user, password) {
    return "" + process.env.DB_SERVER_URL + user + ":" + password + "@" + process.env.DB_SERVER_CLUSTER + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
}
exports.getMDBConnString = getMDBConnString;
function getCurrentDate() {
    var DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
    var now;
    now = (0, moment_1.default)(new Date(), DATE_TIME_FORMAT);
    return now;
}
exports.getCurrentDate = getCurrentDate;
