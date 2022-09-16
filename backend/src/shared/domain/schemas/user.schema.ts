import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as generateUuid } from 'uuid';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  _id: false,
})
export class User {
  @Prop({ _id: false, type: String, default: generateUuid() })
  _id: string;

  @Prop({ type: String, required: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
