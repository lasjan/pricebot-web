import { expect } from 'chai';
import { query } from "express";
import mongoDefaultConnection from "../common/database/config"
import InstrumentModelCollection from "../common/service/dal/model/InstrumentSchema"
describe('instrument-search tests', () => { 
    it('checking aggregate', async () => { 
        require('dotenv').config();
        await mongoDefaultConnection();
        const matchQuery = {
            "IsTrackable":true,
            "IsPersistent":false
        };
        const pageSize = 10;
        const pageIndex = 2;
        const from = pageSize * (pageIndex-1);
        const to = pageSize * pageIndex;
        const aggregate = await InstrumentModelCollection.aggregate([
            {$match:matchQuery},
            { $setWindowFields: {
                sortBy: { "Ticker": 1 },
                output: { rowNumber: { $documentNumber: {} } }
              }}
          ]);
          console.log(aggregate.length);
          const filtExp = (item:any) =>  item.rowNumber > from && item.rowNumber <= to;
          let filtered = aggregate.filter(filtExp);
          filtered.forEach(element => {
              console.log(element);
          });
          expect(true).to.equal(true); 
    });
});