

import { SchemaDefinition} from "mongoose";
import CommentsService from "./service";


const   commentsSchemaType : SchemaDefinition=  {
    uid:{type:String  ,unique: true},  //唯一索引
    author: Object, //评论者
    body:   String, //内容
    date: { type: Number, default:0 },    //时间
    fav_num:{type:Number , default:0},  //收藏数量
    like:{type:Number , default:0},    //点赞数据
    comments: [String],   //回复这个评论的 id
}

class Comments  extends  CommentsService{
    constructor( ) {
        super(commentsSchemaType,'comments')
    }
}

export  default new Comments()