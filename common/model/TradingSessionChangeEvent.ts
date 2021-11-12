export class TradingSessionChangeEvent{
    InstrumentId!:string;
    CurrentSessionSubId!:string;
    PreviousSessionSubId!:string;
    CurrentSessionStatus!:string;
    PreviousSessionStatus!:string;
    Type!:string;
    SubType!:string;
    TimeStamp!:string;
    public constructor(init?:Partial<TradingSessionChangeEvent>) {
        Object.assign(this, init);
    }
}