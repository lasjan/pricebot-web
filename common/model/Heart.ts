export class Heart{
    public HeartId:string | undefined;
    public Status!:string;
    public constructor(init?:Partial<Heart>) {
        Object.assign(this, init);
    }
}