// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  profile: { type: String },  // URL of the profile picture
  role: { type: String, default: 'user' },
  permissions: { type: [String], default: ['read'] },
 
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;