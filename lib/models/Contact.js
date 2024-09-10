import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email address'],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{10,15}$/, 'Invalid phone number'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;