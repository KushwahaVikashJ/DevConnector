const mongoose = require('mongoose');
const config = require('config');
const db = config.mongoURI

const connectDB = async () => {
    try{
        await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false});
        console.log(`Database connected successfully..`);
    }
    catch(err){
        console.log(err.message);
        // Exit process with failure. 
        process.exit(1);
    }
}

module.exports = connectDB