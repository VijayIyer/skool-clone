import mongoose from "mongoose";
import next from "next/types";

function capitalize(name: string) {
  if (typeof name !== "string") name = "";
  return name.charAt(0).toUpperCase() + name.substring(1);
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name for this user"],
      set: capitalize,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name for this user"],
      set: capitalize,
    },
    email: {
      type: String,
      required: [true, "Please provide a email for this user"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password for this user"],
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  {
    timestamps: true, // this will add createdAt and updatedAt timestamps
    virtuals: {
      fullName: {
        get() {
          return this.firstName + " " + this.lastName;
        },
      },
    },
  }
);
UserSchema.pre("findOneAndUpdate", function (next) {
  try {
    const schema = this.getUpdate();
    console.log(`updating passwordChangedAt field - ${JSON.stringify(schema)}`);
    if (!schema) return next();

    if (Object.hasOwn(schema, "password")) {
      schema.passwordChangedAt = schema.$set.updatedAt;
      return next();
    }
    console.log(`setting passwordChangedAt`);
    return next();
  } catch (err) {
    console.error(err);
    return next();
  }
});
export default mongoose.models.User || mongoose.model("User", UserSchema);
