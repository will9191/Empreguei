const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail],
    },
    password: {
      type: String,
      required: true,
      minlenght: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Senhas não coincidem',
      },
    },
    picture: {
      type: String,
     // default: //default picture
    },
    role: {
      type: String,
      default: 'Admin',
    },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

adminSchema.methods.comparePassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model('admin', adminSchema, 'users');
