import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { IsString, IsObject, IsDate } from "class-validator";
import * as bcrypt from "bcryptjs";

export class Location {
  @prop()
  lat: number;
  @prop()
  lng: number;
}

@pre<User>("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
})
export class User {
  @IsString()
  @prop({ required: true })
  public firstName: string;

  @IsString()
  @prop({ required: true })
  public lastName: string;

  @IsString()
  @prop({ required: true, unique: true, trim: true, lowercase: true })
  public email: string;

  @IsString()
  @prop({ minlength: 6, required: true })
  password: string;

  @IsDate()
  @prop({ required: true })
  public dateOfBirth: Date;

  @IsString()
  @prop()
  public imageUrl: string;

  @IsObject()
  @prop({ type: () => Location, required: true })
  public location: Location;
}

export const UserModel = getModelForClass(User);
