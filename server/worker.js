"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var instrumentRoute_1 = require("./route/instrumentRoute");
var marketEntryRouter_1 = require("./route/marketEntryRouter");
var sessionEntryRouter_1 = require("./route/sessionEntryRouter");
var tokenRoute_1 = require("./route/tokenRoute");
require("reflect-metadata");
var midLogger_1 = require("./middleware/midLogger");
var typedi_1 = __importDefault(require("typedi"));
var sessionEventRouter_1 = require("./route/sessionEventRouter");
var requestTokenRoute_1 = require("./route/requestTokenRoute");
var allowedOrigins = ['http://localhost:4200', 'http://viewer.server487122.nazwa.pl'];
var options = {
    origin: allowedOrigins
};
var logger = typedi_1.default.get(midLogger_1.MiddleLogger);
console.log(logger);
var app = (0, express_1.default)();
app.locals.logger = logger;
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(function (req, res, next) {
    req.app.locals.logger.process("I", req);
    next();
});
var serverStart = function () {
    app.use('/token', tokenRoute_1.tokenRouter);
    app.use('/marketEntry', marketEntryRouter_1.marketEntryRouter);
    app.use('/sessionEntry', sessionEntryRouter_1.sessionEntryRouter);
    app.use('/instrument', instrumentRoute_1.instrumentRouter);
    app.use('/sessionEvent', sessionEventRouter_1.sessionEventRouter);
    app.use('/requestToken', requestTokenRoute_1.requestTokenRouter);
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        req.app.locals.logger.process("Err", req, err.stack);
        res.status(500).send('Something broke!');
    });
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
};
exports.default = serverStart;
