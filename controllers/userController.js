const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ email, password: hashedPassword, name, favourite_team: "not selected" });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error in sign-up:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or email' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name, favourite_team: user.favourite_team }, process.env.Mysecret, { expiresIn: "24h" })
        res.status(200).json({ token: token });
    } catch (error) {
        console.error("Error in sign-in:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const authUserToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.Mysecret, async (err, user) => {
        if (err) {
            console.error("Error verifying token:", err);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        return res.json({ id: user.id, email: user.email, name: user.name, favourite_team: user.favourite_team });
    });
};
const editUser = (req, res) => {
    const { email, name, favourite_team, token } = req.body
    jwt.verify(token, process.env.Mysecret, async (err, user) => {
        if (err) {
            console.error("Error verifying token:", err);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        const userUpdated = await UserModel.findOneAndUpdate(
            { _id: user.id },
            {
                name: name,
                email: email,
                favourite_team: favourite_team
            }
        );
        const newUser = await UserModel.findOne({ email });

        if (!userUpdated) {
            return res.status(400).json({ error: 'No user with this id' });
        }
        console.log(userUpdated)
        const newToken = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name, favourite_team: newUser.favourite_team }, process.env.Mysecret, { expiresIn: "24h" })
        return res.json({ user: newUser, token: newToken });
    });



}


module.exports = { signUpUser, signInUser, authUserToken, editUser };
