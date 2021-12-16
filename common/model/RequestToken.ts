export class RequestToken{
    Id!: string;
    Type!: string;
    Requestor!: string;
    RequestParams!: object;
    State!: string;
    Resolver!: string;
    Response!: string;
    TimeStamp!:string;
    public constructor(init?:Partial<RequestToken>) {
        Object.assign(this, init);
    }
}