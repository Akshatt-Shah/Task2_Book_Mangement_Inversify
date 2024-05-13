import {
  userSchema,
  categorySchema,
  authorSchema,
  bookSchema,
} from "../Validation/UserValidationSchema";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import * as Yup from "yup";

@injectable()
export class UserValidation {
  async validateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await userSchema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async validateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await categorySchema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async validateAuthor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await authorSchema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async validateBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await bookSchema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
