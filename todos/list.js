//import * as dynamoDbLib from "../libs/dynamodb-lib";
import database from "../libs/database";
import { success, failure } from "../libs/response-lib";
export  function main(event, context) {
   try {
    database.query("SELECT * FROM List_LT WHERE LT_Created_URID ='" + event.requestContext.identity.cognitoIdentityId + "'", function (error, results) {
      if (error) {
        console.log(error);
          database.destroy();
          
      return failure({ status: false, error});
      } else {
          // connected!
          console.log(results);
          database.end();
          return success({results});
      }
  });
    } catch (e) {
      console.log(e);
      return failure({ status: false, error: e});
    }
}

