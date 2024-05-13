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
import author, { AuthorInterface } from "../models/author";
import { AuthorInter } from "../interfaces/authorinterface";
import { AuthorService } from "../services/authorservice";
import { CustomeStatus } from "../error/customestatuscode";
import { UserValidation } from "../middlware/UserValidation";
const AuthorValidation = new UserValidation();

const user = new AdminToken();
const authorservice = new AuthorService();

@controller("/author")
export class Authorcontroller {
  constructor(@inject("AuthorService") private AuthorService: AuthorService) {}

  @httpPost(
    "/createauthor",
    user.verifyAdminToken,
    AuthorValidation.validateAuthor
  )
  async createauthors(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const data: AuthorInter = req.body;
      const authordata = await authorservice.createauthor(data);

      res.status(CustomeStatus.success).json(authordata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpGet("/getauthor", user.verifyAdminToken)
  async getauthors(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const data: any = req.query.pageno;
      const authordata = await authorservice.getauthor(data);
      res.status(CustomeStatus.success).json(authordata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpPut(
    "/updateauthor/:id",
    user.verifyAdminToken,
    AuthorValidation.validateAuthor
  )
  async updateauthors(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const id: any = req.params.id;
      const data: AuthorInter = req.body;
      const authordata = await authorservice.updateauthor(id, data);
      res.status(CustomeStatus.success).json(authordata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpDelete("/deleteauthor/:id", user.verifyAdminToken)
  async deleteauthors(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const id: any = req.params.id;
      const authordata = await authorservice.deleteauthor(id);
      res.status(CustomeStatus.success).json(authordata);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
}
