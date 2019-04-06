import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";


export function main(event, context) {
  try {
    console.log(event.pathParameters);
    database.query(`DELETE FROM List_LT WHERE LT_ID = ` + event.pathParameters.id, function (error, results) {
      if (error) {
        console.log(error);
          database.destroy();
          
      return failure({ status: false, error});
      } else {
          // connected!
          console.log(results);
          database.end();
          return success(results);
      }
  });
    } catch (e) {
      console.log(e);
      return failure({ status: false, error: e});
    }
}
