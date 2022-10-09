const {userLogger} = require('../logger');

exports.healthCheck =   async (req,res,next) =>{

    const healthcheck = {
        uptime: process.uptime(),
        responsetime : process.hrtime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        userLogger.info('requst to /health/ping sending health info',{ healthCheck : `${healthcheck}`});
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        userLogger.error('an error occured  while checking health ' ,{ error : `${error}`} );
        res.status(503).send();
    }
}