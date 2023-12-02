const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Booelan,
    default: false,
  },
  verficiationToken: String,
  address: [
    {
      name: String,
      mobileNo: Strintring,
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      country: String,
      postalColde: String,
    },
  ],
});
