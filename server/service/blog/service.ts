import BaseService from "../index";
import {Document, NativeError, Query} from "mongoose";
import User from "../user";
import Comments from "../comments";

const utils = require('../../utils')

class BlogService extends BaseService {

    initSchema(): void {
        this.schema.index({uid: 1});
        this.schema.index({author: 1});
        //保存后置钩子
        this.schema.post('save', function (error, doc, next) {
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
     * @param body  文章内容
     * @param tags  文章标签
     * @param publish 是否公开
     * @param original  是否原创
     * @param original_url  搬运地址
     * @param category  文章分类
     */
    model(author: string, title: string, body: string, tags: [], publish: boolean, original: boolean, original_url: string, category: []): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()

        return new this.mongooseModel({
            author, title, body, uid, date, original_url, original, publish, tags, category, author_info:{},
        });
    }


    async  findByUid(uid: String): Promise<Query<Document<any>, Document<any>>> {
        console.log("findByUid:",uid)
        let blog:any = await this.mongooseModel.findOne({uid});
        let author_info = await User.findByName(blog?.author, false)

        return this.format(blog,author_info)
    }

    //分页查找
    async findByPage(skip: number, limit: number) {
        let blogs = await this.mongooseModel.find({}).skip(skip).limit(limit)
        for (let i=0;i<blogs.length;i++) {
            blogs[i] =await this.format(blogs[i])
        }
        return blogs
    }

    //根据标题查找
    async findByTitle(title: string) {
        let blog: any = await this.mongooseModel.findOne({title})
        let author_info = await User.findByName(blog?.author, false)
        return this.format(blog, author_info)
    }

    //根据作者名查找
    async findByAuthor(author: string) {
        let author_info = await User.findByName(author, false)
        let blogs = await this.mongooseModel.find({author})
        for (let i=0;i<blogs.length;i++) {
            blogs[i] =await this.format(blogs[i],author_info)
        }
        return blogs
    }

    //根据名字查找，并且分页
    async findByAuthorAndPage(author: string, skip: number, limit: number) {
        let author_info = await User.findByName(author, false)
        let blogs = await this.mongooseModel.find({author}).skip(skip).limit(limit)
        for (let i=0;i<blogs.length;i++) {
            blogs[i] =await this.format(blogs[i],author_info)
        }
        return blogs
    }

    /**
     * 修改文章
     * @param uid   文章uid
     * @param title 标题
     * @param body  内容
     * @param tags  标签
     * @param publish    是否公开
     * @param original  是否原创
     * @param original_url  搬运地址
     * @param category  文章分类
     */
    async update(uid: string, title: string, body: string, tags: [], publish: boolean, original: boolean, original_url: string, category: []) {
        //findOneAndUpdate([conditions],[update],[options],[callback])

        return this.format(await this.mongooseModel.findOneAndUpdate({uid: uid}, {
            title,
            body,
            tags,
            publish,
            //是否原创
            original,
            //搬运地址
            original_url,
            category,
            update_date: Date.now(),
        }))
    }

    /**
     * 更新博客数据
     * @param uid   博客 uid
     * @param fav_num  收藏数量
     * @param like_num  喜欢数量
     * @param read_num  阅读数量
     */
    async  updateData(uid:string,fav_num:number,like_num:number,read_num:number){
        return this.format(await this.mongooseModel.findOneAndUpdate({uid: uid}, {
            fav_num,
            like_num,
            read_num,
            update_date: Date.now(),
        }))
    }

    /**
     * 获取文章总数
     * @param callback
     */
    getCount(callback?: (err: any, count: number) => void) {
        return this.mongooseModel.count(callback);
    }

    /**
     * 获取作者文章总数
     * @param author 作者名
     * @param callback
     */
    getCountByAuthor(author:string, callback?: (err: any, count: number) => void) {
        return this.mongooseModel.count({author}, callback);
    }


    //删除
    removeByUid(uid: string, callback: (err: NativeError) => void) {
        //findOneAndUpdate([conditions],[update],[options],[callback])
        return this.mongooseModel.remove({uid}, callback)
    }

    //为博客添加评论
    async setBlogComment(blog:Document,skip:number,limit:number){
        //@ts-ignore
        let comment:Document =await  Comments.findByBlog(blog.uid,skip,limit)
        // console.log("comment,",comment)
        //@ts-ignore
        for (const child of comment) {
            let child_comments =await Comments.findByReply(child.uid,0,10)
            child.set('reply',child_comments || [])
        }
        blog.set('comments', comment || [])
    }

    /**
     * 格式化数据
     * @param blog  文章数据
     * @param author_info    是否增加作者信息字段
     */
    async format(blog: Document, author_info?: Document) {
        if (!blog) return null
        await this.setBlogComment(blog,0,100)
        blog.set('author_info', author_info||{})
        return blog
    }


}

export default BlogService









