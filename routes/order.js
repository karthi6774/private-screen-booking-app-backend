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
        //console.log(date); // 👉️ Invalid Date
      
        const timestamp = date.getTime();
        //console.log(timestamp); // 👉️ NaN
      
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
          // 👇️ this runs
          return false;
        }
      
       return value;
    }).withMessage("Enter Date in YYYY-MM-DD")
],orderController.createOrder);

router.get('/available-slots',[
    query('screenDate')
    .custom((value,{req}) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (value.match(regex) === null) {
          return false;
        }
      
        const date = new Date(value);
        //console.log(date); // 👉️ Invalid Date
      
        const timestamp = date.getTime();
       // console.log(timestamp); // 👉️ NaN
      
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
          // 👇️ this runs
          return false;
        }
      
       return value;
    }).withMessage("Enter Date in YYYY-MM-DD")
],orderController.availableSlots);



module.exports =  router;