const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
  .connect(
    'mongodb+srv://sh8salmanhasan:@cluster0.2dywbrs.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })

  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log('Server is running on port 8000');
});

const User = require('./models/user');
const Order = require('./models/order');

//function to send Verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sh8salmanhasan@gmail.com',
      pass: '',
    },
  });
};

//end point to register in the application
app.post('/register', async (req, res) => {
  try {
    const { name, emai, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    //create a new User
    const newUser = new User({ name, email, password });

    //generate and store the verification token
    newUser.verificationToken = crytpo.randomBytes(20).toString('hex');

    //save the user to the database
    await newUser.save();

    //send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log('error registering user', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});
