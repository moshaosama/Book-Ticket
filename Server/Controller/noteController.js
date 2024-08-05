const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    notename: {
        type: String,
        required: true,
    },
    dateRecieve: {
        type: Date,
        required: true,
    },
});

const noteModel = mongoose.model("Note", noteSchema);

const getallNotes = async (req, res) => {
    const allNotes = await noteModel.find();
    res.status(200).json({
        status: "Success",
        results: allNotes.length,
        data: allNotes,
    });
};

const CreateNote = async (req, res) => {
    const newNote = new noteModel();
    newNote.userid = req.body.userid;
    newNote.notename = req.body.noteName;
    newNote.dateRecieve = Date.now();
    await newNote.save();
    res.status(200).json({
        status: "Success",
        data: newNote,
    });
};

module.exports = { getallNotes, CreateNote };
