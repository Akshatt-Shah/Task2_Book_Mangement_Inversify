import { injectable } from "inversify";
import "reflect-metadata";
import mongoose from "mongoose";
import { Model } from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Import your Mongoose model
import User, { UserInterface } from "../models/usermodel"; // Update the path as per your file structure
import { UserInter } from "../interfaces/userinterface";
import { LoginError } from "../error/customeerror";

@injectable()
export class UserServices {
  async getalluser(): Promise<any> {
    try {
      // Fetch all users from the MongoDB collection
      const users = await User.find({});

      // Return the fetched users
      return { users, status: true };
    } catch (error: any) {
      console.log(error);
      // If an error occurs, return an error message
      return {
        message: "An error occurred while fetching users",
        status: false,
      };
    }
  }
  async deleteuser(id: any): Promise<any> {
    try {
      // Fetch all users from the MongoDB collection
      const users = await User.findByIdAndDelete(id);

      // Return the fetched users
      return { users, status: true };
    } catch (error: any) {
      console.log(error);
      // If an error occurs, return an error message
      return {
        message: "An error occurred while Deleting users",
        status: false,
      };
    }
  }
  async loginuser(userdata: UserInter): Promise<any> {
    try {
      // Fetch all users from the MongoDB collection
      const users = await User.find({ name: userdata.name });
      console.log(users);
      if (users) {
        const pass = await bcrypt.compare(userdata.password, users[0].password);
        console.log(pass);
        if (pass) {
          return { users, status: true };
        } else {
          return { message: LoginError.PasswordError, status: false };
        }
      }

      // Return the fetched users
    } catch (error: any) {
      console.log(error);
      // If an error occurs, return an error message
      return {
        message: "An error occurred while fetching users",
        status: false,
      };
    }
  }
  async createuser(userdata: UserInter): Promise<any> {
    try {
      // Fetch all users from the MongoDB collection
      const users = await User.create(userdata);

      // Return the fetched users
      return { users, status: true };
    } catch (error: any) {
      console.log(error);
      // If an error occurs, return an error message
      return {
        message: "An error occurred while fetching users",
        status: false,
      };
    }
  }
  async updateuser(id: any, userdata: UserInter): Promise<any> {
    try {
      const users = await User.findByIdAndUpdate(id, userdata);

      // Return the fetched users
      return { users, status: true };
    } catch (error: any) {
      console.log(error);
      // If an error occurs, return an error message
      return {
        message: "An error occurred while fetching users",
        status: false,
      };
    }
  }
}
