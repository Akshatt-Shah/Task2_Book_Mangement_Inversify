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
import { CustomeStatus } from "../error/customestatuscode";
import { UserValidation } from "../middlware/UserValidation";
const categoryvalidation = new UserValidation();
const user = new AdminToken();
const category = new Categoryservices();
@controller("/category")
export class CategoryController {
  constructor(
    @inject("Categoryservices")
    private Categoryservices: Categoryservices
  ) {}
  @httpPost(
    "/createcategory",
    user.verifyAdminToken,
    categoryvalidation.validateCategory
  )
  async createcategory(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const data = req.body;
      const categorydata = await category.createcategory(data);
      res.status(CustomeStatus.success).json(categorydata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpGet("/getcategory", user.verifyAdminToken)
  async getcategory(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const pageno = req.query.pageno;
      const categorydata = await category.getcategory(pageno);
      res.status(CustomeStatus.success).json(categorydata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpPut(
    "/updatecategory/:id",
    user.verifyAdminToken,
    categoryvalidation.validateCategory
  )
  async updatecategory(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const id = req.params.id;
      const data = req.body;
      const categorydata = await category.updatecategory(id, data);
      res.status(CustomeStatus.success).json(categorydata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpDelete("/deletecategory/:id", user.verifyAdminToken)
  async deletecategory(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const id = req.params.id;
      const categorydata = await category.deletecategory(id);
      res.status(CustomeStatus.success).json(categorydata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
}
