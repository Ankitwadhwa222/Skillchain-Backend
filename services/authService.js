const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/User")


// genrating token 
const genrateToken = (id) => {
     return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "1h"});
}
// registering user

const registerUser = async (fullName , email , password , role) => {
     const existingUser = await User.findOne({email});
     if(existingUser) {
          throw new Error("User already exists")
     }



 

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password , salt);

 
const user = await User.create({
     fullName,
     email,
     password: hashedPassword,
     Role : role,
});
if(user) {
     return {
          id : user._id,
          fullName : user.fullName,
          email : user.email,
          role : user.role,
          token : genrateToken(user._id)
     }
}

}

const loginUser = async(email , password) => {
     const user = await User.findOne({email});
     if(!user){
          throw new Error("Invalid email or password");
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
          throw new Error("Invalid email or password");
     }
     return {
          _id : user._id,
          fullName : user.fullName,
          email : user.email,
          role : user.role,
          token : genrateToken(user._id)
     };
};

const loginWithGoogle = async (googleProfile) => {
  let user = await User.findOne({ email: googleProfile.email });

  if (!user) {
    user = await User.create({
      fullName: googleProfile.name,
      email: googleProfile.email,
      googleId: googleProfile.sub,  
      role: "user",
    });
  }

  const token = generateToken(user._id);
  return { user, token };
};
2

module.exports = {
     registerUser,
     loginUser,
     loginWithGoogle,
};