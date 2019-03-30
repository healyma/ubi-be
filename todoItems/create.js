import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.todoItemsTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      todoItemId: uuid.v1(),
      complete: data.complete,
      itemName: data.itemName,
      createdAt: Date.now()
      
    }
  };


  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {

    return failure({ status: false, "error" : e, table: process.env.todoItemsTableName});
  }
}

