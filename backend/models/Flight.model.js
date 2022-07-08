/*Flight must have:
-Flight Number
-Departure Date 
-Arrival date 
-departure time 
-arrival time 
-departure airport 
-arrival airport 
-current number of passengers 
-passenger limit (flights cannot have more passengers on them/ booked than their limit allows)*/

//Create Schemas for the documents using Mongoose
const mongoose = require('mongoose');
const Schema =mongoose.Schema;

//Sample
const myFlight ={
    flightNumber:'A11',
    departureDateTime: '',
    arrivalDateTime:'',
    departureAirport:'MIA',
    arrivalAirport:'ATL',
    currNumOfPassengers:1,
    passengerLimit:10

};

//Schema for Flight 
const flightSchema = new Schema({

    flightNumber:{
        //object Flight Number 
        type: String,
        unique:true, //A unique index ensures that the indexed fields do not store duplicate values
        required:true
    },
    
    departureDateTime:{
        type: Date,
        required:true
    },

    arrivalDateTime:{
        type: Date,
        required:true
    },

    departureAirport: {
        type: String,
       required: true
    },
    
    arrivalAirport: {
        type: String,
        required: true
    },

    currNumOfPassengers: {
        type: Number,
        required : true,
        min: [0, 'Minimum capacity is 0'],
        max: [50, 'Maximum flight capacity is 50']
    },
   
    passengerLimit: {
        type: Number,
        required :true,
        min: [0, 'Minimum capacity is 0'],
        max: [50, 'Maximum flight capacity is 50']
    }
},{
    timestamps: true,
}) ;
//                            Model Name | Schema Object | Collection Name in Atlas
const Flight = mongoose.model('Flight', flightSchema, 'Flights'); //need to use Flight object in controllers
module.exports = Flight;
