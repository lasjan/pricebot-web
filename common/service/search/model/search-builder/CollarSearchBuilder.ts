import { NULL_VAL } from "../../../../wildcards";

export function CollarSearchBuilderParamsBuild(instrumentId:string,
                                            collarType:string,
                                            periodtype:string,
                                            from:string,
                                            to:string)
    {
        let groupedSearchParams:any = {};
        let searchParamsCollar :any = {};
        let andArray = [];

        if(instrumentId != NULL_VAL){
            andArray.push({"InstrumentId" : instrumentId});
        }
        if(collarType != NULL_VAL){
            andArray.push({"Type":collarType});
        }
        if(periodtype != NULL_VAL){
            if(periodtype == "day"){
                let datePeriodQ: any = {};
                datePeriodQ["TimeStamp"] = {
                    $gte: new Date(from),
                    $lte: new Date(to),
                };
                andArray.push(datePeriodQ);
            }
        }
        console.log(andArray);
        searchParamsCollar["$and"] = andArray;
        
        groupedSearchParams["searchParamsCollar"] = searchParamsCollar;
        console.error(groupedSearchParams);
        return groupedSearchParams;
}
/*

*/