// backend/models/Calorie.ts
import mongoose from 'mongoose';

const calorieSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  date: { type: Date, default: Date.now },
});

const Calorie = mongoose.model('Calorie', calorieSchema);

export default Calorie;
