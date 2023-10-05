import mongoose from "mongoose";

import { Schema } from "mongoose";
import next from "next/types";
const OtpSchema = new Schema(
  {
    otp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.OTP || mongoose.model("OTP", OtpSchema);
