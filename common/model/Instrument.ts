export class Instrument{
    public InstrumentId:string | undefined;
    public Status!:string;
    public Ticker!:string;
    public TaxId!:string;
    public IsPersistent!:string;
    public IsTrackable!:string;
    public constructor(init?:Partial<Instrument>) {
        Object.assign(this, init);
    }
}


