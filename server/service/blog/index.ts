import { SchemaDefinition} from "mongoose";
import BlogService from "./service";

const utils = require('../../utils')

const   blogsSchemaType : SchemaDefinition=  {
    uid:{type:String ,unique: true},  //唯一索引
    author: String, //作者名
    author_info:Object,  //作者信息
    title:  String, //标题
    body:   String, //内容
    tags:[String] , //文章标签
    public:{type:Boolean , default:true}, //是否公开
    original:{type:Boolean , default:true},     //是否为原创
    original_url:{type:String , default:''},  //搬运文章的地址
    category:[String],    //文章分类



    date: { type: Number, default: Date.now },    //时间
    fav_num:{type:Number , default:0},  //收藏数量
    like:{type:Number , default:0},    //点赞数据
    read_num:{type:Number ,default:0 } ,   //访问数量
    comments: [String],   //评论


}


class Blog  extends BlogService{
    constructor() {
        super(blogsSchemaType,'blogs')
    }
}

export  default new Blog()
