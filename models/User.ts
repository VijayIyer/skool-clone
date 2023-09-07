import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
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
    required: [true, 'Please provide an email for this user'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for this user']
  }
});

// Before saving the user, hash the password
// Before saving the user, hash the password
UserSchema.pre('save', function(next) {
    const user = this;
  
    // Ensure that password is a string before proceeding
    if (typeof user.password !== 'string') return next(new Error('Password must be a string'));
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) return next(hashErr);
  
        // Override the plaintext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
  

// Add a method to compare passwords
UserSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = mongoose.model('User', UserSchema);

export default User;
