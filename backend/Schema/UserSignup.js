// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Invalid phone number format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
