// backend/models/calorie.ts
import mongoose from 'mongoose';

const calorieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
});

const Calorie = mongoose.model('Calorie', calorieSchema);

export default Calorie;
