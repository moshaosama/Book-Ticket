const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    fname: {
        type: String,
        required: [true, "a User must have a fName"],
    },
    lname: String,
    email: String,
    date: String,
    username: String,
});
const userModel = mongoose.model("User", UserSchema);

const allUsers = async (req, res) => {
    const getAllUsers = await userModel.find();

    if (getAllUsers?.length == 0) {
        return res.status(404).json({
            status: "error",
            Message: "User not found",
        });
    }
    //Sorting
    res.status(200).json({
        status: "success",
        result: getAllUsers.length,
        data: getAllUsers,
    });
};
const CreateUser = async (req, res) => {
    const createUser = new userModel();
    createUser.fname = req.body.fName;
    createUser.lname = req.body.lName;
    createUser.email = req.body.Email;
    createUser.date = req.body.Date;
    createUser.username = req.body.userName;
    await createUser.save();
    res.status(200).json({
        status: "success",
        data: {
            users: createUser,
        },
    });
};
const DeleteUser = async (req, res) => {
    const id = req.params._id;
    const deleteUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({
        status: "suuccess",
        data: deleteUser,
    });
};

const getUser = async (req, res) => {
    const id = req.params._id;
    const getUser = await userModel.findById(id);
    res.status(200).json({
        status: "success",
        data: getUser,
    });
};

const updateUser = async (req, res) => {
    const id = req.params._id;
    const patchUser = await userModel.findByIdAndUpdate(
        id,
        {
            username: req.body.userName,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.json(patchUser);
};

module.exports = { allUsers, CreateUser, updateUser, getUser, DeleteUser };
