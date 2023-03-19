import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel, { IUser } from "../models/userModel";

// interface AuthenticatedRequest extends Request {
//   user: IUser | null;
// }
const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "Authorization token required",
    });
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET!);
    console.log(decoded);
    const { _id } = decoded;

    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
