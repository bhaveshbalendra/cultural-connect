import mongoose from "mongoose";

interface IProfile extends Document {
  username?: string;
  email: string;
  createdBy: mongoose.Types.ObjectId;
}

export { IProfile };
