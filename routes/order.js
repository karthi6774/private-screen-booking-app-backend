const express = require('express');


const Order  =  require('../models/order');
const orderController  =  require('../controllers/order');
const { check ,query, body } = require('express-validator');


const router  =  express.Router();

/* 
const isAuth  =  require('../middleware/is-auth');
router.put('/signup',[
    body('email').isEmail().withMessage('Enter a valid email')
    .custom((value,{req}) =>{
        return User.findOne({email:value}).then( userDoc  =>{
            if(userDoc){
                return Promise.reject('Email already exists');
            }
        });
    }).normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().notEmpty() 

],authController.singup); */


// TODO add validation for all fields

router.post('/order',[
    body('screenDate')
    .custom((value,{req}) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (value.match(regex) === null) {
          return false;
        }
      
       const date = new Date(value);
       // console.log(new Date().toDateString()); // 👉️ Invalid Date
       // console.log(new Date(value));
        const timestamp = date.getTime();
        //console.log(timestamp); // 👉️ NaN
      
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
          // 👇️ this runs
          return false;
        }

        let bDate  = new Date(new Date(value).toISOString().split('T')[0]).getTime();
        let sDate  = new Date(new Date().toISOString().split('T')[0]).getTime();

        //console.log(new Date(value).toISOString())
       //console.log(new Date().toISOString())

       //console.log(bDate);
       //console.log(sDate);

        if(bDate < sDate){
            return false;
        }
        if(bDate >= sDate){
          return true;
        }


      
       return value;
    }).withMessage("Enter Date in YYYY-MM-DD"),
    body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
    body('phoneNumber').isNumeric().isLength({max:10,min:10}).withMessage('Enter a valid phone number'),
    body('price').isNumeric().withMessage('Enter correct price'),
    body('numberOfSeats').isNumeric().withMessage('Enter correct number of  seats')
],orderController.createOrder);

router.get('/available-slots',[
    query('screenDate')
    .custom((value,{req}) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (value.match(regex) === null) {
          return false;
        }
      
        const date = new Date(value);
        //console.log(new Date(new Date(value).toISOString().split('T')[0]).getTime()); // 👉️ Invalid Date
       // console.log(new Date(new Date().toISOString().split('T')[0]).getTime());
      
        const timestamp = date.getTime();
       // console.log(timestamp); // 👉️ NaN
      
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
          // 👇️ this runs
          return false;
        }

        let bDate  = new Date(new Date(value).toISOString().split('T')[0]).getTime();
        let sDate  = new Date(new Date().toISOString().split('T')[0]).getTime();

      // console.log(new Date(value).toISOString())
      // console.log(new Date().toISOString())

      // console.log(bDate);
      // console.log(sDate);

        if(bDate < sDate){
            return false;
        }
        if(bDate >= sDate){
          return true;
        }
        
        

        
      
       return value;
    }).withMessage("Enter Date in YYYY-MM-DD")
],orderController.availableSlots);



module.exports =  router;