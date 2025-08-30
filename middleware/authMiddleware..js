// Middleware to protecting the routes 

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect  = async(req , res , next) => {
     let token = "";

     try{
          if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
                
              token = req.headers.authorization.split(" ")[1];
              const decoded = jwt.verify(token , process.env.JWT_SECRET);
              req.user = await User.findById(decoded.id).select("-password");
              
              if(!req.user) {
               return res.status(401).json({
                    msg : "User not Found"
               })
             }
            next();
              
          }
          else{
               console.log("No Token found");
               
               return res.status(401).json({
                    msg : "Not Authorized"
               });

          }
          
     }
     catch (error){
          console.error("Error while parsing token " , error );
          return res.status(401).json({
               msg : "Unauthorized",
          })
          
     }
}

module.exports = {protect};