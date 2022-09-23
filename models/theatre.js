const mongoose  =  require('mongoose');

const constants  =  require('../lib/constants');


const Schema = mongoose.Schema;

const theatreSchema  = new Schema({
    theatreName :{
        type:String,
        enum :[constants.THEATRE1,constants.THEATRE2,constants.THEATRE3],
        required : true
    },
    screenDate:{
        type:Date,
        required:true
    },
    isMorning:{
        type:Boolean,
        default:false
    },
    isAfternoon:{
        type:Boolean,
        default:false
    },
    isEvening:{
        type:Boolean,
        default:false
    },
    isNight:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('Theatre',theatreSchema);