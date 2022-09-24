const express = require('express');
const { body }  =  require('express-validator');

const User  =  require('../models/user');
const authController  =  require('../controllers/auth');
const isAuth  =  require('../middleware/is-auth');

const router  =  express.Router();

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
    body('username').trim().notEmpty()
    .custom((username,{req}) => {
        return User.findOne({username:username}).then( userDoc =>{
            if(userDoc){
                return Promise.reject('username already exists');
            }
        });
    }) 

],authController.singup);

router.post('/login',authController.login);

/* router.get('/status',isAuth,authController.getUserStatus);

router.patch('/status',isAuth,authController.updateStatus); */

router.get('/pending-payments',isAuth,authController.getPendingPaymentStatus);

router.put('/pending-payment-status',isAuth,authController.updatePendingPaymentStatus);

module.exports =  router;