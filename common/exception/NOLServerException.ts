export class NOLServerException extends Error {
    constructor(message:string) 
    {
      super(message);
      Object.setPrototypeOf(this, NOLServerException.prototype);
      this.name = "NOLServerException"; 
    }
  }