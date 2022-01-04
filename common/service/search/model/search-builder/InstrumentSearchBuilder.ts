import { NULL_VAL } from "../../../../wildcards";

export function InstrumentSearchParamsBuild(multiname:string,
                                            isTrackable:string,
                                            isPersistent:string)
    {
    let searchParams :any = {};
    let andArray = [];
    if(multiname != NULL_VAL){
        const searchQ = {$or : 
        [
            {"InstrumentId" : multiname},
            {"Ticker": multiname},
            {"TaxId": multiname}
        ]};
        console.log(searchQ);
        andArray.push(searchQ);
    }
    if(isTrackable != NULL_VAL){
        andArray.push({"IsTrackable" : (isTrackable=== 'true')});
    }
    if(isPersistent != NULL_VAL){
        andArray.push({"IsPersistent" : (isPersistent=== 'true')});
    }
    if(andArray.length == 0){
        return {};
    }
    searchParams["$and"] = andArray;
    
    return searchParams;
}
/*

*/