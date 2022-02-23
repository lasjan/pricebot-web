import { NULL_VAL } from "../../../../wildcards";
import { SheetSearchParams } from "../SheetSearchParams";

export function BuildSheetParams(instrumentId:string,
    type:string,
    from:string,
    to:string
    ):SheetSearchParams
{
    const searchParams :SheetSearchParams = {};
    if(instrumentId != NULL_VAL){
        searchParams.InstrumentId = instrumentId;
    }
    if(type != NULL_VAL){
        searchParams.Type = type;
    }
    if(from != NULL_VAL && from!=null && to != NULL_VAL && to !=null){
        searchParams.TimeStamp = {$gte:new Date(from),$lt:new Date(to)};
    }

    
    return searchParams;
}