import { SchemaDefinition} from "mongoose";
import UserService from "./service";

const utils = require('../../utils')

const   userSchemaType : SchemaDefinition=  {
    uid:{type:String , default:utils.createUid(),unique: true},  //唯一索引
    name:{ type: String, min: 2, max: 16 ,unique: true}, //名字
    pwd:{ type: String, min: 6, max: 20 },  //密码
    email:String,   //邮箱
    avatar:String,    //头像地址
    date:{ type: Number, default: Date.now },  //创建时间
    blogs_uid:[String],  //自己所属的博客文章id
    favorites_uid:[String],    //自己的喜欢博客文章id
}



class User  extends  UserService{
    constructor() {
        super(userSchemaType,'users')
    }

}


export  default  new User()