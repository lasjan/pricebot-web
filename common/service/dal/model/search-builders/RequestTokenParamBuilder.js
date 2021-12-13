"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildRequestTokenParams = void 0;
var wildcards_1 = require("../../../../wildcards");
function BuildRequestTokenParams(id, type, state, requestor) {
    var searchParams = {};
    if (id != wildcards_1.NULL_VAL) {
        searchParams.Id = id;
    }
    if (type != wildcards_1.NULL_VAL) {
        searchParams.Type = type;
    }
    if (state != wildcards_1.NULL_VAL) {
        searchParams.State = state;
    }
    if (requestor != wildcards_1.NULL_VAL) {
        searchParams.Requestor = requestor;
    }
    return searchParams;
}
exports.BuildRequestTokenParams = BuildRequestTokenParams;
