"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleLogger = void 0;
var typedi_1 = require("typedi");
require("reflect-metadata");
var MiddleLogger = /** @class */ (function () {
    function MiddleLogger(dbLogger) {
        this.dbLogger = dbLogger;
        this.excludedIps = [];
    }
    MiddleLogger.prototype.process = function (req) {
        var _a;
        var APP_LOG_EXCLUDED_IPS = process.env.APP_LOG_EXCLUDED_IPS;
        this.excludedIps = (APP_LOG_EXCLUDED_IPS !== null && APP_LOG_EXCLUDED_IPS !== void 0 ? APP_LOG_EXCLUDED_IPS : "").split("#");
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var body = JSON.stringify((_a = req.body) !== null && _a !== void 0 ? _a : "");
        console.log(this.excludedIps);
        if (this.excludedIps.indexOf(ip) < 0) {
            this.dbLogger.InternalLog(ip, fullUrl, body, "", "");
        }
    };
    MiddleLogger = __decorate([
        (0, typedi_1.Service)()
    ], MiddleLogger);
    return MiddleLogger;
}());
exports.MiddleLogger = MiddleLogger;
