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
const verifytoken = new AdminToken();
const user = new UserServices();
@controller("/users")
export class Usercontroller {
  constructor(@inject("UserServices") private UserService: UserServices) {}

  @httpPost("/createusers", verifytoken.verifyAdminToken)
  async createllUsers(req: Request, res: Response): Promise<any> {
    let userdata: UserInter = req.body;
    userdata.password = await bcrypt.hash(userdata.password, 10);
    console.log(userdata.password);
    const data = await user.createuser(userdata);
    return { data };
  }
  @httpPut("/updateusers/:id", verifytoken.verifyAdminToken)
  async updateusers(req: Request, res: Response): Promise<any> {
    const id: any = req.params.id;
    let userdata: UserInter = req.body;
    userdata.password = await bcrypt.hash(userdata.password, 10);
    console.log(userdata.password);
    const data = await user.updateuser(id, userdata);
    return { data };
  }
  @httpGet("/getusers", verifytoken.verifyAdminToken)
  async getallUsers(req: Request, res: Response): Promise<any> {
    const data = await user.getalluser();
    return { data };
  }
  @httpDelete("/deleteusers/:id", verifytoken.verifyAdminToken)
  async deleteUsers(req: Request, res: Response): Promise<any> {
    const id: any = req.params.id;
    const data = await user.deleteuser(id);
    return { data };
  }
  @httpPost("/loginusers")
  async loginUsers(req: Request, res: Response): Promise<any> {
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
      res.json({
        message: LoginSuccess.loginSuccess,
        status: true,
        token: AdminToken,
      });
    } else {
      res.json({
        message: LoginError.LoginFailed,
        status: false,
      });
    }
  }
  @httpPost("/logoutusers")
  async logoutuser(req: Request, res: Response) {
    try {
      const token = Object.keys(req.cookies);
      if (token.length > 0) {
        token.forEach((cookie) => {
          res.clearCookie(cookie);
        });

        res.status(400).json({ message: "Logout Successful", status: true });
      } else {
        return res
          .status(400)
          .json({ message: "User Already Logout", status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: LoginError.LoginFailed });
    }
  }
}
