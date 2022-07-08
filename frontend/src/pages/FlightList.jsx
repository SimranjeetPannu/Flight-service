import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//Displaying List of Flights in Table view
const Flight = (props) => (
  <tr>
    <td>
      <b>{props.flight.flightNumber}</b>
    </td>
    <td>
      {props.flight.departureDateTime.substring(0, 10) +
        "/ " +
        props.flight.departureDateTime.substring(11, 16)}
    </td>
    <td>
      {props.flight.arrivalDateTime.substring(0, 10) +
        " /" +
        props.flight.arrivalDateTime.substring(11, 16)}
    </td>
    <td>{props.flight.departureAirport}</td>
    <td>{props.flight.arrivalAirport}</td>
    <td>{props.flight.currNumOfPassengers}</td>
    <td>{props.flight.passengerLimit}</td>
    <td>
      <button className="btn btn-secondary">
        <Link to={"/edit/" + props.flight._id} style={{ color: "white" }}>
          Edit
        </Link>
      </button>
      |
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteFlight(props.flight._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

// As soon as the component loads, we fetch all movies
export const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:8085/flights/")
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteFlight = (id) => {
    axios.delete("http://localhost:8085/flights/" + id).then((response) => {
      console.log(response.data);
    });

    setFlights(flights.filter((element) => element._id !== id));
  };

  const flightsList = () => {
    return flights.map((currentFlight) => {
      return (
        <Flight
          flight={currentFlight}
          deleteFlight={deleteFlight}
          key={currentFlight._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>List of Flights</h3>
      <table
        className="table table-hover"
        style={{ background: "rgba(290,290,290,0.4)" }}
      >
        <thead className="thead-light">
          <tr>
            <th>Flight number</th>
            <th>Departure Date/Time</th>
            <th>Arrival Date/Time</th>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Seats Filled</th>
            <th>Total Seats</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{flightsList()}</tbody>
      </table>
    </div>
  );
};
