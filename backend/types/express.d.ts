// backend/types/express.d.ts

import { User } from '../models/User';  // Import your User type if you have it

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Add the `user` property to the `Request` interface
    }
  }
}
