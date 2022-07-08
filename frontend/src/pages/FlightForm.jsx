import React, { useState } from "react";
import axios from "axios";
import '../components/features/FormStyle.css';
//import FormStyle from './components/features';


export const FlightForm = () => {
  const [flight, setFlight] = useState({
    flightNumber: "",
    departureDateTime: "",
    arrivalDateTime: "",
    departureAirport: "",
    arrivalAirport: "",
    currNumOfPassengers: 0,
    passengerLimit: 0,
  });
  

  // This function will handle the submission.
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(flight);
      await axios
        .post("http://localhost:8085/flights", flight)
        .then((res) => console.log(res.data));
      window.location = "/";
    } catch (error) {
      console.log("Something went wrong!");
    }
  };
  
  
  const changeHandler = (e) => {
    let currNumOfPassengers =flight.currNumOfPassengers;
    let passengerLimit = flight.passengerLimit;
    if(currNumOfPassengers>passengerLimit)
    alert ("Flight cannot be overloaded.");
    else
     {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  
  };}


  
  return (
    <div>
      <h3 className="text-center">Add New Flight</h3>
      <form
        className="form-horizontal"
       
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label>Flight Number </label>
          <input
            type="text"
            required
            className="form-control"
            name="flightNumber"
            value={flight.flightNumber}
            placeholder="ABC123"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label>Departure Date &amp; Time: </label>
          <div>
            <input
              type="datetime-local"
              name="departureDateTime"
              min={new Date().toISOString().slice(0, -8)}
              required
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Arrival Date &amp; Time: </label>
          <div>
            <input
              type="datetime-local"
              id="meeting-time"
              name="arrivalDateTime"
              min={new Date().toISOString().slice(0, -8)}
              required
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Departure airport </label>
          <input
            type="text"
            required
            className="form-control"
            name="departureAirport"
            value={flight.departureAirport}
            placeholder="MIA"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label>Arrival Airport </label>
          <input
            type="text"
            required
            className="form-control"
            name="arrivalAirport"
            value={flight.arrivalAirport}
            placeholder="JFK"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label>Seats Filled </label>
          <input
            type="number"
            required
            className="form-control"
            name="currNumOfPassengers"
            maxLength={flight.passengerLimit}
            value={flight.currNumOfPassengers}
            placeholder="Example: 10"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label>Total Seats </label>
          <input
            type="number"
            required
            className="form-control"
            name="passengerLimit"
            minLength="1"
            value={flight.passengerLimit}
            placeholder="Example: 10"
            onChange={changeHandler}
          />
        </div>

        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Create Flight"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
  
      
};
