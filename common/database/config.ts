import { connect } from "mongoose";
import { getMDBConnString } from "../utils";

const mongoDefaultConnection = async ()=>{
    try{
        await connect(getMDBConnString(process.env.DB_NOL3_USER!,process.env.DB_NOL3_USER_PASS!));
    }
    catch(error){
        console.log("database connection failed. exiting now...");
        console.error(error);
    }
}

export default mongoDefaultConnection;