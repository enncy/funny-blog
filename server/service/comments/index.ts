

import { SchemaDefinition} from "mongoose";
import Service from "../service";


const utils = require('../../utils')

const   commentsSchemaType : SchemaDefinition=  {
    uid:{type:String , default:utils.createUid()},  //唯一索引
    user_id:Number,   //评论的人
    body:   String, //内容
    date: { type: Number, default: Date.now },    //时间
    fav_num:Number,  //点赞数量
    comments: [String],   //回复这个评论的 id
}

class CommentService  extends  Service{
    constructor( ) {
        super(commentsSchemaType,'comments')
    }
}

export  default new CommentService()