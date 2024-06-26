const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const isAuthenticated = require('./Authentication/tokenAuthenticate.js');

const app = express();

// Configure CORS middleware
app.use(cors({
    origin: ['http://localhost:4200', 'https://monthlyexpensefrontend.web.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));  

mongoose.connect(process.env.DB_URL).then(conn=>{
    console.log("Connection to DB is successful");
}).catch(error=>{
    console.log(error);
})

app.use(express.json());
app.use('/credentials',require('./routing/LoginRouting.js'));
app.use('/personBudget',isAuthenticated,require('./routing/personBudgetRouting.js'));
app.use('/personExpense',isAuthenticated,require('./routing/personExpenseRouting.js'));

app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.PORT}`)
});
