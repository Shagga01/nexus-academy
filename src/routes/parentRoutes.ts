import express from 'express';
const router = express.Router();

// Example route - replace with real logic
router.get('/', (req, res) => {
  res.json({ message: 'Parent routes working!' });
});

export default router;