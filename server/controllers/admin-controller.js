const User = require("../models/user-models");
const Contact = require("../models/contact-models");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" })
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error)
    }
};

// get all contact details
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(400).json({ message: "No Contacts found" })
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error);
    }
};

// Delete  user by id
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "User Deleted" })
    } catch (error) {
        console.log("delete user error", error)
    }
};

// get a single  user by id
const getAllUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data)
    } catch (error) {
        console.log("delete user error", error)
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne(
            { _id: id },
            {
                $set: updatedUserData,
            }
        );
        return res.status(200).json(updatedData)

    } catch (error) {
        next(error)
    }
};

const deleteContactsById = async () => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id })
        return res.status(200).json({ message: "Contact Deleted" })

    } catch (error) {
        console.log("deleteContactbyId", error)
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getAllUserById, updateUserById, deleteContactsById };