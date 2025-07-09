import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// ✅ Importing routes
import userRoute from './routes/userroute.js';
import orderRoute from './routes/order.routes.js';
import adminRoute from './routes/admin.route.js';
import productRoute from './routes/productroute.js';

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ✅ API Routes
app.use('/user', userRoute);        // User auth & profile
app.use('/order', orderRoute);      // Customer order APIs
app.use('/admin', adminRoute);      // Admin-only features (orders, products)
app.use('/product', productRoute);  // Product listing & details

// ✅ Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
