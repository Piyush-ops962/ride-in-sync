const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        console.log(username);
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role,
        });
    
        await newUser.save();
    
        const token = jwt.sign({ userId: newUser._id, username: newUser.username, role: newUser.role }, 'your-secret-key', {
          expiresIn: '1h',
        });
    
        res.status(201).json({ token, userId: newUser._id, username: newUser.username, role: newUser.role });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'your-secret-key', {
          expiresIn: '1h',
        });
    
        res.status(200).json({ token, userId: user._id, username: user.username, role: user.role });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

};
