import { NULL_VAL } from "../../../../wildcards";

let aggrFields: Array<string> = ['GrowthVector','RefPrice','TradePrice','HighPrice','LowPrice','OpenPrice','OpenTurnover','VolSize','VolTurnover'];
export function InstrumentSortParamsBuild(sortBy:string,
    sortDirParam:string)
{
    let sortdir = 1;
    console.log(sortDirParam)
    if(sortDirParam != NULL_VAL) {
        if(sortDirParam == "asc"){
            sortdir = 1;
        }
        if(sortDirParam == "desc"){
            sortdir = -1;
        }
    }
    //(sortParams.sortdir??"asc") == null? -1 : (sortParams.sortdir == "asc" ? 1 : -1);
    let groupedSearchParams:any = {};
    if(aggrFields.indexOf(sortBy) != -1){
        groupedSearchParams['details.' + sortBy] = sortdir;
        return groupedSearchParams;
    }
    groupedSearchParams[sortBy] = sortdir;
    return groupedSearchParams;
}