import { NULL_VAL } from "../../../../wildcards";

export function InstrumentSearchParamsBuild(multiname:string,
                                            isTrackable:string,
                                            isPersistent:string,
                                            checkDate:string)
    {
        let groupedSearchParams:any = {};

        let searchParamsInstruments :any = {};
        let searchParamsAggragate :any = {};
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
        if(checkDate != NULL_VAL){
            searchParamsAggragate["CheckDate"] =  checkDate;
        }
        if(andArray.length == 0){
            return {};
        }
        console.log(andArray);
        searchParamsInstruments["$and"] = andArray;
        
        groupedSearchParams["searchParamsInstruments"] = searchParamsInstruments;
        groupedSearchParams["searchParamsAggragate"] = searchParamsAggragate;
        console.error(groupedSearchParams);
        return groupedSearchParams;
}
/*

*/