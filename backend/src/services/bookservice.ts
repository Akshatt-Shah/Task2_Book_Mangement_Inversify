import Bookdetail, { BookrInterface } from "../models/books";
import { BookrInter } from "../interfaces/bookinterface";
import { BookError, BookrSuccess } from "../error/customeerror";
import { injectable } from "inversify";
import Books from "../models/bookescategory";
import Author from "../models/author";

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
  async searchbook(
    search?: any,
    pageno: any = 1,
    category?: any,
    author?: any,
    minprice?: any,
    maxprice?: any
  ): Promise<any> {
    try {
      // console.log(minprice);
      const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive
      let matchObject: any = {};
      const limit = 5;
      if (!pageno && pageno === 0) {
        pageno = 1;
      }
      let skip = (pageno - 1) * limit;
      if (skip === 0) {
        skip = 1;
      }
      if (category) {
        if (typeof category === "string") {
          matchObject["categoryInfo.name"] = category.toLowerCase();
        }
      }
      if (search) {
        matchObject = {
          $or: [
            { title: regex },
            { description: regex },
            { "authorInfo.name": regex },
            { "categoryInfo.name": regex },
          ],
        };
      }
      if (author) {
        if (typeof author === "string") {
          matchObject["authorInfo.name"] = {
            $regex: author,
            $options: "i",
          };
        }
      }
      if (minprice) {
        matchObject["price"] = { $gte: Number(minprice) };
      }

      if (maxprice) {
        matchObject["price"] = {
          ...matchObject["price"],
          $lte: Number(maxprice),
        };
      }
      console.log(matchObject);

      const data = await Bookdetail.aggregate([
        {
          $sort: {
            price: 1,
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "category",
            foreignField: "_id", // Assuming the "_id" field in the "Books" collection is used as the unique identifier
            as: "categoryInfo",
          },
        },
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id", // Assuming the "_id" field in the "Author" collection is used as the unique identifier
            as: "authorInfo",
          },
        },
        {
          // $match: {
          //   $or: [
          //     { title: regex },
          //     { description: regex },
          //     { "authorInfo.name": regex },
          //     { "categoryInfo.name": regex },
          //   ],
          // },
          $match: matchObject,
        },
        {
          $skip: skip - 1,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            title: 1,
            description: 1,
            category: { $arrayElemAt: ["$categoryInfo.name", 0] },
            author: { $arrayElemAt: ["$authorInfo.name", 0] },
            price: 1,
          },
        },
      ]);

      // console.log(data.categoryInfo);
      return data;
    } catch (error) {
      console.error(BookError.SearchError, error);
      throw error;
    }
    // try {
    //   const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive
    //   const books = await Bookdetail.find({
    //     $or: [{ title: regex }, { description: regex }],
    //   });

    //   return books;
    // } catch (error) {
    //   console.error(BookError.SearchError, error);
    //   throw error;
    // }
  }
  async dynamicsearchbook(search: any): Promise<any> {
    try {
      const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive
      const data = await Bookdetail.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "category",
            foreignField: "_id", // Assuming the "_id" field in the "Books" collection is used as the unique identifier
            as: "categoryInfo",
          },
        },
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id", // Assuming the "_id" field in the "Author" collection is used as the unique identifier
            as: "authorInfo",
          },
        },
        {
          $match: {
            $or: [
              "title",
              "description",
              "categoryInfo.name",
              "authorInfo.name",
            ].map((ele) => {
              return { [ele]: { $regex: search, $options: "i" } };
            }),
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            category: { $arrayElemAt: ["$categoryInfo.name", 0] },
            author: { $arrayElemAt: ["$authorInfo.name", 0] },
            price: 1,
          },
        },
      ]);

      // console.log(data.categoryInfo);
      return data;
    } catch (error) {
      console.error(BookError.SearchError, error);
      throw error;
    }
    // try {
    //   const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive
    //   const books = await Bookdetail.find({
    //     $or: [{ title: regex }, { description: regex }],
    //   });

    //   return books;
    // } catch (error) {
    //   console.error(BookError.SearchError, error);
    //   throw error;
    // }
  }
}
