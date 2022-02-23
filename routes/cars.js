const express = require("express");
const router = express.Router();

const {
  getCars,
  findCars,
  deleteCars,
  putCars,
  postCar,
} = require("../controller/cars");


//get requests
router.get("/", getCars);
router.get("/:id", findCars);

// post requests
router.post("/postCars", postCar);

// delete requests
router.delete("/deleteCars/:id", deleteCars);

// update requests
router.put("/updateCars/:id", putCars);

module.exports = router;
