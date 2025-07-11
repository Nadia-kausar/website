import { Schema } from 'mongoose';
import { atlasDb } from '../db.js';

const userSchema = new Schema({
  name: String,
  email: String
});

export const UserAtlas = atlasDb.model('UserAtlas', userSchema);
