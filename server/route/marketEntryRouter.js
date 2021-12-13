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
exports.marketEntryRouter = void 0;
var express_1 = __importDefault(require("express"));
var typedi_1 = __importDefault(require("typedi"));
var NOLServerException_1 = require("../../common/exception/NOLServerException");
var MongoInstrMarketEntryService_1 = require("../../common/service/dal/MongoInstrMarketEntryService");
var MongoInstrumentService_1 = require("../../common/service/dal/MongoInstrumentService");
var MongoLogService_1 = require("../../common/service/dal/MongoLogService");
var MongoMarketEntryService_1 = require("../../common/service/dal/MongoMarketEntryService");
var MongoRequestTokenService_1 = require("../../common/service/dal/MongoRequestTokenService");
var marketEntryRouter = express_1.default.Router();
exports.marketEntryRouter = marketEntryRouter;
marketEntryService: MongoInstrMarketEntryService_1.MongoInstrMarketEntryService;
var serviceInstance = typedi_1.default.get(MongoInstrumentService_1.MongoInstrumentService);
var loggerInstance = typedi_1.default.get(MongoLogService_1.MongoLogger);
var marketInstrumentEntryService = new MongoInstrMarketEntryService_1.MongoInstrMarketEntryService(serviceInstance, loggerInstance);
var marketEntryService = new MongoMarketEntryService_1.MongoMarketEntryService(loggerInstance);
var tokenRequestService = new MongoRequestTokenService_1.MongoRequestTokenService();
marketEntryRouter.get('/legacy/instrument/:instrument/type/:type/top/:top', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var top_1, dbEntries, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                top_1 = Number(req.params['top']);
                return [4 /*yield*/, marketInstrumentEntryService.getInstrumentMarketEntry({
                        InstrumentId: req.params['instrument'].toUpperCase(),
                        Type: req.params['type'].toUpperCase()
                    }, {
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
                if (ex_1 instanceof NOLServerException_1.NOLServerException) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write("Instrument not supported");
                    res.end();
                }
                else {
                    console.log(ex_1);
                    res.sendStatus(400);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
marketEntryRouter.get('/instrument/:instrument/type/:type/top/:top', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var top_2, dbEntries, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                top_2 = Number(req.params['top']);
                return [4 /*yield*/, marketEntryService.getMarketEntry({
                        InstrumentId: req.params['instrument'].toUpperCase(),
                        Type: req.params['type'].toUpperCase()
                    }, {
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
                if (ex_2 instanceof NOLServerException_1.NOLServerException) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write(ex_2.message);
                    res.end();
                }
                else {
                    console.log(ex_2);
                    res.sendStatus(400);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
marketEntryRouter.post('asyncRequest', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, tokenRequestService.addToken(req.body)];
            case 1:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                ex_3 = _a.sent();
                console.log(ex_3);
                res.sendStatus(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
marketEntryRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, marketEntryService.addInstrumentMarketEntry(req.body)];
            case 1:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                ex_4 = _a.sent();
                console.log(ex_4);
                res.sendStatus(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
