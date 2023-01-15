let express = require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./Middleware/authenticate.middleware");
const { noteRouter } = require("./routes/Note.route");
const { userRouter } = require("./routes/User.route");
const cors =require("cors")
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to authentication");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);
app.listen(4600, async (req, res) => {
  try {
    await connection;
    console.log("Connected to mongoose db");
  } catch (err) {
    console.log({ err: err });
  }
  console.log("Server is running...");
});
