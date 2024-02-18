const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const clientSchema = new mongoose.Schema(
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
    role: {
      type: String,
      required: true,
      default: 'Client',
    },

    occupation: {
      type: String,
      required: true,
    },

    birth: {
      type: String,
      required: true,
    },

    picture: {
      type: String,
     // default: //default picture,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      state: { type: String, required: true },
    },

    cpf:{
      type: String,
      required: true,
    },

    curriculum: {
      academics: [
        {
          academic: {
            type: String,
          },
        },
      ],
      histories: [
        {
          history: {
            type: String,
          },
        },
      ],
      languages: [
        {
          language: {
            type: String,
          },
        },
      ],
      skills: [
        {
          skill: {
            type: String,
          },
        },
      ],
      goal: { type: String },
      resume: { type: String },
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

clientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

clientSchema.methods.comparePassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model('client', clientSchema, 'users');
