import Service from "../service";



interface UserService extends  Service {

    findByName();
    findByEmail();
    findByDate();
    findByBlogId();

}


export  default  UserService






