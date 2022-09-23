const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv');


const orderRoutes  =  require('./routes/order');

dotenv.config();
const app = express();

app.use(express.json());



//routes
app.use('/book-now',orderRoutes);

app.get('/', (req, res) => {
  console.log("here");
    res.send('Hello World!')
})


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



