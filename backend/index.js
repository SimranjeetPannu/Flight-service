
const express =require('express');
const dotenv =require('dotenv');
const mongoose =require('mongoose'); //the way to connect to database
require('dotenv').config();
const cors = require('cors');
//look into index.js in day2 week3

//app is our application
const app=express();
const PORT=process.env.PORT||8080;
app.use(express.json()); //middleware
app.use(cors()); //Allow all traffic


const flightRouter =  require('./routes/Flight.route.js');
app.use('/flights', flightRouter);



//All handles all http requests
app.all('*',(req,res) => {
    console.log('Request recieved but something is wrong');

        // I can chain and continuosly build out my response object using the builder design pattern
        res.status(404).send('This is not the page you are looking for!!!!');

});

//-----------------------------------------------------------

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('Successfully connected to MongoDB!')
    })
    .catch(err =>{
        console.error(err);
        process.exit(1);
    });

//Run server on a port
app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);

});