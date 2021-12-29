import { NULL_VAL } from "../../../../wildcards";
import { RequestTokenSearchParams } from "../RequestTokenSearchParams";


export function BuildRequestTokenParams(id:string,type:string,state:string,requestor:string):RequestTokenSearchParams
{
    const searchParams :RequestTokenSearchParams = {};
    if(id != NULL_VAL){
        searchParams.Id = id;
    }
    if(type != NULL_VAL){
        searchParams.Type = type;
    }
    if(state != NULL_VAL){
        searchParams.State = state;
    }
    if(requestor != NULL_VAL){
        searchParams.Requestor = requestor;
    }

    return searchParams;
}