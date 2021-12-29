import { NULL_VAL } from "../../../../wildcards";
import { InstrumentSearchParams } from "../InstrumentSearchParams";



export function BuildInstrumentUpdateParams(requestBody:any):{}
{
    const updateParams:any = {};
    const searchParams :InstrumentSearchParams = {};
    /*if(requestBody.InstrumentId != null
        && requestBody.InstrumentId != NULL_VAL){
            updateParams.push({"InstrumentId": requestBody.InstrumentId});
    }*/
    if(requestBody.Ticker != null
        && requestBody.Ticker != NULL_VAL){
            //updateParams.push({"Ticker": requestBody.Ticker});
            updateParams.Ticker = requestBody.Ticker;
    }
    if(requestBody.TaxId != null
        && requestBody.TaxId != NULL_VAL){
            //updateParams.push({"TaxId": requestBody.TaxId});
            updateParams.TaxId = requestBody.TaxId;
    }
    if(requestBody.Status != null
        && requestBody.Status != NULL_VAL){
            //updateParams.push({"Status": requestBody.Status});
            updateParams.Status = requestBody.Status;
    }
    if(requestBody.IsTrackable != null
        && requestBody.IsTrackable != NULL_VAL){
           // updateParams.push({"IsTrackable": requestBody.IsTrackable});
            updateParams.IsTrackable = requestBody.IsTrackable;
    }
    if(requestBody.IsPersistent != null
        && requestBody.IsPersistent != NULL_VAL){
            //updateParams.push({"IsPersistent": requestBody.IsPersistent});
            updateParams.IsPersistent = requestBody.IsPersistent;
    }

    return updateParams;
}