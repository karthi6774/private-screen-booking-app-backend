const User  =  require('../models/user');
const Order  = require('../models/order');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult} =  require('express-validator');

exports.singup = async (req,res,next) =>{

    try {
        const errors =  validationResult(req);
        if(!errors.isEmpty()){
            const error  =  new Error('Validation failed');
            error.statusCode  = 422;
            error.data  =  errors.array();
            throw error;
        }

        const email  =  req.body.email;
        const username  =  req.body.username;
        const password  =  req.body.password;
        const role  = req.body.role;

        let hashedPassword = await bcrypt.hash(password,12);

        const user  = new User({
            username:username,
            email:email,
            password:hashedPassword,
            role:role
        });
     let result  =  await user.save();
        res.status(201).json({message:'User created',userId : result._id});
    } catch (error) {
        next(error);
    }
};

exports.login  = async ( req,res,next) =>{
    const username  =  req.body.username;
    const password  =  req.body.password;
    let loadedUser;

    try {
        let user = await  User.findOne({username:username})

        if(!user){
            const error  =  new Error('No user found');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        let isEqual =  bcrypt.compare(password,user.password);

 
        if(!isEqual){
            const error  =  new Error('wrong password');
            error.statusCode = 401;
            throw error;
        }

        const token  =  jwt.sign({
            email:loadedUser.email,
            userId:loadedUser._id.toString(),
            role:loadedUser.role},
        process.env.TOKEN_SECRET_KEY,{expiresIn:'10hr'}
        );

        res.status(200).json({token:token,userId:loadedUser._id.toString()});
    } catch (error) {
        next(error)
    }

  

    
};

 exports.getPendingPaymentStatus = async (req,res,next) =>{
   
    try {
        let user = await  User.findById(req.userId);

        if(!user){
            const error  =  new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        let pendingPaymentsOrder =await Order.find({paymentStatus:false});

        res.status(200).json({pendingPaymentsOrder:pendingPaymentsOrder});
    } catch (error) {
        next(error);
    }
};

 exports.updatePendingPaymentStatus = async (req,res,next) =>{


    try {
        let user  = await User.findById(req.userId);

        if(!user){
            const error  =  new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const orderId  = req.body.orderId;
        const paymentStatus  = req.body.paymentStatus;

        let foundOrder  =  await Order.findById(orderId);

        foundOrder.paymentStatus = paymentStatus;

        let resultOrder  = await foundOrder.save();

        res.status(200).json({
            message: "Payment details updated successfully",
            Order :resultOrder
        });



    } catch (error) {
        next(error)
    }

};  