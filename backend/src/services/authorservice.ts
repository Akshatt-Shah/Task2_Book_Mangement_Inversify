import author, { AuthorInterface } from "../models/author";
import { AuthorInter } from "../interfaces/authorinterface";
import { AuthorError, AuthorSuccess } from "../error/customeerror";
import Bookdetail, { BookrInterface } from "../models/books";
import { injectable } from "inversify";
import mongoose from "mongoose";
@injectable()
export class AuthorService {
  async createauthor(data: AuthorInter): Promise<any> {
    const authordata = await author.create(data);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: AuthorError.createAuthorError, status: false };
    }
  }

  async getauthor(pageno: any): Promise<any> {
    const record = 5;
    const skip = (pageno - 1) * record;
    const authordata: object = await author.find().skip(skip).limit(record);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: AuthorError.getAuthorError, status: false };
    }
  }

  async updateauthor(id: any, data: AuthorInter): Promise<any> {
    const authordata = await author.findByIdAndUpdate(id, data);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: AuthorError.updateAuthorError, status: false };
    }
  }
  async deleteauthor(id: any): Promise<any> {
    let session: mongoose.ClientSession | null = null;
    session = await mongoose.startSession();
    session.startTransaction();
    const data = await author.findById(id);
    if (data !== null) {
      await Bookdetail.deleteMany({ author: data._id });

      await author.deleteMany({ _id: data._id });

      await session.commitTransaction();
      session.endSession();

      return { message: AuthorSuccess.deleteAuthorSuccess, status: true };
    }
  }
}
