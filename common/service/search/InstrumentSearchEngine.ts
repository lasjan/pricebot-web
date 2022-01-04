import internal from "stream";
import InstrumentModelCollection from "../dal/model/InstrumentSchema";
import { MongoInstrumentService } from "../dal/MongoInstrumentService";
import { MongoLogger } from "../dal/MongoLogService";

export class InstrumentSearchEngine{
    //instrumentCollection:MongoInstrumentService;
    logger:MongoLogger;
    constructor(logger:MongoLogger) 
    {
        this.logger = logger;
    }
    
    async search(pageSize:number,pageIndex:number,searchParams:any,sortParams:any){
        const from = pageSize * (pageIndex);
        const to = pageSize * (pageIndex+1);
        const sortby = sortParams.sortby??"InstrumentId";
        const sortdir = (sortParams.sortdir??"asc") == null? -1 : (sortParams.sortdir == "asc" ? 1 : -1);
        const sortP:any = {};
        sortP[sortby] = sortdir;

       
        const aggregate = await InstrumentModelCollection.aggregate([
            { $match:searchParams },
            { $setWindowFields: {
                sortBy: sortP,
                output: { rowNumber: { $documentNumber: {} } }
              }}
          ]);
          const displayedColumns= ["InstrumentId", "Ticker", "TaxId", "IsTrackable","IsPersistent"];
          //console.log(aggregate.length);
          const filtExp = (item:any) =>  item.rowNumber > from && item.rowNumber <= to;
          let filtered = aggregate.filter(filtExp);
          //console.log(from + "," + to);
          return {
              cols:displayedColumns,
              vals:filtered,
              count:aggregate.length
          }
    }
}