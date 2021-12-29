import { expect } from 'chai';

describe('spread tests', () => { 
    it('checking default options', () => { 
        let query = 
            {   
                InstrumentId:   "BUMECH",
                Type:           "TRADE"
            };
            let dateQuery = {
                DateTime:"2021-12-22"
            };
            let querySpreaded = {...query,...dateQuery };
        console.log(querySpreaded)    ;
        expect(querySpreaded["DateTime"]).to.equal("2021-12-22"); 
        expect(Object.keys(querySpreaded).length).to.equal(3);
    });
});