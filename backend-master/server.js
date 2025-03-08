const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require('cors')
// const User=require('./models/User')
// const bcrypt=require('bcryptjs')
const { registerUser, loginUser, getUser } = require('./controller/authController'); // Import functions

const app=express()
const PORT=5000

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true // If using authentication with cookies
}));


app.use("/recipe", require("./routes/recipe"))

//Home page api
app.get('/',(req, res)=>{
    res.send("<h1 align=center>Welcome to the MERN stack week 2 session</h1>")
})

app.post('/register', registerUser);
app.post('/login', loginUser);


mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully..")
).catch(
    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})