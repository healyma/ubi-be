import database from "../libs/database";
import { success, failure } from "../libs/response-lib";


export  function main(event, context) {
  try {
  const data = JSON.parse(event.body);
  console.log(data);
  const qry="UPDATE List_LT SET LT_Name='" + data.LT_Name  + "' Where LT_ID=" + data.LT_ID;
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

