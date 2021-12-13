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
exports.MongoRequestTokenService = void 0;
var crypto_1 = require("crypto");
var config_1 = __importDefault(require("../../database/config"));
var utils_1 = require("../../utils");
var RequestTokenSchema_1 = __importDefault(require("./model/RequestTokenSchema"));
var MongoRequestTokenService = /** @class */ (function () {
    function MongoRequestTokenService() {
    }
    MongoRequestTokenService.prototype.getToken = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var results, mapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _a.sent();
                        console.log(search);
                        return [4 /*yield*/, RequestTokenSchema_1.default.find(search).limit(1)];
                    case 2:
                        results = _a.sent();
                        if (results != null && results.length) {
                            mapped = results.map(function (r) {
                                var smth = {
                                    Id: r.Id,
                                    State: r.State,
                                    Type: r.Type,
                                    Requestor: r.Requestor,
                                    RequestParams: r.RequestParams,
                                    Response: r.Response,
                                    TimeStamp: r.TimeStamp
                                };
                                return smth;
                            });
                            return [2 /*return*/, mapped];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    MongoRequestTokenService.prototype.addToken = function (token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _b.sent();
                        query = {
                            Id: (_a = token.Id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)(),
                            Type: token.Type,
                            Requestor: token.Requestor,
                            RequestParams: JSON.stringify(token.RequestParams),
                            Resolver: token.Resolver,
                            State: "NEW",
                            TimeStamp: token.TimeStamp
                        };
                        return [4 /*yield*/, RequestTokenSchema_1.default.create(query)];
                    case 2:
                        result = _b.sent();
                        //let mapped = result.map((r:any) =>  {Id:r.Id});
                        return [2 /*return*/, result.Id];
                }
            });
        });
    };
    MongoRequestTokenService.prototype.setToken = function (id, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var item, now;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ;
                        return [4 /*yield*/, (0, config_1.default)()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, RequestTokenSchema_1.default.findOne({ Id: id })];
                    case 2:
                        item = _b.sent();
                        console.log("-->" + item);
                        now = (0, utils_1.getCurrentDate)();
                        item.State = token.State;
                        item.Response = JSON.stringify(token.Response);
                        item.Type = token.Type;
                        item.Requestor = token.Requestor;
                        item.Resolver = token.Resolver,
                            item.Response = JSON.stringify(token.Response);
                        item.TimeStamp = (_a = token.TimeStamp) !== null && _a !== void 0 ? _a : now;
                        return [4 /*yield*/, item.save()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MongoRequestTokenService;
}());
exports.MongoRequestTokenService = MongoRequestTokenService;
