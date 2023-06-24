import { Model, model, Schema } from "mongoose";
import { IUser } from "../../interfaces/user.model";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [Number],
});

userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

export default model<IUser>("User", userSchema);

// class UserSchema {
//   private static readonly schema: Schema = new Schema({
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   });

//   public static readonly model: Model<IUser & Document> = model<
//     IUser & Document
//   >("User", UserSchema.schema);
// }
// export default UserSchema.model;
