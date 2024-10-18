const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  user: {
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
  phone: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//  secure the password using bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user.isModified("password"));
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});



userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(), 
            email : this.email, 
            isAdmin: this.isAdmin

        }, process.env.JWT_SECRET_TOKEN, {
            expires: "30d"
        })
    } catch (error) {
        console.log(error)
    }
}
const User = new mongoose.model("User", userSchema);

module.exports = User;
