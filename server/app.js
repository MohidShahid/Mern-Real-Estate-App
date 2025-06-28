const express = require('express');
const app = express();
const connectDB = require('./AppRoutes.js/connectdb');
require('dotenv').config();
const userRoutes = require('./AppRoutes.js/userRoutes');
const postRoutes = require('./AppRoutes.js/postRoutes');
const cors = require('cors')

connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : true }));
app.use('/api/post' , postRoutes)
app.use('/api/user' , userRoutes)

const PORT = 3000;

app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
})

