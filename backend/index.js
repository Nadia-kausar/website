import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// ✅ Import routes
import userRoute from './routes/userroute.js';
import orderRoute from './routes/order.routes.js';
import adminRoute from './routes/admin.route.js';
import productRoute from './routes/productroute.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://admin:admin123@cluster0.l87bu23.mongodb.net/BookStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB Atlas connection error:', err.message));

// ✅ Routes
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);
app.use('/product', productRoute);

// ✅ Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
