export class InstrumentMarketEntry{
    InstrumentId!: string;
    Type!: string;
    TimeStamp!: Date;
    DateTime!: Date;
    Price!: string;
    Currency!: string;
    Size!: string;
    OrdersCount!: string;
    PriceLevel!: string;
    TurnoverValue!: {type:String};
    public constructor(init?:Partial<InstrumentMarketEntry>) {
        Object.assign(this, init);
    }
}