

import { SchemaDefinition} from "mongoose";
import CommentsService from "./service";


const utils = require('../../utils')

const   commentsSchemaType : SchemaDefinition=  {
    uid:{type:String , default:utils.createUid(),unique: true},  //唯一索引
    author: String, //评论者
    user_uid:String,   //评论者的 uid
    blogs_uid: String,
    body:   String, //内容
    date: { type: Number, default: Date.now },    //时间
    fav_num:Number,  //点赞数量
    comments: [String],   //回复这个评论的 id
}

class Comments  extends  CommentsService{
    constructor( ) {
        super(commentsSchemaType,'comments')
    }
}

export  default new Comments()