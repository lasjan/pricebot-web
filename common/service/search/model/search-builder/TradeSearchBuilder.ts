import { NULL_VAL } from "../../../../wildcards";

export function TradeSearchBuilderParamsBuild(instrumentId:string,
                                            periodtype:string,
                                            from:string,
                                            to:string)
    {
        let groupedSearchParams:any = {};
        let searchParamsTrades :any = {};
        let andArray = [];

        if(instrumentId != NULL_VAL){
            andArray.push({"InstrumentId" : instrumentId});
        }
        if(periodtype != NULL_VAL){
            if(periodtype == "day"){
                let datePeriodQ: any = {};
                datePeriodQ["DateTime"] = {
                    $gte: new Date(from),
                    $lte: new Date(to),
                };
            }
        }
        if(from != NULL_VAL){
            andArray.push({"periodvalue" : from});
        }
        if(to != NULL_VAL){
            andArray.push({"to" : from});
        }
      
        console.log(andArray);
        searchParamsTrades["$and"] = andArray;
        
        groupedSearchParams["searchParamsTrades"] = searchParamsTrades;
        console.error(groupedSearchParams);
        return groupedSearchParams;
}
/*

*/