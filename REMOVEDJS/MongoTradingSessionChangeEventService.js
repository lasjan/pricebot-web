"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTradingSessionChangeEventService = void 0;
var config_1 = __importDefault(require("../../database/config"));
var InstrumentMarketEntrySchema_1 = __importDefault(require("./model/InstrumentMarketEntrySchema"));
var TradingSessionChangeEventSchema_1 = __importDefault(require("./model/TradingSessionChangeEventSchema"));
var MongoTradingSessionChangeEventService = /** @class */ (function () {
    function MongoTradingSessionChangeEventService(loggerService) {
        this._loggerService = loggerService;
    }
    MongoTradingSessionChangeEventService.prototype.getTradingSessionChangeEvent = function (search, options) {
        var _a;
        if (search === void 0) { search = {}; }
        if (options === void 0) { options = {
            Top: 1,
            SortBy: "TimeStamp",
            SortDirection: "desc"
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var sortDirection, limit, sortParams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _b.sent();
                        sortDirection = options.SortDirection == "desc" ? "-" : "";
                        limit = (_a = options.Top) !== null && _a !== void 0 ? _a : 1;
                        sortParams = sortDirection + options.SortBy;
                        return [4 /*yield*/, TradingSessionChangeEventSchema_1.default.find(search).sort(sortParams).limit(limit)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MongoTradingSessionChangeEventService.prototype.addTradingSessionChangeEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var dbEntry, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _a.sent();
                        dbEntry = new TradingSessionChangeEventSchema_1.default({
                            InstrumentId: event.InstrumentId,
                            CurrentSessionSubId: event.CurrentSessionSubId,
                            PreviousSessionSubId: event.PreviousSessionSubId,
                            CurrentSessionStatus: event.CurrentSessionStatus,
                            PreviousSessionStatus: event.PreviousSessionStatus,
                            Type: event.Type,
                            SubType: event.SubType,
                            TimeStamp: event.TimeStamp
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, dbEntry.save()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        if (ex_1 instanceof Error) {
                            this._loggerService.InternalLog("E", "MongoTradingSessionChangeEventService.addTradingSessionChangeEvent", ex_1.message, dbEntry, "", "");
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoTradingSessionChangeEventService.prototype.getTradingSessionChangeEventWithMarketEntry = function (search, marketEntriesTypeToJoin, options) {
        var _a;
        if (search === void 0) { search = {}; }
        if (marketEntriesTypeToJoin === void 0) { marketEntriesTypeToJoin = []; }
        if (options === void 0) { options = {
            Top: 1,
            SortBy: "TimeStamp",
            SortDirection: "desc"
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var sortDirection, limit, sortParams, eventColletion, merged, final;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _b.sent();
                        sortDirection = options.SortDirection == "desc" ? "-" : "";
                        limit = (_a = options.Top) !== null && _a !== void 0 ? _a : 1;
                        sortParams = sortDirection + options.SortBy;
                        return [4 /*yield*/, TradingSessionChangeEventSchema_1.default.find(search).sort(sortParams).limit(limit)];
                    case 2:
                        eventColletion = _b.sent();
                        if (!eventColletion.length) {
                            return [2 /*return*/, null];
                        }
                        merged = eventColletion.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var auxData, _i, marketEntriesTypeToJoin_1, mktReqType, marketEntry, smth;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        auxData = [];
                                        _i = 0, marketEntriesTypeToJoin_1 = marketEntriesTypeToJoin;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < marketEntriesTypeToJoin_1.length)) return [3 /*break*/, 4];
                                        mktReqType = marketEntriesTypeToJoin_1[_i];
                                        return [4 /*yield*/, InstrumentMarketEntrySchema_1.default.findOne({ "InstrumentId": item.InstrumentId, "Type": mktReqType }).sort({ TimeStamp: -1 })];
                                    case 2:
                                        marketEntry = _a.sent();
                                        //console.log(item.InstrumentId +"," +marketEntry);
                                        if (marketEntry) {
                                            auxData.push({
                                                "Type": marketEntry.Type,
                                                "Price": marketEntry.Price,
                                                "Turnover": marketEntry.Turnover,
                                                "TimeStamp": marketEntry.TimeStamp
                                            });
                                        }
                                        _a.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        ;
                                        smth = {
                                            EventId: item.EventId,
                                            InstrumentId: item.InstrumentId,
                                            CurrentSessionSubId: item.CurrentSessionSubId,
                                            PreviousSessionSubId: item.PreviousSessionSubId,
                                            CurrentSessionStatus: item.CurrentSessionStatus,
                                            PreviousSessionStatus: item.PreviousSessionStatus,
                                            Type: item.Type,
                                            SubType: item.SubType,
                                            TimeStamp: item.TimeStamp,
                                            market: auxData
                                        };
                                        return [2 /*return*/, smth];
                                }
                            });
                        }); });
                        final = Promise.all(merged);
                        return [2 /*return*/, final];
                }
            });
        });
    };
    return MongoTradingSessionChangeEventService;
}());
exports.MongoTradingSessionChangeEventService = MongoTradingSessionChangeEventService;