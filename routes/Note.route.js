const express = require("express");
const { NoteModel } = require("../model/Note.model");

const noteRouter = express.Router();
noteRouter.use(express.json())
noteRouter.get("/", async(req, res) => {
  //verify here
  const notes = await NoteModel.find();
  res.send(notes);
});
noteRouter.post("/create", async (req, res) => {
  //verify here
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send("Created the note");
  } catch (err) {
    console.log({ ERR: err });
  }
});
noteRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  console.log("payload:-",payload)
  console.log("id:-",id)
  const note = await NoteModel.find({ "_id": id });

  const userID_in_note = note[0].userID
  const userID_making_req = req.body.userID;
  console.log(note)
  console.log(userID_in_note)

  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ "msg": "You are not authorised" });
    } else {
      await NoteModel.findByIdAndUpdate({ "_id": id }, payload);
      res.send("Updated the note");
    }
  } catch (err) {
    console.log({ ERR: err });
  }
});
noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await NoteModel.findByIdAndDelete({ _id: id });

    res.send("Updated the note");
  } catch (err) {
    console.log({ ERR: err });
  }
});

module.exports = {
  noteRouter,
};
