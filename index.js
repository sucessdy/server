require('dotenv').config()
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

app.use(express.json());
app.use("/api/users", router);

const PORT = 3000;
connectDb().then(() => {
  console.log('Connected to MongoDB'); 
  app.listen(PORT, () => {
    console.log(`Server is Running on Port :  ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
