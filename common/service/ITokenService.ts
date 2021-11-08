export interface ITokenService{
    getTokenForUserAction(userId:string,actionName:string):Promise<string>;
    setTokenForUserAction(userId:string,actionName:string,tokenValue:string):Promise<any>;
}