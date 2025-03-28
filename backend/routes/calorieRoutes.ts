import * as express from 'express';
import Calorie from '../models/calorie';

const router = express.Router();

// Add a new calorie entry
router.post('/add', async (req, res) => {
  const { name, calories } = req.body;
  const newCalorie = new Calorie({ name, calories });
  await newCalorie.save();
  res.status(201).json(newCalorie);
});

// Get all calorie entries
router.get('/', async (req, res) => {
  const calories = await Calorie.find();
  res.status(200).json(calories);
});

export default router;
