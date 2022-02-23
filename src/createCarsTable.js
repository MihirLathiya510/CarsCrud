// JavaScript - createCarsTable.jsvar
AWS = require("aws-sdk");
require("dotenv").config({ path: "../.env" });

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_KEY,
 
});
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "Cars",
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH",
    }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};
dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
