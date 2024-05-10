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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import { UserServices } from "../services/UserServices";
import { UserInter } from "../interfaces/userinterface";
import { AdminToken } from "../middlware/verifytokenMiddlware";
import { LoginError, LoginSuccess } from "../error/customeerror";
import { CustomeStatus } from "../error/customestatuscode";
const verifytoken = new AdminToken();
const user = new UserServices();
@controller("/users")
export class Usercontroller {
  constructor(@inject("UserServices") private UserService: UserServices) {}

  @httpPost("/createusers", verifytoken.verifyAdminToken)
  async createllUsers(req: Request, res: Response): Promise<any> {
    try {
      res.set("Content-Type", "application/json");
      let userdata: UserInter = req.body;
      userdata.password = await bcrypt.hash(userdata.password, 10);
      console.log(userdata.password);
      const data = await user.createuser(userdata);
      res.status(CustomeStatus.success).json(data);
    } catch (error: any) {
      res
        .status(CustomeStatus.BadRequest)
        .json({ message: error.message, status: false });
    }
  }
  @httpPut("/updateusers/:id", verifytoken.verifyAdminToken)
  async updateusers(req: Request, res: Response): Promise<any> {
    try {
      const id: any = req.params.id;
      let userdata: UserInter = req.body;
      userdata.password = await bcrypt.hash(userdata.password, 10);
      console.log(userdata.password);
      const data = await user.updateuser(id, userdata);
      res.status(CustomeStatus.success).json(data);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpGet("/getusers", verifytoken.verifyAdminToken)
  async getallUsers(req: Request, res: Response): Promise<any> {
    try {
      // console.log(first)
      // res.setHeader("Content-Type", "application/json");
      res.set("Content-Type", "application/json");
      const data = await user.getalluser();
      res.status(CustomeStatus.success).json(data);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpDelete("/deleteusers/:id", verifytoken.verifyAdminToken)
  async deleteUsers(req: Request, res: Response): Promise<any> {
    try {
      res.set("Content-Type", "application/json");
      const id: any = req.params.id;
      const data = await user.deleteuser(id);
      res.status(CustomeStatus.success).json(data);
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpPost("/loginusers")
  async loginUsers(req: Request, res: Response): Promise<any> {
    try {
      res.set("Content-Type", "application/json");
      let userdata: UserInter = req.body;
      const data = await user.loginuser(userdata);

      console.log(data);
      if (data) {
        const AdminToken = jwt.sign(
          { AdminToken: data.users[0]._id },
          "your-secret-key",
          {
            expiresIn: "12h",
          }
        );
        res.cookie("AdminToken", AdminToken);
        res.status(CustomeStatus.success).status(CustomeStatus.success).json({
          message: LoginSuccess.loginSuccess,

          token: AdminToken,
        });
      } else {
        res.status(CustomeStatus.BadRequest).json({
          message: LoginError.LoginFailed,
          data: data,
          status: false,
        });
      }
    } catch (error: any) {
      res.status(CustomeStatus.BadRequest).json(error.message);
    }
  }
  @httpPost("/logoutusers")
  async logoutuser(req: Request, res: Response) {
    try {
      res.set("Content-Type", "application/json");
      const token = Object.keys(req.cookies);
      if (token.length > 0) {
        token.forEach((cookie) => {
          res.clearCookie(cookie);
        });

        res
          .status(CustomeStatus.success)
          .json({ message: LoginSuccess.logoutsuccess, status: true });
      } else {
        return res
          .status(CustomeStatus.BadRequest)
          .json({ message: "User Already Logout", status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: LoginError.LoginFailed });
    }
  }
}
