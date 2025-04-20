// backend/models/User.ts

import mongoose from 'mongoose';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
