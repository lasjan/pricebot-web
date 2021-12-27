import { NULL_VAL } from "../../../../wildcards";
import { InstrumentSearchParams } from "../InstrumentSearchParams";



export function BuildInstrumentSearchParams(id:string,
                                        ticker:string,
                                        taxId:string,
                                        status:string,
                                        isTrackable:string,
                                        isPersistent:string):InstrumentSearchParams
{
    const searchParams :InstrumentSearchParams = {};
    if(id != NULL_VAL){
        searchParams.InstrumentId = id;
    }
    if(ticker != NULL_VAL){
        searchParams.Ticker = ticker;
    }
    if(taxId != NULL_VAL){
        searchParams.TaxId = taxId;
    }
    if(status != NULL_VAL){
        searchParams.Status = status;
    }
    if(isTrackable != NULL_VAL){
        searchParams.IsTrackable = (isTrackable === 'true');
    }
    if(isPersistent != NULL_VAL){
        searchParams.IsPersistent = (isPersistent === 'true');
    }

    return searchParams;
}