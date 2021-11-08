export class Instrument{
    public InstrumentId:string | undefined;
    public Status!:string;
    public constructor(init?:Partial<Instrument>) {
        Object.assign(this, init);
    }
}