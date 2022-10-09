const jwt  =  require('jsonwebtoken');

module.exports = (req,res,next) =>{

    let decodedToken;

    try {
        let authHeader =  req.get('Authorization');
      //  console.log(authHeader);
        if(authHeader === undefined){
            const error  =  new Error('Not authenticated');
            error.statusCode  =  401;
            throw error;
        }
        authHeader  =  authHeader.split(' ')[1];

     // console.log("auth header " + req);
        if(!authHeader){
            const error  =  new Error('Not authenticated');
            error.statusCode  =  401;
            throw error;
        }
       // const token =  authHeader.split(' ')[1];
        const token = authHeader;
       // console.log("token" + token);

        decodedToken =   jwt.verify(token,process.env.TOKEN_SECRET_KEY);

       // console.log(decodedToken);

        if(!decodedToken){
            const error  =  new Error('Not authenticated');
            error.statusCode  =  401;
            throw error;
        }

        if(decodedToken.role !== "ADMIN"){
            const error  =  new Error('Not Authorized');
            error.statusCode  =  401;
            throw error;
        }

        req.userId  = decodedToken.userId;
    next();


    } catch (error) {
        next(error);
    }

    

    
    
};