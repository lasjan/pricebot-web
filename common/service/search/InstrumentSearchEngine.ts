import internal from "stream";
import { getCurrentDate,getCurrentDateShort } from "../../utils";
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
              
        let nowShort = getCurrentDateShort();
        //console.log(nowShort);
        this.logger.InternalLog("D","InstrumentSearchEngine.search","","Filtering","","");
        let newCol = await InstrumentModelCollection.aggregate([
            { 
                $match:searchParams.searchParamsInstruments
            },
            /*{ 
                $sort: sortP
            },*/
            { 
                $lookup:{
                from:"aggregates",
                let: { id: "$InstrumentId"},
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                                [
                                   { $eq: ["$$id", "$InstrumentId" ] },
                                   { $eq: ["$DateString",searchParams.searchParamsAggragate.CheckDate ] }
                                ]
                            }
                        }
                    }
                ],
                as:"details"
            }},
            {
                $unwind: {
                path: "$details",
                preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort:sortParams
            },
            {
                $addFields: {
                    "RefPrice": "$details.RefPrice",
                    "TradePrice": "$details.TradePrice",
                    "VolSize": "$details.VolSize",
                    "VolTurnover": "$details.VolTurnover",
                }
            }
          ]);
          
       
        //let newCol = await InstrumentModelCollection.find(searchParams).sort(sortP);
        let indexer = 1;
        let newColWithRowNum = newCol.map(item=> (
            {
                ...item, 
                ...{ rowNumber:indexer++ },
                ...{ Vector: Math.round((((Number(item.TradePrice) - Number(item.RefPrice))*100)/Number(item.RefPrice))*100)/100}
             }
        ));
        //console.log(newColWithRowNum);

        /* -- tylko w V5
        const aggregate = await InstrumentModelCollection.aggregate([
            { $match:searchParams },
            { $setWindowFields: {
                sortBy: sortP,
                output: { rowNumber: { $documentNumber: {} } }
              }}
          ]);*/
          const displayedColumns= ["InstrumentId", "Ticker", "TaxId","RefPrice","TradePrice","Vector"];
          const filtExp = (item:any) =>  item.rowNumber > from && item.rowNumber <= to;
          let filtered = newColWithRowNum.filter(filtExp);

          return {
              cols:displayedColumns,
              vals:filtered,
              count:newCol.length
          }
    }
}