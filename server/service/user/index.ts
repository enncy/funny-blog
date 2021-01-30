import { SchemaDefinition} from "mongoose";
import UserService from "./service";



// @ts-ignore
const   userSchemaType : SchemaDefinition=  {

    //公开信息

    uid:{type:String  ,unique: true},  //唯一索引
    name:{ type: String, min: 2, max: 16 ,unique: true}, //名字
    avatar:{ type: String, default:'' },    //头像地址
    date:{type:Number , default : Date.now},  //创建时间
    profile:{type:String , default: ''},    //个人简介
    grade:{type:Number , default: 0},      //博客等级


    //数据量
    comments_num:{type:Number , default:0}, //获评数量
    fav_num:{ type: Number, default: 0 },  //被收藏次数
    blog_num:{ type: Number, default: 0 },  //文章数量
    like_num:{ type: Number, default: 0 },  //获赞次数
    read_num:{type:Number ,default:0 } ,   //访问数量
    fans_num :{type:Number , default:0},     //粉丝数量
    category:[String],  //博客分栏
    favorites_uid:[String],    //喜欢博客文章id
    fans :[String],     //粉丝列表

    // 私有信息
    pwd:{ type: String, min: 6, max: 20 },  //密码
    email:String,       //自己的邮箱
    top_blogs:[String],  //自己置顶的博客文章id
}



class User  extends  UserService{
    constructor() {
        super(userSchemaType,'users')
    }

}


export  default  new User()