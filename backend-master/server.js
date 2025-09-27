const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { registerUser, loginUser, getUser } = require('./controller/authController');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use('/images', express.static('public/images'));

// Routes
app.use("/recipe", require("./routes/recipe"));
app.get('/', (req, res) => {
    res.send("<h1 align=center>Welcome to the MERN stack week 2 session</h1>");
});
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connected successfully..");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        });
    })
    .catch(err => {
        console.error("DB connection error:", err);
    });
