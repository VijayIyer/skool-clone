import { Schema, model, Document } from 'mongoose';

export interface User {
  firstname: string;
  lastname: string;
  email: string; 
  password: string;
}

export interface UserDocument extends User, Document {}

const UserSchema = new Schema<User>(
  {
    firstname: {
      type: String,
      required: [true, 'Please provide a first name for this user']
    },
    lastname: {
      type: String,  
      required: [true, 'Please provide a last name for this user']
    },
    email: {
      type: String,
      required: [true, 'Please provide a email for this user'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password for this user']
    }
  },
  { 
    timestamps: true 
  }
);

const User = model<UserDocument>('User', UserSchema);

export default User;