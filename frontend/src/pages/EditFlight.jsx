import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import '../components/features/FormStyle.css';

//Update the data using realted id as key
export const  EditFlight = () => {

  const [flight, setFlight] = useState({
    flightNumber : '',
    departureDateTime : '',
    arrivalDateTime : '',
    departureAirport : '',
    arrivalAirport : '',
    currNumOfPassengers : 0,
    passengerLimit : 0
  });
  const{id} =useParams();
  //populate the form with data to make updates using id
  useEffect(() => {
    console.log('useEffect called in EditFlight');
    axios.get(`http://localhost:8085/flights/${id}`)
        .then(response => {
          setFlight({
            flightNumber : response.data.flightNumber,
            departureDateTime : response.data.departureDateTime.slice(0, -8),
            arrivalDateTime : response.data.arrivalDateTime.slice(0, -8),
            departureAirport : response.data.departureAirport,
            arrivalAirport : response.data.arrivalAirport,
            currNumOfPassengers : response.data.currNumOfPassengers,
            passengerLimit : response.data.passengerLimit
          })
        })
        .catch((error) => {
          console.log(error);
        });

  },[id]);//Dependency hook array

  // These methods will update the state properties.

 const changeHandler = e => {
    setFlight({...flight, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let currNumOfPassengers = flight.currNumOfPassengers;
    let passengerLimit = flight.passengerLimit;
    if(currNumOfPassengers<=passengerLimit)
    {    

    try {
        console.log(flight);

        axios.put(`http://localhost:8085/flights/${id}` ,flight)
          .then(response  => setFlight(response.data));
          window.location = '/';
        
    } catch (error) {
        console.log('Something went wrong during database update');
    }}
    else
    alert('flight cannot be overloaded');
  }
 //Return Form for Editing
 
  
  return (
  <div>
    <h3 className='text-center'>Edit Flight</h3>
    <form className='form-horizontal' onSubmit={onSubmit}>
      
        
        <div className="form-group"> 
        <label htmlFor>Flight Number </label>
        <input type="text"
            required
            className="form-control"
            name="flightNumber"
            value={flight.flightNumber}
            placeholder='ABC123'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group">
        <label>Departure Date/Time </label>
        <div>
          <input type="datetime-local"
          required
          name="departureDateTime" 
          value={flight.departureDateTime}
          onChange={changeHandler}
          />
          </div>
        </div>

      <div className="form-group">
        <label>Arrival Date/Time</label>
        <div>
          <input type="datetime-local"
          required
          name="arrivalDateTime" 
          value={flight.arrivalDateTime}
          onChange={changeHandler}
          />
          </div>
      </div>

      <div className="form-group"> 
      <label>Departure airport  </label>
        <input  type="text"
            required
            className="form-control"
            name="departureAirport"
            placeholder='MIA'
            value={flight.departureAirport}
            onChange={changeHandler}
            />
      </div>
      
      <div className="form-group"> 
      <label>Arrival Airport  </label>
        <input  type="text"
            required
            className="form-control"
            name="arrivalAirport"
            value={flight.arrivalAirport}
            placeholder='JFK'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group"> 
      <label>Seats Filled  </label>
        <input  type="number"
            required
            className="form-control"
            name="currNumOfPassengers"
            value={flight.currNumOfPassengers}
            max ={flight.passengerLimit}
            placeholder='10'
            onChange={changeHandler}
            />
      </div>
      <div className="form-group"> 
      <label>Total Seats  </label>
        <input  type="number"
            required
            className="form-control"
            name="passengerLimit"
            min="1"
            value={flight.passengerLimit}
            placeholder='12'
            onChange={changeHandler}
            />
      </div>
      <input type="submit" value="Edit Flight" className="btn btn-primary" />
      <br />
      <div className="form-group">
      </div>
    </form>
  </div>
  );
 
} 