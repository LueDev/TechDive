const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
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
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one digit.",
    },
    required: true,
  },
  admin: { type: String, default: false },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  roles: [{ type: String }],
});

// Titlecase the firstname and lastname
function toTitleCase(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

// Best to use instance methods to isolate return data to what is safe/relevant
userSchema.methods.safeFetch = function () {
  const userObject = this.toObject();
  userObject.firstname = toTitleCase(userObject.firstname);
  userObject.lastname = toTitleCase(userObject.lastname);
  delete userObject.password,
  delete userObject.roles,
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;
  return userObject;
};

userSchema.statics.createUser = async function(userData) {
  try {
    const { password, admin, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if(admin === true){
      const roles = ["View-Notifications", "View-Exams","Update-Exams","Delete-Exams","Create-Exams"]
      const user = new this({ ...rest, roles:roles, password: hashedPassword });
      await user.save();
      return user;
    }else{
      const roles = ["View-Notifications", "View-Exams"]
      const user = new this({ ...rest, roles:roles, password: hashedPassword });
      await user.save();
      return user;
    }

  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

userSchema.statics.LoginUser = async function(email, password) {
  try {
    // Find the user by email
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log("Login successful");
      return user
    } else {
      console.log("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ error: "User Login Error - Internal Server Error" });
  }
};

// Whenever we use the save function, this function below will encrypt the user password if it's been changed.
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
