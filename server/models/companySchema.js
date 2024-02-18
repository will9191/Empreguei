const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail],
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password!'],
      // this runs only save() or create()
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Company',
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      state: { type: String, required: true },
    },

    cnpj: {
      type: String,
      required: true,
    },

    picture: {
      type: String,
    // default: //default picture
    },
    department: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: {
      facebook: {
        type: String,
      },
      whatsapp: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      telegram: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

companySchema.pre('save', async function (next) {
  // if password is not modified, return from the function and call the next middleware
  if (!this.isModified('password')) {
    return next();
  }

  // password is modified, hash it
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

companySchema.methods.comparePassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model('company', companySchema, 'users');
