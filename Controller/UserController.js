const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HomeRoute = async (req, res) => {
  res.status(200).send("This is the Home Page Testing Route");
};

const Register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    console.log(username, password, email);

    if (!username || !password || !email) {
      res.status(400).json({
        message: "Fields Cannot Be Empty",
      });
      throw new FieldsError("Fields Cannot Be Empty");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const Salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, Salt);

    const CreateUser = new User({
      username,
      password: hasedPassword,
      email,
    });
    await CreateUser.save();

    if (CreateUser) {
      console.log(CreateUser, "Create user");
      res.status(200).json({
        message: "User Registred SuccesFully",
        _id: CreateUser.id,
        username: CreateUser.username,
        password: CreateUser.password,
        email: CreateUser.email,
        token: GenerateToken(CreateUser._id),
      });
    }

    res.status(200).json({
      message: "Registred SuccesFully",
    });
  } catch (Err) {
    console.log(Err);
    throw new RegisterError(Err | "Register Error");
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password, "email password");

    if (!email || !password) {
      res.status(201).json({
        message: "Email or Password Cannor Be Empty",
      });
      throw new LoginValidationError("Email or Password Error");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (!PasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      Message: "Login SuccesFully",
      _id: user.id,
      password: user.password,
      email: user.email,
      token: GenerateToken(user._id),
    });
  } catch (err) {
    console.log(err);
    throw new LoginError(err || "Login Error");
  }
};

const UserProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const ProfileDetails = await User.findById(id);
    if (ProfileDetails) {
      return res.status(200).json(ProfileDetails);
    } else {
      return res.status(400).json({
        message: "Profile Not Found",
      });
    }
  } catch (Err) {
    console.log(Err || "User Profile Not Found");
    throw new ProfileError("Profile Error");
  }
};

// Generating Json Web Token
const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET);
};

module.exports = {
  HomeRoute,
  Register,
  Login,
  UserProfile,
};
