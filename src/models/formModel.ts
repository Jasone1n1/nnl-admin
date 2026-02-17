// lib/models/formModel.ts
import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  loanamount: { type: String, required: true },
  bank: { type: String, required: true },
  ipAddress: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Form || mongoose.model('Form', FormSchema,'applications');
