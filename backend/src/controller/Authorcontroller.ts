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
const user = new AdminToken();
const authorservice = new AuthorService();

@controller("/author")
export class Authorcontroller {
  constructor(@inject("AuthorService") private AuthorService: AuthorService) {}

  @httpPost("/createauthor", user.verifyAdminToken)
  async createauthors(req: Request, res: Response) {
    const data: AuthorInter = req.body;
    const authordata = await authorservice.createauthor(data);

    res.json(data);
  }
  @httpGet("/getauthor", user.verifyAdminToken)
  async getauthors(req: Request, res: Response) {
    const data: any = req.query.pageno;
    const authordata = await authorservice.getauthor(data);
    res.json(authordata);
  }
  @httpPut("/updateauthor/:id", user.verifyAdminToken)
  async updateauthors(req: Request, res: Response) {
    const id: any = req.params.id;
    const data: AuthorInter = req.body;
    const authordata = await authorservice.updateauthor(id, data);
    res.json(authordata);
  }
  @httpDelete("/deleteauthor/:id", user.verifyAdminToken)
  async deleteauthors(req: Request, res: Response) {
    const id: any = req.params.id;
    const authordata = await authorservice.deleteauthor(id);
    res.json(authordata);
  }
}
