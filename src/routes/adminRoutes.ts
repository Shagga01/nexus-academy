import express from 'express';
const router = express.Router();

// Example route - replace with real logic
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes working!' });
});

export default router;