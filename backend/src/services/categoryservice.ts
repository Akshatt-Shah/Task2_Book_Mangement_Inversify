import { BookInter } from "../interfaces/bookcategoryinterface";
import Books, { BookCategoryInterface } from "../models/bookescategory";
import { injectable } from "inversify";
import {
  BookError,
  CategoryError,
  CategoryrSuccess,
} from "../error/customeerror";
import Bookdetail, { BookrInterface } from "../models/books";
import mongoose from "mongoose";
@injectable()
export class Categoryservices {
  async createcategory(data: BookInter) {
    const catdata: object = await Books.create(data);
    if (catdata) {
      return { Category: catdata, status: true };
    } else {
      return { message: CategoryError.createCategoryError, status: false };
    }
  }
  async getcategory(pageno: any) {
    const record = 5;
    const skip = (pageno - 1) * record;
    const catdata: object = await Books.find().skip(skip).limit(record);
    if (catdata) {
      return { Category: catdata, status: true };
    } else {
      return { message: CategoryError.getCategoryError, status: false };
    }
  }
  async updatecategory(id: any, data: BookInter) {
    const catdata: object | null = await Books.findByIdAndUpdate(id, data);
    if (catdata) {
      return { Category: catdata, status: true };
    } else {
      return { message: CategoryError.updateCategoryError, status: false };
    }
  }
  async deletecategory(id: any) {
    let session: mongoose.ClientSession | null = null;
    session = await mongoose.startSession();
    session.startTransaction();
    const data: BookInter | null = await Books.findById(id);
    console.log(data);
    if (data !== null) {
      await Bookdetail.deleteMany({ category: data._id });

      await Books.deleteMany({ _id: data._id });

      await session.commitTransaction();
      session.endSession();

      return { user: data, status: true };
    } else {
      return { message: CategoryError.deleteCategoryError, status: false };
    }
  }
}
