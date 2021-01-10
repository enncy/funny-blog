import { SchemaDefinition} from "mongoose";
import Service from "../service";
const utils = require('../../utils')

const   blogsSchemaType : SchemaDefinition=  {
    uid:{type:String , default:utils.createUid()},  //唯一索引
    title:  String, //标题
    author: String, //作者
    body:   String, //内容
    date: { type: Number, default: Date.now },    //时间
    public:Boolean, //是否公开
    fav_num:Number,  //点赞数量
    comments: [String],   //评论
}

class BlogService  extends  Service{
    constructor() {
        super(blogsSchemaType,'blogs')
    }
}


export  default new BlogService()
