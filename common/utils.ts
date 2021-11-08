import moment from "moment";
import { Moment } from "moment";

export function sleep(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  export function getMDBConnString(user:string,password:string){
    return `${process.env.DB_SERVER_URL}${user}:${password}@${process.env.DB_SERVER_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  }

  export function getCurrentDate(){
    const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'; 
    let now: Moment;
    now = moment(new Date(), DATE_TIME_FORMAT);

    return now;
  }