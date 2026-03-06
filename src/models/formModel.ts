import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  // Personal Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Address
  city: { type: String, required: true },
  state: { type: String, required: true },

  // Loan Info
  loanamount: { type: String, required: true },

  // Personal Verification
  dob: { type: String }, // Date of Birth
  ssn: { type: String }, // Social Security Number

  // Bank Info
  bank: { type: String, required: true }, // bank name
  bankYears: { type: String }, // how long with bank
  accountNumber: { type: String },
  routingNumber: { type: String },

  // Tracking
  ipAddress: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

// Prevent model overwrite in Next.js
export default mongoose.models.Form ||
  mongoose.model("Form", FormSchema, "applications");