import { SchemaDefinition} from "mongoose";
import Service from "../service";

const utils = require('../../utils')

const   userSchemaType : SchemaDefinition=  {
    uid:{type:String , default:utils.createUid()},  //唯一索引
    name:{ type: String, min: 2, max: 16 }, //名字
    pwd:{ type: String, min: 6, max: 20 },  //密码
    email:String,   //邮箱
    date:{ type: Number, default: Date.now },  //创建时间
    blogs_id:[String],  //自己所属的博客文章id
    favorites_id:[String],    //自己的喜欢博客文章id
}

class UserService  extends  Service{
    constructor() {

        super(userSchemaType,'users')
    }
}


export  default  new UserService()