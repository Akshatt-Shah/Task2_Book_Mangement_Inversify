import "reflect-metadata";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { AdminToken } from "../middlware/verifytokenMiddlware";
import Bookdetail, { BookrInterface } from "../models/books";
import { BookrInter } from "../interfaces/bookinterface";
import { BookService } from "../services/bookservice";
const user = new AdminToken();
const bookService = new BookService();

@controller("/book")
export class Bookcontroller {
  constructor(@inject("BookService") private BookService: BookService) {}

  @httpPost("/createbook", user.verifyAdminToken)
  async createbook(req: Request, res: Response) {
    const data: BookrInter = req.body;
    const authordata = await bookService.createbook(data);

    res.json(authordata);
  }

  @httpGet("/getbook", user.verifyAdminToken)
  async getcategory(req: Request, res: Response) {
    const pageno = req.query.pageno;
    const categorydata = await bookService.getbooks(pageno);
    res.status(200).json(categorydata);
  }

  @httpPut("/updatebook/:id", user.verifyAdminToken)
  async updatecategory(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    const categorydata = await bookService.updatebook(id, data);
    res.status(200).json(categorydata);
  }

  @httpDelete("/deletebook/:id", user.verifyAdminToken)
  async deletebook(req: Request, res: Response) {
    const id = req.params.id;
    const categorydata = await bookService.deletebook(id);
    res.status(200).json(categorydata);
  }
  @httpGet("/searchbook", user.verifyAdminToken)
  async searchbook(req: Request, res: Response) {
    const search = req.query.search;
    const categorydata = await bookService.searchbook(search);
    res.status(200).json(categorydata);
  }
}
