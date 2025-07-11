import express from 'express';
import { UserLocal } from '../models/UserLocal.js';
import { UserAtlas } from '../models/UserAtlas.js';

const router = express.Router();

router.get('/test', async (req, res) => {
  try {
    const data = {
      name: 'DualDB User',
      email: 'dual@example.com'
    };

    // 👇 Save to Local MongoDB
    const localResult = await UserLocal.create(data);

    // 👇 Save to MongoDB Atlas
    const atlasResult = await UserAtlas.create(data);

    res.json({
      message: '✅ Saved to both databases',
      local: localResult,
      atlas: atlasResult
    });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
