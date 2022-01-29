import { NULL_VAL } from "../../../../wildcards";

export function AggregateSearchBuilderParamsBuild(instrumentId:string,
    periodtype:string,
    from:string,
    to:string)
{
    let searchParams :any = {};
    let andArray = [];

    if(instrumentId != NULL_VAL){
        andArray.push({"InstrumentId" : instrumentId});
    }
    //console.log(from);
    if(periodtype != NULL_VAL){
        if(periodtype == "day"){
            let datePeriodQ: any = {};
            datePeriodQ["Date"] = {
                $gte: new Date(from),
                $lte: new Date(to),
            };
            andArray.push(datePeriodQ);
        }
    }
        
        searchParams["$and"] = andArray; 
        //console.log(searchParams);
        return searchParams;
}