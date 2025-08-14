const User = require('../models/user-models');
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).send('welcome to the server');

    } catch (error) {
        console.error('Error in home controller:', error);
        res.status(500).send('Internal Server Error');
    }
}
const register = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, phone, password } = req.body;

        // check user are already exit or not 
        const userExit = await User.findOne({ email });
        if (userExit) {
            return res.status(400).json({ message: "email already exits" })
        }

        // if user not exit then create user
        const usercreated = await User.create({
            username, email, phone, password
        });

        res.status(201).json({
            message: "registration successful",
            token: await usercreated.generateToken(),
            userId: usercreated._id.toString()
        });

    } catch (error) {
        console.error('Error in register controller:', error);
        res.status(500).send('Internal Server Error');
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExit = await User.findOne({ email });

        if (!userExit) {
            return res.status(400).json({ message: "Invalid Credials" })
        }

        // const user = await bcrypt.compare(password, userExit.password);
        const user = await userExit.comparePassword(password);

        if (user) {
            res.status(200).json({
                message: "Login successful",
                token: await userExit.generateToken(),
                userId: userExit._id.toString()
            });
        }else{
            res.status(500).send('Invalid email or password');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error',error);
    }
}

const user = async (req,res)=>{
    try {
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({userData})
        
    } catch (error) {
        console.log("error from the user route ",error)
    }
}

module.exports = {
    home,
    register,
    login,
    user
};