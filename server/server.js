require("dotenv").config();
const express = require("express");
const app = express();
const cors =require("cors")
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-midddleware");
const contactRoute = require("./router/contact-router");


// cors handle 
const  coreOptions={
  origin:"http://localhost:5173",
  methods:"GET,POST,PUSH,DELETE,PATCH,HEAD",
  Credential:true
}
app.use(cors(coreOptions));

// to get the json data in express app.
app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});