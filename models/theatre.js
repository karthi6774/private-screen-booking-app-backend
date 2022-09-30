const mongoose  =  require('mongoose');

const constants  =  require('../lib/constants');


const Schema = mongoose.Schema;

const theatreSchema  = new Schema({
    theatreName :{
        type:String,
        enum :[constants.THEATRE1,constants.THEATRE2,constants.THEATRE3],
        required : true
    },
    price:{
        type:Number,
        default:1000
    },
    seats:{
        type:Number,
        default:4
    },
    hours:{
        type:Number,
        default:3
    },
    screenDate:{
        type:String,
        required:true
    },
    isMorning:{
        type:Boolean,
        default:true
    },
    isAfternoon:{
        type:Boolean,
        default:true
    },
    isEvening:{
        type:Boolean,
        default:true
    },
    isNight:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

module.exports = mongoose.model('Theatre',theatreSchema);