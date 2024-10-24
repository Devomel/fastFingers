import { Types } from 'mongoose';

export default class UserDto {
  email: string;
  id: Types.ObjectId;
  isActivated: boolean;

  constructor(model: { email: string; _id: Types.ObjectId; isActivated: boolean }) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
} 