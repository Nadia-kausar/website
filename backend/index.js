import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Import routes
import userRoute from './routes/userroute.js';
import orderRoute from './routes/order.routes.js';
import adminRoute from './routes/admin.route.js';
import productRoute from './routes/productroute.js';
import reviewRoute from './routes/review.routes.js';

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// API Routes
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);
app.use('/product', productRoute);
app.use('/review', reviewRoute);

// Root route
app.get('/', (req, res) => {
  res.send('📘 BookStore API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
