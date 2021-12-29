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
exports.sessionEventRouter = void 0;
var express_1 = __importDefault(require("express"));
var typedi_1 = __importDefault(require("typedi"));
var TradingSessionChangeEventParamBuilder_1 = require("../../common/service/dal/model/search-builders/TradingSessionChangeEventParamBuilder");
var MongoLogService_1 = require("../../common/service/dal/MongoLogService");
var MongoTradingSessionChangeEventService_1 = require("../../common/service/dal/MongoTradingSessionChangeEventService");
var wildcards_1 = require("../../common/wildcards");
var sessionEventRouter = express_1.default.Router();
exports.sessionEventRouter = sessionEventRouter;
var serviceInstance = typedi_1.default.get(MongoLogService_1.MongoLogger);
var tradingSessionEventService = new MongoTradingSessionChangeEventService_1.MongoTradingSessionChangeEventService(serviceInstance);
//-----------------SESSION---------------------------------
sessionEventRouter.get('/instrumentId/:instrumentId/type/:type/subtype/:subtype/top/:top', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var top_1, searchParams, dbEntries, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                top_1 = Number(req.params['top']);
                searchParams = (0, TradingSessionChangeEventParamBuilder_1.BuildSessionChangeParams)(req.params["instrumentId"], req.params["type"], req.params["subtype"]);
                return [4 /*yield*/, tradingSessionEventService.getTradingSessionChangeEventWithMarketEntry(searchParams, [], {
                        Top: top_1,
                        SortBy: "TimeStamp",
                        SortDirection: "desc"
                    })];
            case 1:
                dbEntries = _a.sent();
                res.send(dbEntries);
                return [3 /*break*/, 3];
            case 2:
                ex_1 = _a.sent();
                res.send(ex_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
sessionEventRouter.get('/instrumentId/:instrumentId/type/:type/subtype/:subtype/markettypes/:markettypes/top/:top', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var top_2, searchParams, auxMktTypes, dbEntries, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                top_2 = Number(req.params['top']);
                searchParams = (0, TradingSessionChangeEventParamBuilder_1.BuildSessionChangeParams)(req.params["instrumentId"], req.params["type"], req.params["subtype"]);
                auxMktTypes = [];
                if (req.params["markettypes"] != null && req.params["markettypes"] != wildcards_1.NULL_VAL) {
                    auxMktTypes = req.params["markettypes"].split(",");
                }
                return [4 /*yield*/, tradingSessionEventService.getTradingSessionChangeEventWithMarketEntry(searchParams, auxMktTypes, {
                        Top: top_2,
                        SortBy: "TimeStamp",
                        SortDirection: "desc"
                    })];
            case 1:
                dbEntries = _a.sent();
                res.send(dbEntries);
                return [3 /*break*/, 3];
            case 2:
                ex_2 = _a.sent();
                res.send(ex_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
sessionEventRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, tradingSessionEventService.addTradingSessionChangeEvent(req.body)];
            case 1:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                ex_3 = _a.sent();
                console.log(ex_3);
                res.send(ex_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
