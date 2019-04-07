import database from "../libs/database";
import { success, failure } from "../libs/response-lib";

export  function main(event, context,callback) {
  console.log(event);
  var data;
  var userID;
  try{
  data = JSON.parse(event.body);
  }catch (e){
    data={"body": { "LT_Name" : "Not defined"}}
  }
  if(event.requestContext){
    userID=event.requestContext.identity.cognitoIdentityId;
  }else{
    userID="";
  }
  context.callbackWaitsForEmptyEventLoop = false;
  database.getConnection((err, connection) =>{
    // Use the connection
    connection.query("INSERT INTO List_LT (LT_Name, LT_Created_URID) VALUES ('" + data.LT_Name  + "','" + userID + "')", function (error, results, fields) {
      connection.release();
      if (error) callback(error);
      else callback(null,results);
    });
  });
}
