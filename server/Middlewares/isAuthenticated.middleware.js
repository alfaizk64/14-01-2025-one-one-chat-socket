const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../Config/authConfig')






const isAuthenticatedMiddleware = async (req, res, next) => {
    try {
         const token = req.cookies.token
         if (!token) {
          return res.status(401).json({ message : ' User is not authenticated' })
         }
         const decoded =  jwt.verify(token, JWT_SECRET);
         if (!decoded) {
         return  res.status(403).json({ message : 'Token is not valid' })
         }
              
         req.user = decoded;
     
         next();
    } catch (error) {
        console.log("error from middleware:", error.message);
         // Handle specific JWT errors
         if (error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired. Please log in again." });
      }

      if (error.name === "JsonWebTokenError") {
          return res.status(403).json({ message: "Invalid token." });
      }

      // Catch-all for other errors
      return res.status(500).json({ message: "An error occurred during authentication." });
        
    }
}

module.exports = isAuthenticatedMiddleware;