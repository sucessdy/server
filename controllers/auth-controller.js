const User = require("../models/user-models");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Controllers and MVC");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { user, email, password, phone, isAdmin } = req.body;

    // Checking if the user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists!" });
    }
    ///

    // Hashing the password

    // Creating a new user
    const userCreated = await User.create({ user, email, password, phone, isAdmin });
    res.status(201).json({ message: userCreated , token: await userCreated.generateToken(), userId: userCreated._id.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred on the server" });
  }
};

module.exports = { home, register };
