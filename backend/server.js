const connectDB = require("./config/db.js");
const authRoute = require("./routes/auth.js");
const postRoutes = require("./routes/post.js"); 
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoute);
app.use("/api/posts", postRoutes); 


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
