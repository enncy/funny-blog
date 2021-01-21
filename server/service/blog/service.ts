import Index from "../index";
import {Document, NativeError} from "mongoose";
import User from "../user";

const utils = require('../../utils')

class BlogService extends  Index {

    initSchema(): void {
        this.schema.index({uid: 1});
        //保存后置钩子
        this.schema.post('save', function(error, doc, next)  {
            //重复的值出现
            if (error.name === 'MongoError' && error.code === 11000) {
                next(new Error('There was a duplicate key error'));
            } else {
                next();
            }
        });
    }

    /**
     * 创建 model
     * @param title 文章标题
     * @param author    作者名
     * @param author_info   作者信息
     * @param body  文章内容
     * @param tags  文章标签
     * @param publi 是否公开
     * @param original  是否原创
     * @param original_url  搬运地址
     * @param category  文章分类
     */
    model( author:string,author_info   ,  title:string,body:string, tags:[],publi:boolean,original:boolean,original_url:string,category:[]): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()

        return new this.mongooseModel({
          author, author_info , title , body ,uid , date,original_url,original,publi,tags,category
        });
    }

    //分页查找
    async findByPage(skip:number,limit:number){
        let blogs = await this.mongooseModel.find({}).skip(skip).limit(limit)
        blogs = blogs.map(blog=>this.format(blog))
        return   blogs
    }

    //根据标题查找
    async findByTitle(title:string){
        return this.format(await this.mongooseModel.findOne({title}))
    }

    //根据作者名查找
    async findByAuthor(author :string){
        let blogs = await this.mongooseModel.find({author})
        blogs = blogs.map(blog=>this.format(blog))
        return   blogs
    }

    //根据名字查找，并且分页
    async findByAuthorAndPage(author :string,skip:number,limit:number){
        let blogs = await this.mongooseModel.find({author}).skip(skip).limit(limit)
        blogs = blogs.map(blog=>this.format(blog))
        return   blogs
    }

    /**
     * 修改文章
     * @param uid   文章uid
     * @param title 标题
     * @param body  内容
     * @param tags  标签
     * @param publi    是否公开
     * @param original  是否原创
     * @param original_url  搬运地址
     * @param category  文章分类
     */
    async update(uid:string,title:string,body:string, tags:[],publi:boolean,original:boolean,original_url:string,category:[]){
        //findOneAndUpdate([conditions],[update],[options],[callback])
        return this.format(await this.mongooseModel.findOneAndUpdate({uid:uid},{
            title,
            body,
            tags,
            public:publi,
            //是否原创
            original,
            //搬运地址
            original_url,
            category,
        }))
    }

    /**
     * 获取文章总数
     * @param callback
     */
    getCount(callback?: (err: any, count: number) => void){
        return  this.mongooseModel.count(callback);
    }

    /**
     * 获取作者文章总数
     * @param author 作者名
     * @param callback
     */
    getCountByAuthor(author,callback?: (err: any, count: number) => void){
        return  this.mongooseModel.count({ author },callback);
    }



    removeByUid(uid:string,callback:(err: NativeError) => void){
        //findOneAndUpdate([conditions],[update],[options],[callback])
        return this.mongooseModel.remove({uid},callback)
    }


    /**
     * 格式化数据
     * @param blog  文章数据
     */
    format(blog:Document){
        if(!blog)return null

        return blog
    }


}

export default  BlogService









