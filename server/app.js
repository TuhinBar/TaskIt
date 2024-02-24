const dotenv = require("dotenv");
dotenv.config({ path: "./dev.env" });

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/connectDB");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/users.route");
const taskRoutes = require("./routes/tasks.route");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server is running on port 5000");
  });
})();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
