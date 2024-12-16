import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  login: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
