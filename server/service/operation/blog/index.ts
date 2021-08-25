

import { SchemaDefinition} from "mongoose";
import BlogOperationService from "./service";


const   commentsSchemaType : SchemaDefinition=  {
    uid:{type:String  ,unique: true},  //唯一索引
    user: String, //操作用户名
    blog_uid:{type:String  ,unique: true},  //操作的文章uid
    date: { type: Number, default:0 },    //时间
    like:{type:Boolean , default:false},    //点赞
    fav:{type:Boolean , default:false},     //收藏

}

class BlogOperation  extends  BlogOperationService{
    constructor( ) {
        super(commentsSchemaType,'blog_operations')
    }
}

export  default new BlogOperation()