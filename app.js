const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

const orderRoutes  =  require('./routes/order');
const authRoutes  =  require('./routes/auth');
const healthRoutes  = require('./routes/healthchecker');

const { userLogger }  = require('./logger');





dotenv.config();
const app = express();

app.use(express.json());

app.use(morgan('combined'));


/* app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',i'Content-Type, Authorzation');
  next();
}); */


const whitelist = [process.env.WHITE_LIST_01, process.env.WHITE_LIST_02]

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
   //if(!origin) return callback(null, true);

    if(whitelist.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  allowedHeaders :['Content-Type', 'Authorization' ],
  methods :['GET', 'POST', 'PUT', 'PATCH', 'DELETE','OPTIONS']
}));


//routes
app.use('/book-now',orderRoutes);
app.use('/auth',authRoutes);
app.use('/health',healthRoutes);





app.use((error, req, res, next) => {
  userLogger.error('an error occured ' , {
    error : `${error}`
    } )
  //console.log(error);
 const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(port,() =>{
        userLogger.info(`app started and listening at port ${process.env.PORT}`)
    })
  })



