import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide a first name for this user'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name for this user'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a email for this user'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password for this user'],
    },
  },
  {
    timestamps: true, // this will add createdAt and updatedAt timestamps
    // virtuals: {
    //   fullName: {
    //     get() {
    //       return this.firstName + ' ' + this.lastName;
    //     }
    //   }
    // }
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
