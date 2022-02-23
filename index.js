const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const carsRouter = require("./routes/cars");

const app = express();

app.listen(3000, () => console.log("Cars API listening on port 3000!"));

AWS.config.update({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_KEY_ID,
    accessSecretKey: process.env.AWS_SECRET_KEY,
});

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// conneting to routes 
app.use("/", carsRouter);

// app.get("/cars", function (req, res) {
//   const params = {
//     TableName: "Cars",
//     ProjectionExpression:
//       "#id, #name, #type, #manufacturer, #fuel_type, #description",
//     ExpressionAttributeNames: {
//       "#id": "id",
//       "#name": "name",
//       "#type": "type",
//       "#manufacturer": "manufacturer",
//       "#fuel_type": "fuel_type",
//       "#description": "description",
//     },
//   };
//   console.log("Scanning Cars table.");
//   docClient.scan(params, onScan);
//   function onScan(err, data) {
//     if (err) {
    //   console.error(
    //     "Unable to scan the table. Error JSON:",
    //     JSON.stringify(err, null, 2)
    //   );
//     } else {
    //   res.send(data);
    //   // print all the Cars
    //   console.log("Scan succeeded.");
    //   data.Items.forEach(function (car) {
    //     console.log(car.id, car.type, car.name);
    //   });
    //   if (typeof data.LastEvaluatedKey != "undefined") {
    //     console.log("Scanning for more...");
    //     params.ExclusiveStartKey = data.LastEvaluatedKey;
    //     docClient.scan(params, onScan);
    //   }
//     }
//   }
// });
