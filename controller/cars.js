const AWS = require("aws-sdk");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const getCars = async (req, res) => {
  try {
    const params = {
      TableName: "Cars",
      ProjectionExpression:
        "#id, #name, #type, #manufacturer, #fuel_type, #description",
      ExpressionAttributeNames: {
        "#id": "id",
        "#name": "name",
        "#type": "type",
        "#manufacturer": "manufacturer",
        "#fuel_type": "fuel_type",
        "#description": "description",
      },
    };
    docClient.scan(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to scan the table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        res.json({ data });
        if (typeof data.LastEvaluatedKey != "undefined") {
          console.log("Scanning for more...");
          params.ExclusiveStartKey = data.LastEvaluatedKey;
          docClient.scan(params, onScan);
        }
      }
    });
  } catch (err) {}
};
const postCar = async (req, res) => {
  try {
    const params = {
      TableName: "Cars",
      Item:req.body
    };
    docClient.put(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to add Car",
          car.name,
          ". Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        res.send("Data Added Successfully");
      }
    });
  } catch (err) {}
};
const putCars = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // console.log(req.body)
    // const expressionkeys 
    // const expressionvalues
    // for (const [key, value] of Object.entries(req.body)) {
    //   expressionkeys = ""
    //   expressionvalues = ""
    // }
    const params = {
      TableName: "Cars",
      Key: {
        id,
      },
      UpdateExpression: "set #n = :name  , description = :description, #t= :type, fuel_type= :fuel_type ,manufacturer= :manufacturer",
      // ExpressionAttributeNames: {},
      ExpressionAttributeValues: {
        ':name': req.body.name,
        ':description': req.body.description,
        ':type': req.body.type,
        ':fuel_type': req.body.fuel_type,
        ':manufacturer':req.body.manufacturer
      },
      ExpressionAttributeNames: { 
        "#n": "name",
        "#t": "type"
      }
    };
    docClient.update(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to update Car",
          ". Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        res.send("Data updated Successfully");
      }
    });
  } catch (err) {}
};
const deleteCars = async (req, res) => {
  try {
    const table = "Cars";
    const id = parseInt(req.params.id);
    const params = {
      TableName: table,
      Key: {
        id,
      },
    };
    docClient.delete(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to delete item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        res.send("data deleted Successfully");
      }
    });
  } catch (err) {}
};
const findCars = async (req, res) => {
  try {
    // console.log(req.params.id);
    const table = "Cars";
    const id = parseInt(req.params.id);
    const params = {
      TableName: table,
      Key: {
        id,
      },
    };
    docClient.get(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        // console.log(data)
        if (Object.keys(data).length>0) {
          res.json({ data });
        } else {
          res.send("data not found!")
        }
      }
    });
  } catch (err) {}
};

module.exports = {
  getCars,
  postCar,
  putCars,
  findCars,
  deleteCars,
};
