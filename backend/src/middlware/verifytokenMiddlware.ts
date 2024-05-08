const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import user from "../models/usermodel";
import { LoginError } from "../error/customeerror";

export class AdminToken {
  async verifyAdminToken(req: Request, res: Response, next: any) {
    // Extract the token from the request headers
    try {
      // const tokennn = req.headers.authorization;
      const tokennn = req.cookies.AdminToken;
      console.log(tokennn);
      if (!tokennn) {
        return res.json({
          error: LoginError.loginError,
          status: false,
        });
      }

      const decoded = jwt.verify(
        tokennn,
        "your-secret-key",
        async (err: any, decoded: any) => {
          if (err) {
            console.error("JWT verification error:", err.message);
            return res.json({
              error: "Unauthorized: Invalid token",
              status: false,
            });
          } else {
            const data: any = await user.findById(decoded.AdminToken);
            console.log(data);
            if (data.type === "admin") {
              next();
            } else {
              return res.json({
                error: "Only Admin Can Access This Page",
                status: false,
              });
            }
          }

          // Store decoded user information in request object for further use
          // req.users = decoded;
          //  // Call the next middleware or route handler
        }
      );
    } catch (error: any) {
      return res.json({ message: error.message, status: false });
    }
  }
}
