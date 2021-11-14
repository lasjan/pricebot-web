import { NULL_VAL } from "../../../../wildcards";
import { TradingSessionChangeEventSearchParams } from "../TradingSessionChangeEventSearchParams";

export function BuildSessionChangeParams(instrumentId:string,type:string,subType:string):TradingSessionChangeEventSearchParams
{
    const searchParams :TradingSessionChangeEventSearchParams = {};
    if(instrumentId != NULL_VAL){
        searchParams.InstrumentId = instrumentId;
    }
    if(type != NULL_VAL){
        searchParams.Type = type;
    }
    if(subType != NULL_VAL){
        searchParams.SubType = subType;
    }

    return searchParams;
}