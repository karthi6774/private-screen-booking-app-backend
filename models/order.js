const mongoose  =  require('mongoose');

const Schema  =  mongoose.Schema;

const orderSchema  =  new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    theatreName:{
        type:String,
        required:true
    },
    screenDate:{
        type:Date,
        required:true
    },
    screenFromTime:{
        type:Date,
        required:true
    },
    screenToTime:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    numberOfSeats:{
        type:Number,
        required:true
    }





},
{timestamps:true});

module.exports = mongoose.model('Order',orderSchema);