enum UserType {
  Admin = "admin",
  User = "user",
  Author = "author",
}

export interface UserInter {
  name: string;
  password: string;
  type?: UserType; // Using the defined enum
}
