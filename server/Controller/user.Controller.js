import userSchema from "../Models/user.model.js"
import bcrypt from "bcrypt";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import JWT_SECRET from '../Config/authConfig.js'

export const userRegistration = async (req, res) => {
    try {
        const { fullName, email, username, password, confirmPassword, gender } = req.body;

        // Validate required fields
        if (!fullName || !email || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        if (!validator.isEmail(email)) {
            return res.status(403).json({ message: "Please enter a valid email address", success: false });
        }

        if (!validator.isLength(username, { min: 5, max: 20 })) {
            return res.status(403).json({ message: "Username must be between 5 and 20 characters long", success: false });
        }

        const isValidPassword = validator.matches(
            password,
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        );

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special characters",
                success: false,
            });
        }

        if (password !== confirmPassword) {
            return res.status(403).json({ message: "Password Do Not Match, Please Check the Password", success: false });
        }

        // Check if the username already exists
        const userNameExist = await userSchema.findOne({ username });
        if (userNameExist) {
            return res.status(400).json({ message: "Username already exists", success: false });
        }

        // Check if the email already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists. Please login.", success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Profile photo based on gender
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        // Create and save the user
        const user = new userSchema({
            fullName,
            username,
            email,
            password: hashedPassword,
            profilePhoto: gender === 'male' ? maleProfilePhoto : femaleProfilePhoto,
            gender,
        });
        await user.save();

        // Send the response
        return res.status(201).json({
            message: "User registered successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error during registration", error);
        return res.status(500).json({
            message: "An error occurred during registration. Please try again later.",
            success: false,
        });
    }
};



export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required.",success: false });
        }
        // Check if the user exists
        const user = await userSchema.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials. Please check your username and password.", success: false });
        }
        // Check if the password is correct
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials. Please check your email and password." });
        }
       
        
        // Create the JWT payload
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email
        };
        
        // Generate and send the JWT token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
        
        res.cookie("token", token,{
            httpOnly: true,
            // expires: new Date(Date.now() + 86400000), // 1 day
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1*24*60*60*1000
        })
        return  res.status(200).json({
             message: "Login successful.",
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });
        
    } catch (error) {
        console.error("Login error:", error.message);
         return res.status(500).json({
            message: "An error occurred during login. Please try again later.",
            success:false
        });
    }
}
export const logout = (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
  return  res.status(200).json({ message: "Logged out successfully." });   
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "An error occurred during logout. Please try again later." });
  }
}
export const getOtherUsers =async (req, res) => {
    
      try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "User is not authenticated." });
        }
         const loggedInUserId = req.user.userId 
          const getOtheruser = await userSchema.find({_id:{$ne:loggedInUserId}}).select("-password")
          
          return  res.status(200).json({
            message: "Users fetched successfully.",
            getOtheruser,
          })
      } catch (error) {
         console.log("get other student error:", error.message);
         return  res.status(500).json({ message: "An error occurred during fetching users. Please try again later." });
         
      }
}

