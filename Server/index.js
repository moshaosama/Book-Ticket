const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {
    allUsers,
    CreateUser,
    DeleteUser,
    getUser,
    updateUser,
} = require("./Controller/userController");
const { getallNotes, CreateNote } = require("./Controller/noteController");
const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cors());

app.route("/Users").get(allUsers).post(CreateUser);
app.route("/Users/:_id").delete(DeleteUser).get(getUser).put(updateUser);
app.route("/Notes").get(getallNotes).post(CreateNote);

mongoose
    .connect(process.env.Database.replace("<password>", process.env.password))
    .then(() => {
        console.log("Connected to MongoDB server Successfully");
        app.listen(process.env.Port, () => {
            console.log("Listening on port " + process.env.Port);
        });
    })
    .catch(() => {
        console.log("Connected to MongoDB server Failure");
    });
