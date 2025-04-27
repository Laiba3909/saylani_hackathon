import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  designation: string;
}

const UserSchema = new Schema<IUser>({
  fullName:    { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  phone:       { type: String, required: true },
  address:     { type: String, required: true },
  designation: { type: String, required: true },
 
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
