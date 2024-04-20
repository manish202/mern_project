const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL)
.then(() => console.log("mongodb connection successful."))
.catch((err) => {
    console.log("mongodb connection failed");
    process.exit(0);
});