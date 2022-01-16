import { NULL_VAL } from "../../../../wildcards";
import { TradingSessionChangeEventSearchParams } from "../TradingSessionChangeEventSearchParams";

export function BuildSessionChangeParams(instrumentId:string,
    type:string,
    subType:string,
    from:string,
    to:string
    ):TradingSessionChangeEventSearchParams
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
    if(from != NULL_VAL && from!=null && to != NULL_VAL && to !=null){
        searchParams.TimeStamp = {$gte:new Date(from),$lt:new Date(to)};
    }

    
    return searchParams;
}