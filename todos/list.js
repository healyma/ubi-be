//import * as dynamoDbLib from "../libs/dynamodb-lib";
import Database from "../libs/database";
import { success, failure } from "../libs/response-lib";

var sequelize = database.sequelize;
export async function main(event, context) {
  const params = {
    TableName: process.env.todosTableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    sequelize.query(`SELECT * FROM List_LT WHERE LT_URID = ${event.requestContext.identity.cognitoIdentityId}`, { type: sequelize.QueryTypes.SELECT})
  .then(todos => {
        return todos;
  });
  } catch (e) {
    return failure({ status: false });
  }
}

