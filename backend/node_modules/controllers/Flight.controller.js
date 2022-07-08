const Flight = require("../models/Flight.model"); //we need to import our model here

//create flight
const createFlight = async ({
  flightNumber,
  departureDateTime,
  arrivalDateTime,
  departureAirport,
  arrivalAirport,
  currNumOfPassengers,
  passengerLimit,
}) => {
  try {
    const flight = new Flight({
      flightNumber,
      departureDateTime,
      arrivalDateTime,
      departureAirport,
      arrivalAirport,
      currNumOfPassengers,
      passengerLimit,
    });
    await flight.save(); // Saves the newly created flight to the database
    return flight._id;
  } catch (err) {
    // console.error(err);
    throw { status: 400, message: err };
  }
};

//Update the flight using id
const updateFlight = async (id, updatedFlight) => {
  try {
    const newflight = await Flight.findByIdAndUpdate(id, updatedFlight, {
      new: true,
    });
    if (newflight == null) {
      // if no flight found, advise to create one
      throw `The flight id ${id} does not exist, please create it first!`;
    }
    return newflight; // return results
  } catch (err) {
    console.error(err);
    throw { status: 404, message: err };
  }
};

//Find flight by ID
const findFlightById = async (id) => {
  try {
    // If no flight is found, this does NOT return a rejected promise. Instead null is returned
    const flight = await Flight.findById(id);
    if (flight == null) {
      throw `No flight with the id of ${id} found.`;
    }
    return flight; // flight was found and we return it
  } catch (err) {
    console.error(err);
    throw { status: 404, message: err }; // Akin to rejecting a Promise
  }
};

//View all Flights
const findAllFlights = async () => {
  const flights = await Flight.find();
  return flights;
};

//Delete Flight

const deleteFlight = async (id) => {
  try {
    //const flightId = req.params.id;
    const deletedFlight = await Flight.deleteOne({ _id: id });
    return deletedFlight;
  } catch (err) {
    throw { status: 400, message: err.message };
  }
};

module.exports = {
  createFlight,
  findFlightById,
  findAllFlights,
  updateFlight,
  deleteFlight,
};
