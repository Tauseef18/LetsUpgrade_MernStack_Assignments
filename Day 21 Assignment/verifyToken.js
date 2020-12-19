
const jwt = require('jsonwebtoken');

let tokenKey = "tokenkey";
module.exports = function verifyToken(req,res,next){

    let tokenData = req.headers['authorization'];

    if(tokenData == undefined){
        res.status(403);
        res.send({"message":"Forbidden"})
    }

    else{

        let token = tokenData.split(" ")[1];

        jwt.verify(token,tokenKey,(err,user)=>{
            if(err != null){
                res.status(401);
                res.send({"message":"Invalid Token"});
            }
            else{

                req.user = user;
                next();
            }
         })

    }
}