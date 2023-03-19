import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export interface IUser extends Document {
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  signupUser(email: string, password: string): Promise<IUser>;
  loginUser(email: string, password: string): Promise<IUser>;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signupUser = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// static login method
userSchema.statics.loginUser = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }
  return user;
};

// export default <any>model("User", userSchema);

const userModel = model<IUser, IUserModel>("User", userSchema);

export default userModel;
