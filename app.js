const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv');

const orderRoutes  =  require('./routes/order');
const authRoutes  =  require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());


app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
});


//routes
app.use('/book-now',orderRoutes);
app.use('/auth',authRoutes);


/* app.get('/', (req, res) => {
  console.log("here");
    res.send('Hello World!')
}) */


app.use((error, req, res, next) => {
  console.log(error);
 const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT,() =>{
        console.log(`app started and listening at port ${process.env.PORT}`)
    })
  })



