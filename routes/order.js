const express = require('express');


const Order  =  require('../models/order');
const orderController  =  require('../controllers/order');


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

router.post('/order',orderController.createOrder);

router.get('/available-slots',orderController.availableSlots);



module.exports =  router;