const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv');


dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


  mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
 

    app.listen(process.env.PORT,() =>{
        console.log(`app started and listening at port ${process.env.PORT}`)
    })
  })



