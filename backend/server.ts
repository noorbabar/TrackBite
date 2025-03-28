// backend/server.ts
import * as express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cors from 'cors';  
import calorieRoutes from './routes/calorieRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// MongoDB Connection
const mongoURI = process.env.MONGO_URI; 
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
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
