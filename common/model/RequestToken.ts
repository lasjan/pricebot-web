export class RequestToken{
    Id!: string;
    Type!: string;
    Requestor!: string;
    RequestParams!: string;
    State!: string;
    Resolver!: string;
    Response!: string;
    TimeStamp!:string;
    public constructor(init?:Partial<RequestToken>) {
        Object.assign(this, init);
    }
}