const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello world');
})

// Define Routes
app.use('/api/auth',require('./routes/api/Auth'))
app.use('/api/users',require('./routes/api/User'))
app.use('/api/posts',require('./routes/api/Posts'))
app.use('/api/profile',require('./routes/api/Profile'))

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)})