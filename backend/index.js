import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // ✅ Import CORS package
import bookRoute from './routes/bookroute.js';
import userRoute from './routes/userroute.js';

const app = express();

app.use(cors()); // ✅ Use CORS middleware
app.use(express.json()); // Middleware to parse JSON data

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/BookStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Route setup
app.use("/book", bookRoute);
app.use("/user",userRoute);

// Start server
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
