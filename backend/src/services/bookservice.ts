import Bookdetail, { BookrInterface } from "../models/books";
import { BookrInter } from "../interfaces/bookinterface";
import { BookError, BookrSuccess } from "../error/customeerror";
import { injectable } from "inversify";

@injectable()
export class BookService {
  async createbook(data: BookrInter): Promise<any> {
    const authordata = await Bookdetail.create(data);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: BookError.createBookError, status: false };
    }
  }
  async updatebook(id: any, data: BookrInter): Promise<any> {
    const authordata = await Bookdetail.findByIdAndUpdate(id, data);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: BookError.updateBookError, status: false };
    }
  }
  async getbooks(pageno: any): Promise<any> {
    const record = 5;
    const skip = (pageno - 1) * record;
    const authordata: object = await Bookdetail.find().skip(skip).limit(record);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: BookError.deleteBookError, status: false };
    }
  }
  async deletebook(id: any): Promise<any> {
    const authordata: object | null = await Bookdetail.findByIdAndDelete(id);
    if (authordata) {
      return { Author: authordata, status: true };
    } else {
      return { message: BookError.deleteBookError, status: false };
    }
  }
  async searchbook(search: any): Promise<any> {
    try {
      const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive
      const books = await Bookdetail.find({
        $or: [{ title: regex }, { description: regex }],
      });

      return books;
    } catch (error) {
      console.error(BookError.SearchError, error);
      throw error;
    }
  }
}
