//import * as dynamoDbLib from "../libs/dynamodb-lib";
import database from "../libs/database";
import { success, failure } from "../libs/response-lib";
export  function main(event, context,callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  database.getConnection((err, connection) =>{
      connection.query("SELECT * FROM List_LT WHERE LT_Created_URID ='" + event.requestContext.identity.cognitoIdentityId + "'", function (error, results, fields) {
        connection.release();
        if (error) callback(error);
        else callback(null,results);
      });
    });
}

