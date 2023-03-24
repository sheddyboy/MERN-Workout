import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt, { VerifyErrors } from "jsonwebtoken";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "1d" });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.loginUser(email, password);

    // create a new token
    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.signupUser(email, password);

    // create a new token
    const token = createToken(user?._id);

    res.status(200).json({ email, token });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const verifyToken = (req: Request, res: Response) => {
  const token = req.body.token;
  jwt.verify(
    token,
    process.env.SECRET!,
    (err: VerifyErrors | null, decoded: any) => {
      if (err) return res.status(400).json(err);
      const { _id } = decoded;
      console.log("hi");
      userModel
        .findById(_id)
        .then((user) => {
          res.status(200).json({ user, token });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
  );
};

export { login, signup, verifyToken };
