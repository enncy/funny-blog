

import { SchemaDefinition} from "mongoose";
import CommentsService from "./service";


const   commentsSchemaType : SchemaDefinition=  {
    uid:{type:String  ,unique: true},  //唯一索引
    author: String, //评论者
    author_avatar:{type:String  ,default: ''},
    body:   String, //内容
    blog_uid:String,    //回复的博客，如果不是回复博客，则此字段为空
    parent_uid:{type:String  ,default: ''},   //回复的 uid ， 如果是评论文章，那么此处为空
    parent:Object,              //回复的人的信息 ， 如果是评论文章，那么此处为空
    date: { type: Number, default:0 },    //时间
    like_num:{type:Number , default:0},    //点赞数量
    reply_num:{type:Number , default:0},    //回复数量

    reply:[Object]   //动态附加的字段

}

class Comments  extends  CommentsService{
    constructor( ) {
        super(commentsSchemaType,'comments')
    }
}

export  default new Comments()