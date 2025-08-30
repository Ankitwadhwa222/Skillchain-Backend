const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL , {
    setNewUrlParser: true,
    useUnifiedTopology: true
}).then (() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});
