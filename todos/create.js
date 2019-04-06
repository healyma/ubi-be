import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export  function main(event, context) {
  try {
  const data = JSON.parse(event.body);
  console.log(data);
  const qry="INSERT INTO List_LT (LT_Name, LY_Created_URID) VALUES ('" + data.LT_Name  + "','" + event.requestContext.identity.cognitoIdentityId + "'";
  console.log(qry);
  database.query(qry , function (error, results) {
    if (error) {
      console.log(error);
        database.destroy();
        
    return failure({ status: false, error});
    } else {
        // connected!
        console.log("seemed to work");
        console.log(results);
        database.end();
        return success({ status: true });
    }
});
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e});
  }
}
