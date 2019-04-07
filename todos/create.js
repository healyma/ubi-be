import database from "../libs/database";
import { success, failure } from "../libs/response-lib";

export  function main(event, context,callback) {
  console.log(event);
  const data = event.body;

  context.callbackWaitsForEmptyEventLoop = false;
  database.getConnection((err, connection) =>{
    // Use the connection
    connection.query("INSERT INTO List_LT (LT_Name, LT_Created_URID) VALUES ('" + data.LT_Name  + "','" + event.requestContext.identity.cognitoIdentityId + "')", function (error, results, fields) {
      connection.release();
      if (err) return failure( {status: false, error:err});
      if(error) return failure( {status: false, error:error});
      return success(results);
    });
  });
}
