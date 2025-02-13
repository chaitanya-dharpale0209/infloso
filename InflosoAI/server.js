const express = require('express');
const connectDb =require('../InflosoAI/Config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');

//defining all the environment configurations and database configurations in our main file
dotenv.config();
connectDb();

//creating an object of Express
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(json());

app.use('/api/auth', require('../InflosoAI/Router/UserAuthRouter'))
//running our express server on the declared port in environment
app.listen(process.env.PORT, ()=>{
console.log(`your InflosoAI server is running on ${process.env.PORT}`);
})