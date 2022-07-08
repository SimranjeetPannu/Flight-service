const router = require("express").Router();
const flightModel = require("../models/Flight.model");

const {
  createFlight,
  findAllFlights,
  findFlightById,
  updateFlight,
  deleteFlight,
} = require("../controllers/Flight.controller");

// GET - return all flights
router.get("/", async (req, res) => {
  const flights = await findAllFlights();
  res.json(flights);
});

//GET - return flight by id
router.get("/:id", async (req, res) => {
  try {
    const flight = await findFlightById(req.params.id);
    res.json(flight);
  } catch (err) {
    res.status(err?.status || 400).json(err);
  }
});

// POST - create a new flight
router.post("/", async (req, res) => {
  try {
    const flightId = await createFlight(req.body);
    res.status(201).json({ _id: flightId }); //201 for successful creation
  } catch (err) {
    res.status(err?.status || 500).json(err);
  }
});

// PUT - update a flight
router.put("/:id", async (req, res) => {
  try {
    const flight = await updateFlight(req.params.id, req.body);
    res.status(201).json({ flight });
  } catch (err) {
    res.status(err?.status || 500).json(err);
  }
});

// DELETE - delete a specific flight with unique Flight number
router.delete("/:id", async (req, res) => {
  try {
    const deletedFlight = await deleteFlight(req.params.id);
    res.status(201).json({ deletedFlight });
  } catch (err) {
    res.status(err?.status || 500).json(err);
  }
});

//export your router
module.exports = router;
