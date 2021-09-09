import mongoose from 'mongoose';
require('dotenv').config()

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  encryptedPassword: { type: String, required: true }
},
  { collection: 'users' }
)

const UserSchema = mongoose.model('user', userSchema);

module.exports = UserSchema;