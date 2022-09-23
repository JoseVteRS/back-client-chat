import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as generateUUID } from 'uuid';

export type UserDocument = User & Document;

@Schema({
  _id: false,
})
export class User {
  @Prop({ type: String, default: generateUUID() })
  _id: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
