import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  login: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
