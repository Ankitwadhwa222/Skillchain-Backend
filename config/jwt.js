const jwt = require("jsonwebtoken");

jwt.sign({userID} , process.env.JWT_SECRET , {expiresIn: "1d" , algorithm: "HS256"} , (err , token)).then(() => {
    if (err) {
        console.error("Error signing JWT:", err);
        return;
    }
    console.log("JWT signed successfully:", token);
}).catch((error) => {
    console.error("Error while signing JWT:", error);
})