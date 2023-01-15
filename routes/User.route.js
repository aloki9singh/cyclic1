let express = require("express");

const { UserModel } = require("../model/User.model");
const userRouter = express.Router();
// const userRouter = express();
// userRouter.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// console.log(bcrypt);


userRouter.get("/", async(req, res) => {
  //verify here
  const notes = await UserModel.find();
  res.send(notes);
});
////////////registered//
userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;

  try {
    const saltRounds = 5;
    bcrypt.hash(pass, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, pass: hash, name, age });
        //when we interact with database the use await
        await user.save();
        res.send(" Registration Successful");
      }
    });
  } catch (err) {
    console.log({ err: err });
    res.send("Error while Registering the user.")
  }
});
////////////logged
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.find({ email });

    console.log(email);
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          console.log("Token:-", token);
          res.send({"token":token});
        } else {
          res.send("Wrong Credentials.");
        }
      });
    } else {
      res.send("Error while Login the user is not found.");
    }
  } catch (err) {
    console.log({ err: err });
    res.send("Error while Login the user.");
  }
});
userRouter.post("/about", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email, pass });
    console.log(email);
    if (user.length > 0) {
      console.log(user);
      res.send("Login Successful");
    } else {
      res.send("Error while Login the user is not found.");
    }
  } catch (err) {
    console.log({ err: err });
    res.send("Error while Login the user.");
  }
});
userRouter.get("/data", async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      res.send("Invalid token");
      console.log(err);
    } else {
      res.send("Data...");
    }
  });
});
userRouter.get("/cart", async (req, res) => {
  const token = req.query.token;
  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      res.send("Invalid token");
      console.log(err);
    } else {
      res.send("Cart Page...");
    }
  });
});
userRouter.post("/contact", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email, pass });
    console.log(email);
    if (user.length > 0) {
      console.log(user);
      res.send("Login Successful");
    } else {
      res.send("Error while Login the user is not found.");
    }
  } catch (err) {
    console.log({ err: err });
    res.send("Error while Login the user.");
  }
});

module.exports = {
  userRouter,
};
