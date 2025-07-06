import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

// ✅ SIGNUP FUNCTION
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Success
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      }
    });

  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
