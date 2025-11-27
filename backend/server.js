
const connectDB = require("./config/db.js");
const authRoute = require ('../backend/routes/auth.js');
const postRoutes = require("./routes/post");
const express = require("express");
const mongoose = require ("mongoose");
const cors = require("cors");
require ("dotenv").config();

connectDB();


//const memoryRoutes = require ("./routes/memoryRoutes ");

const app=express();
const PORT =process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoute);

app.use("/uploads", express.static("uploads"));




app.use("/api/posts", postRoutes);


app.listen(PORT, ()=> console.log(`server runing on http://localhost:${PORT}`));

