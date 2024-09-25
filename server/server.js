const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const contactRoute = require("./router/contact-router");
const businessRoute = require("./router/business-router");
const errorMiddleware = require("./middleware/error-midddleware"); 
const likeRouter = require("./router/like-router");
const path = require("path");

// CORS configuration
const coreOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};
app.use(cors(coreOptions));

// Middleware to parse JSON
app.use(express.json());

// Mount the routers
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/business", businessRoute);
app.use("/api/like", likeRouter); 


app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "dist")));
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
