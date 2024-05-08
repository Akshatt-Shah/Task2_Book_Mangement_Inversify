import { Container } from "inversify";
import { UserServices } from "../services/UserServices";
import { Usercontroller } from "../controller/Usercontroller";
import { AuthorService } from "../services/authorservice";
import { Authorcontroller } from "../controller/Authorcontroller";
import { Categoryservices } from "../services/categoryservice";
import { CategoryController } from "../controller/Categorycontroller";
import { BookService } from "../services/bookservice";
import { Bookcontroller } from "../controller/Bookcontroller";

const container = new Container();
container.bind<UserServices>("UserServices").to(UserServices);
container.bind<Usercontroller>("Usercontroller").to(Usercontroller);
container.bind<AuthorService>("AuthorService").to(AuthorService);
container.bind<Authorcontroller>("Authorcontroller").to(Authorcontroller);
container.bind<Categoryservices>("Categoryservices").to(Categoryservices);
container.bind<CategoryController>("CategoryController").to(CategoryController);
container.bind<BookService>("BookService").to(BookService);
container.bind<Bookcontroller>("Bookcontroller").to(Bookcontroller);


export default container;
