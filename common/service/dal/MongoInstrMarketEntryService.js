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
exports.MongoInstrMarketEntryService = void 0;
var NOLServerException_1 = require("../../exception/NOLServerException");
var InstrumentMarketEntrySchema_1 = __importDefault(require("./model/InstrumentMarketEntrySchema"));
var Instrument_1 = require("../../model/Instrument");
var config_1 = __importDefault(require("../../database/config"));
var utils_1 = require("../../utils");
var RequestToken_1 = require("../../model/RequestToken");
var MongoInstrMarketEntryService = /** @class */ (function () {
    function MongoInstrMarketEntryService(instrumentService, logger, tokenService) {
        this._instrumentService = instrumentService;
        this._logger = logger;
        this._tokenService = tokenService;
    }
    MongoInstrMarketEntryService.prototype.getInstrumentMarketEntry = function (search, options) {
        var _a;
        if (search === void 0) { search = {}; }
        if (options === void 0) { options = {
            Top: 1,
            SortBy: "TimeStamp",
            SortDirection: "desc"
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var sortDirection, limit, sortParams, instrument, freshInstrument, now, token, cntInt, results, cntInt, mapped;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _b.sent();
                        sortDirection = options.SortDirection == "desc" ? "-" : "";
                        limit = (_a = options.Top) !== null && _a !== void 0 ? _a : 1;
                        sortParams = sortDirection + options.SortBy;
                        console.log(options);
                        console.log(sortParams);
                        console.log(search);
                        return [4 /*yield*/, this._instrumentService.getInstrument({
                                InstrumentId: search.InstrumentId
                            })];
                    case 2:
                        instrument = _b.sent();
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "search", JSON.stringify(search), "");
                        if (!(instrument == null || instrument.length == 0)) return [3 /*break*/, 8];
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "not found", JSON.stringify(search), "");
                        freshInstrument = new Instrument_1.Instrument({ InstrumentId: search.InstrumentId });
                        now = (0, utils_1.getCurrentDate)();
                        token = new RequestToken_1.RequestToken({
                            Type: "PUTINSTRUMENT",
                            Requestor: "WEBAPI",
                            RequestParams: { InstrumentId: search.InstrumentId, AddToListIfValid: true },
                            TimeStamp: now.toString()
                        });
                        return [4 /*yield*/, this._tokenService.addToken(token)];
                    case 3:
                        _b.sent();
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "saved", JSON.stringify(search), "");
                        cntInt = 0;
                        _b.label = 4;
                    case 4:
                        if (!(cntInt++ < 10)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._instrumentService.getInstrument({
                                InstrumentId: search.InstrumentId
                            })];
                    case 5:
                        instrument = _b.sent();
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "checking", JSON.stringify(search), cntInt.toString());
                        if (instrument != null
                            && instrument.length != 0
                            && instrument[0].Status != "NEW"
                            && instrument[0].Status != "PENDING") {
                            return [3 /*break*/, 7];
                        }
                        return [4 /*yield*/, (0, utils_1.sleep)(1000)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 7:
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "loop finish", JSON.stringify(search), cntInt.toString());
                        _b.label = 8;
                    case 8:
                        console.log(instrument);
                        if (instrument != null && instrument.length != 0) {
                            if (instrument[0].Status == "REJECTED") {
                                ;
                                this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "rejected", JSON.stringify(search), "");
                                throw new NOLServerException_1.NOLServerException("Bad instrument name");
                            }
                        }
                        return [4 /*yield*/, InstrumentMarketEntrySchema_1.default.find(search).sort(sortParams).limit(limit)];
                    case 9:
                        results = _b.sent();
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "searchMKT", JSON.stringify(search), JSON.stringify(results));
                        if (!(results == null || !results.length)) return [3 /*break*/, 13];
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "noResultsMKT", JSON.stringify(search), "");
                        cntInt = 0;
                        _b.label = 10;
                    case 10:
                        if (!(cntInt++ < 15)) return [3 /*break*/, 13];
                        return [4 /*yield*/, InstrumentMarketEntrySchema_1.default.find(search).sort(sortParams).limit(limit)];
                    case 11:
                        results = _b.sent();
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "searchLoopMKT", JSON.stringify(results), cntInt.toString());
                        if (!(results == null || !results.length)) {
                            this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "foundMKT", JSON.stringify(results), cntInt.toString());
                            return [3 /*break*/, 13];
                        }
                        return [4 /*yield*/, (0, utils_1.sleep)(1000)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 13:
                        mapped = results.map(function (r) {
                            var smth = {
                                InstrumentId: r.InstrumentId,
                                Type: r.Type,
                                DateTime: r.DateTime,
                                TimeStamp: r.TimeStamp,
                                Price: r.Price,
                                Turnover: r.Turnover,
                                OrdersCount: r.OrdersCount
                            };
                            return smth;
                        });
                        this._logger.InternalLog("D", "getInstrumentMarketEntry", JSON.stringify(instrument), "mapped", JSON.stringify(search), JSON.stringify(mapped));
                        return [2 /*return*/, mapped];
                }
            });
        });
    };
    MongoInstrMarketEntryService.prototype.addInstrumentMarketEntry = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var query, update, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _a.sent();
                        query = {
                            InstrumentId: entry.InstrumentId,
                            Type: entry.Type,
                            DateTime: entry.DateTime,
                            Price: entry.Price,
                            Currency: entry.Currency,
                            Size: entry.Size,
                            OrdersCount: entry.OrdersCount,
                            PriceLevel: entry.PriceLevel,
                            Turnover: entry.TurnoverValue
                        };
                        update = {
                            TimeStamp: entry.TimeStamp
                        };
                        options = { upsert: true, new: true, setDefaultsOnInsert: true };
                        /*let dbEntry = new InstrMarketEntryCollection({
                            InstrumentId:   entry.InstrumentId,
                            Type:           entry.Type,
                            TimeStamp:      entry.TimeStamp,
                            DateTime:       entry.DateTime,
                            Price:          entry.Price,
                            Currency:       entry.Currency,
                            size:           entry.Size,
                            OrdersCount:    entry.OrdersCount,
                            PriceLevel:     entry.PriceLevel,
                            Turnover:       entry.TurnoverValue
                        });*/
                        return [4 /*yield*/, InstrumentMarketEntrySchema_1.default.findOneAndUpdate(query, update, options)];
                    case 2:
                        /*let dbEntry = new InstrMarketEntryCollection({
                            InstrumentId:   entry.InstrumentId,
                            Type:           entry.Type,
                            TimeStamp:      entry.TimeStamp,
                            DateTime:       entry.DateTime,
                            Price:          entry.Price,
                            Currency:       entry.Currency,
                            size:           entry.Size,
                            OrdersCount:    entry.OrdersCount,
                            PriceLevel:     entry.PriceLevel,
                            Turnover:       entry.TurnoverValue
                        });*/
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MongoInstrMarketEntryService;
}());
exports.MongoInstrMarketEntryService = MongoInstrMarketEntryService;
