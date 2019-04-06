import database from "../libs/database";
import { success, failure } from "../libs/response-lib";

export  function main(event, context) {
  try {
  const data = JSON.parse(event.body);
  const qry="INSERT INTO List_LT (LT_Name, LY_Created_URID) VALUES ('" + data.LT_Name  + "','" + event.requestContext.identity.cognitoIdentityId + "')";
  database.query(qry , function (error, results) {
    if (error) {
        database.destroy();
        
    return failure({ status: false, error});
    } else {
        // connected!
        database.end();
        return success({ results });
    }
});
  } catch (e) {
    return failure({ status: false, error: e});
  }
}
