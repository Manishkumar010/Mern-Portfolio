 const mongoose = require('mongoose');

//  const URI = 'mongodb://localhost:27017/mern-Admin';
const URI = process.env.MONGO_URI;

 const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log('Database connected successfully');
        
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(0);
        
    }
 }
 module.exports = connectDb;