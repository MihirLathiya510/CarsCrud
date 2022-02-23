var AWS = require("aws-sdk");
require("dotenv").config({ path: "../.env" });

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_KEY,
});
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Cars";
var id = 1;
var params = {
  TableName: table,
  Key: {
    id: id,
  },
};
docClient.get(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
