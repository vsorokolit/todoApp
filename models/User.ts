import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  login: string;
  password: string;
  taskList: {
    items: Array<{
      id: number;
      text: string;
      checked: boolean;
    }>;
    lastItemID: number;
  };
}

const userSchema: Schema<IUser> = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  taskList: {
    items: {
      type: [
        {
          id: { type: Number, required: true },
          text: { type: String, required: true },
          checked: { type: Boolean, required: true, default: false },
        },
      ],
      default: [
        { id: 1, text: "зробити щось одне", checked: false },
        { id: 2, text: "зробити щось друге", checked: false },
        { id: 3, text: "зробити щось третє", checked: false },
      ],
    },
    lastItemID: { type: Number, default: 3 },
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
