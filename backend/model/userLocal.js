import { Schema } from 'mongoose';
import { localDb } from '../db.js';

const userSchema = new Schema({
  name: String,
  email: String
});

export const UserLocal = localDb.model('UserLocal', userSchema);
