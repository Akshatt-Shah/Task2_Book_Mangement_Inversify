import "reflect-metadata";
import {
  Controller,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { Categoryservices } from "../services/categoryservice";
import { AdminToken } from "../middlware/verifytokenMiddlware";
const user = new AdminToken();
const category = new Categoryservices();
@controller("/category")
export class CategoryController {
  constructor(
    @inject("Categoryservices")
    private Categoryservices: Categoryservices
  ) {}
  @httpPost("/createcategory", user.verifyAdminToken)
  async createcategory(req: Request, res: Response) {
    const data = req.body;
    const categorydata = await category.createcategory(data);
    res.status(200).json(categorydata);
  }
  @httpGet("/getcategory", user.verifyAdminToken)
  async getcategory(req: Request, res: Response) {
    const pageno = req.query.pageno;
    const categorydata = await category.getcategory(pageno);
    res.status(200).json(categorydata);
  }
  @httpPut("/updatecategory/:id", user.verifyAdminToken)
  async updatecategory(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    const categorydata = await category.updatecategory(id, data);
    res.status(200).json(categorydata);
  }
  @httpDelete("/deletecategory/:id", user.verifyAdminToken)
  async deletecategory(req: Request, res: Response) {
    const id = req.params.id;
    const categorydata = await category.deletecategory(id);
    res.status(200).json(categorydata);
  }
}
