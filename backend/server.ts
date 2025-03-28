// backend/server.ts
import * as express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import calorieRoutes from './routes/calorieRoutes';

dotenv.config(); // Ensure .env is loaded

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // Use the correct env variable name
if (!mongoURI) {
  console.error("Mongo URI is not defined in .env");
} else {
  mongoose.connect(mongoURI, {})
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
    });
}

app.get('/', (req, res) => {
  res.send('Welcome to the Calorie Tracker API');
});

app.use(express.json());
app.use('/api/calories', calorieRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
