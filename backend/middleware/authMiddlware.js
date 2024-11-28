const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from the headers
  const authHeader = req.headers.authorization;

  // Check if the token exists and starts with "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // Extract the token part

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Invalid Token:", err.message);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(403).json({ message: "Authorization token is required" });
  }
};

module.exports = { verifyToken };
