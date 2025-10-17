const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const CheckToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token, "token");
      const VerifyToken = jwt.verify(token, process.env.JWTSECRET);

      const UserDetails = await User.findById(VerifyToken.id);

      if (!UserDetails) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = UserDetails;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = CheckToken;
