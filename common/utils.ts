import moment from "moment";
import { Moment } from "moment";

export function sleep(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  export function getMDBConnString(user:string,password:string){
    return `${process.env.DB_SERVER_URL}${user}:${password}@${process.env.DB_SERVER_CLUSTER}/${process.env.DB_NAME}${process.env.DB_NOL3_CONNECTION_PARAMS}`;

  }

  export function getCurrentDate(){
    const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'; 
    let now: Moment;
    now = moment(new Date(), DATE_TIME_FORMAT);

    return now;
  }

 // mongodb://sa:X4001.X4001@127.0.0.1:27017/NOL3?authSource=admin