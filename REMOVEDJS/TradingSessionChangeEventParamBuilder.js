"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildSessionChangeParams = void 0;
var wildcards_1 = require("../../../../wildcards");
function BuildSessionChangeParams(instrumentId, type, subType) {
    var searchParams = {};
    if (instrumentId != wildcards_1.NULL_VAL) {
        searchParams.InstrumentId = instrumentId;
    }
    if (type != wildcards_1.NULL_VAL) {
        searchParams.Type = type;
    }
    if (subType != wildcards_1.NULL_VAL) {
        searchParams.SubType = subType;
    }
    return searchParams;
}
exports.BuildSessionChangeParams = BuildSessionChangeParams;
