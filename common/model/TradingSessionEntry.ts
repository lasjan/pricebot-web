export class TradingSessionEntry{
    SessionId!:string;
    InstrumentId!:string;
    SessionSubId!:string;
    InstrumentSecId!:string;
    InstrumentSecIdSource!:string;
    SessionStatus!:string;
    TimeStamp!:string;
    public constructor(init?:Partial<TradingSessionEntry>) {
        Object.assign(this, init);
    }
}