const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
 
const userLogger = createLogger({
    levels: config.syslog.levels,
    defaultMeta: { component: 'order-service' },
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
      ),
    transports: [
        new transports.Console(),
       // new transports.File({ filename: 'combined.log' })
      ],
      exceptionHandlers: [
        new transports.Console(),
    // new transports.File({ filename: 'combined.log'})
      ]
 });
 const manualPaymentLogger = createLogger({
    levels: config.syslog.levels,
    defaultMeta: { component: 'auth-service' },
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
      ),
    transports: [
        new transports.Console(),
      //  new transports.File({ filename: 'combined.log' })
    
      ],
      exceptionHandlers: [
        new transports.Console(),
    // new transports.File({ filename: 'combined.log'})
      ]
 });
 const razorPaymentLogger = createLogger({
    levels: config.syslog.levels,
    defaultMeta: { component: 'payment-service' },
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
      ),
    transports: [
        new transports.Console(),
      //  new transports.File({ filename: 'combined.log' })
      ],
      exceptionHandlers: [
        new transports.Console(),
    // new transports.File({ filename: 'combined.log'})
      ]
 });
  
 module.exports = {
  userLogger: userLogger,
  manualPaymentLogger: manualPaymentLogger,
  razorPaymentLogger : razorPaymentLogger

 };