import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  isActivated: boolean;
  activationLink?: string;
  progress: Map<string, { section: number, lesson: number }>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  progress: { type: Map }
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;