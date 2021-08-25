import { SchemaDefinition} from "mongoose";
import CommentsOperationService from "./service";


const   commentsSchemaType : SchemaDefinition=  {
    uid:{type:String  ,unique: true},  //唯一索引
    user: String, //操作用户名
    comments_uid:{type:String  ,unique: true},  //操作的评论uid
    date: { type: Number, default:0 },    //时间
    like:{type:Boolean , default:false},    //点赞
}

class CommentsOperation  extends  CommentsOperationService{
    constructor( ) {
        super(commentsSchemaType,'comments_operations')
    }
}

export  default new CommentsOperation()