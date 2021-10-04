const jwt = require("jsonwebtoken");

const getUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(400).json({ msg: "Access Denied" });
  }
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData;
    next();
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = getUser;
