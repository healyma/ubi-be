import database from "../libs/database";
import { success, failure } from "../libs/response-lib";

export  function main(event, context,callback) {
  const data = JSON.parse(event.body);
  database.getConnection((err, connection) =>{
    // Use the connection
    connection.query("INSERT INTO List_LT (LT_Name, LT_Created_URID) VALUES ('" + data.LT_Name  + "','" + event.requestContext.identity.cognitoIdentityId + "')", function (error, results, fields) {
      connection.release();
      if (error) callback(error);
      else callback(null,results);
    });
  });
}
