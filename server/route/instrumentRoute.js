"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.instrumentRouter = void 0;
var express_1 = __importDefault(require("express"));
var NOLServerException_1 = require("../../common/exception/NOLServerException");
var MongoInstrumentService_1 = require("../../common/service/dal/MongoInstrumentService");
var instrumentRouter = express_1.default.Router();
exports.instrumentRouter = instrumentRouter;
var instrumentService = new MongoInstrumentService_1.MongoInstrumentService();
//-------------------TOKEN-----------------------------
//--RESTFUL--//
instrumentRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var instruments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, instrumentService.getInstrument({}, {
                    SortBy: "TimeStamp",
                    SortDirection: "desc"
                })];
            case 1:
                instruments = _a.sent();
                res.send(instruments);
                return [2 /*return*/];
        }
    });
}); });
instrumentRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var instruments, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instrumentService.getInstrument({
                        InstrumentId: req.params['id']
                    }, {})];
            case 1:
                instruments = _a.sent();
                if (instruments == null || instruments.length == 0) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write("Instrument not found");
                    res.end();
                }
                else {
                    res.send(instruments[0]);
                }
                return [3 /*break*/, 3];
            case 2:
                ex_1 = _a.sent();
                if (ex_1 instanceof NOLServerException_1.NOLServerException) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write(ex_1.message);
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
instrumentRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, instrumentService.addInstrument(req.body)];
            case 2:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 4];
            case 3:
                ex_2 = _a.sent();
                console.log(ex_2);
                res.sendStatus(400);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
instrumentRouter.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, instrumentService.setInstrument(req.params.id, req.body)];
            case 2:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 4];
            case 3:
                ex_3 = _a.sent();
                console.log(ex_3);
                res.sendStatus(400);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//--EXTRA--//
instrumentRouter.get('/anynew', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var instruments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, instrumentService.getInstrument({
                    Status: "NEW"
                })];
            case 1:
                instruments = _a.sent();
                res.send("{any:" + (instruments != null && instruments.length > 0) + "}");
                return [2 /*return*/];
        }
    });
}); });
instrumentRouter.get('/status/:status/top/:top', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var top, instruments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                top = Number(req.params['top']);
                return [4 /*yield*/, instrumentService.getInstrument({
                        Status: req.params["status"].toUpperCase()
                    }, {
                        Top: top,
                        SortBy: "TimeStamp",
                        SortDirection: "desc"
                    })];
            case 1:
                instruments = _a.sent();
                res.send(instruments);
                return [2 /*return*/];
        }
    });
}); });
instrumentRouter.get('instrument/:instrument/status/:status/top/:top', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var instruments, searchParam;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchParam = {};
                if (req.params['instrument'] != null && req.params['instrument'] != undefined) {
                    searchParam = __assign(__assign({}, searchParam), { InstrumentId: req.params['instrument'].toUpperCase() });
                }
                if (req.params['status'] != null && req.params['status'] != undefined) {
                    searchParam = __assign(__assign({}, searchParam), { Status: req.params['status'].toUpperCase() });
                }
                return [4 /*yield*/, instrumentService.getInstrument(searchParam)];
            case 1:
                instruments = _a.sent();
                res.send(instruments);
                return [2 /*return*/];
        }
    });
}); });
