const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  internalid: { type: String, default: uuidv4() },
  firstname: { type: String, lowercase: true, required: true },
  lastname: { type: String, lowercase: true, required: true },
  email: { type: String, required: true, lowercase: true },
  password: {
    type: String,
    minLength: 8,
    validate: {
      validator: (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
      },
      message:
        'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one digit.',
    },
    required: true,
  },
  admin: { type: String, default: false },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  permissions: [{ type: String }],
  role: { type: String },
});

userSchema.index({ id: 1 });

// Titlecase the firstname and lastname
function toTitleCase(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

userSchema.methods.safeFetch = function () {
  const userObject = this.toObject();
  userObject.firstname = toTitleCase(userObject.firstname);
  userObject.lastname = toTitleCase(userObject.lastname);
  delete userObject._id;
  delete userObject.admin;
  delete userObject.password;
  delete userObject.permissions;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;
  return userObject;
};

userSchema.statics.createUser = async function (userData) {
  try {
    const { password, admin, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (admin === true) {
      const permissions = [
        'View-Notifications',
        'View-Exams',
        'Update-Exams',
        'Delete-Exams',
        'Create-Exams',
      ];
      const user = new this({
        ...rest,
        permissions: roles,
        password: hashedPassword,
      });
      await user.save();
      return user;
    } else {
      const permissions = ['View-Notifications', 'View-Exams'];
      const user = new this({
        ...rest,
        permissions: permissions,
        password: hashedPassword,
      });
      await user.save();
      return user;
    }
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

userSchema.statics.LoginUser = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const storedHashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(
      password,
      storedHashedPassword,
    );

    if (isPasswordValid) {
      console.log('Login successful');
      return user.safeFetch();
    } else {
      console.log('Invalid credentials');
    }
    console.log('Invalid credentials');
  } catch (error) {
    throw new Error('User Model Login Error - Internal Server Error');
  }
};

// Encrypt the user password if it's been changed.
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = { User };