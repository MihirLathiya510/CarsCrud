var AWS = require("aws-sdk");
require("dotenv").config({ path: "../.env" });

var fs = require("fs");
AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_KEY,
});
var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Cars into DynamoDB. Please wait.");

var cars = JSON.parse(fs.readFileSync("./data/carData.json", "utf8"));

cars.forEach(function (car) {
  // console.log(car);
  var params = {
    TableName: "Cars",
    Item: car,
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add Car",
        car.name,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", car.name);
    }
  });
});
