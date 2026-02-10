const User = require('../models/userModel');
const jsonwebtoken = require('jsonwebtoken');

// @Register a new user
// @route POST /api/auth/register
// @access Public
const createUser = async(req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
         if (existingUsername || existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
            username,
            email,
            password
        });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//@Login for existing user
//@route POST /api/auth/login
//@access Public
const login = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc create admin user
// @route POST /api/auth/create-admin
// @access Private (only for existing admin users)

const createAdmin = async(req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (role !== 'admin') {
        return res.status(400).json({ message: "Invalid role" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const admin = await User.create({
            username,
            email,
            password,
            role,
        });
        res.status(201).json({
            message: "Admin user created successfully",
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    login,
    createAdmin
};