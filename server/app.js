const dotenv = require("dotenv");
dotenv.config({ path: "./dev.env" });

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/connectDB");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Routes

(async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
})();

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});
