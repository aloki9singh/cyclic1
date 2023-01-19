let express = require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./Middleware/authenticate.middleware");
const cors =require("cors");
const { beautyRouter } = require("./routes/Beauty.router");
const app = express();
app.use(express.json());
require("dotenv").config()
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to authentication");
});

app.use("/beauty", beautyRouter);
app.use(authenticate);
// app.use("/notes", noteRouter);
app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to mongoose db");
  } catch (err) {
    console.log({ err: err });
  }
  console.log("Server is running...");
});
