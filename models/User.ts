import mongoose from 'mongoose';

function capitalize(name: string) {
  if (typeof name !== 'string') name = '';
  return name.charAt(0).toUpperCase() + name.substring(1);
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide a first name for this user'],
      set: capitalize,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name for this user'],
      set: capitalize,
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
    virtuals: {
      fullName: {
        get() {
          return this.firstName + ' ' + this.lastName;
        },
      },
    },
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
