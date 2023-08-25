import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provude a first name for this user']
  },
  lastname: {
    type: String,
    required: [true, 'Please provude a last name for this user']
  },
  email: {
    type: String,
    required: [true, 'Please provude a email for this user'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provude a password for this user']
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema)