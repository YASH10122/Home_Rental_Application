const express = require("express");
const app = express();
const mongoose = require("mongoose");
const doeenv = require("dotenv").config();
const cors = require("cors");
const User = require('./models/User')

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/Listing")
const BookingRoutes = require("./routes/booking")
const userRoutes = require("./routes/user")


const corsOptions = {

  origin: ["http://localhost:5173", "http://10.112.72.30:3000"], // Removed extra space and trailing slash
  // origin: ["http://localhost:5173"],


  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "withcredentials"],

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  preflightContinue: true,
};

app.options("*", cors(corsOptions)); // This handles preflight requests
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", BookingRoutes);
app.use('/users', userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "register_table",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port sucessfully ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
