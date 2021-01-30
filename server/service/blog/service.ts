import Index from "../index";
import {Document, NativeError, Query} from "mongoose";
import User from "../user";

const utils = require('../../utils')

class BlogService extends Index {

    initSchema(): void {
        this.schema.index({uid: 1});
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
        let blog:any = await this.mongooseModel.findOne({uid});
        let author_info = await User.findByName(blog.author, false)
        return this.format(blog,author_info)
    }

    //分页查找
    async findByPage(skip: number, limit: number) {
        let blogs = await this.mongooseModel.find({}).skip(skip).limit(limit)
        blogs = blogs.map(blog => this.format(blog))
        return blogs
    }

    //根据标题查找
    async findByTitle(title: string) {
        let blog: any = await this.mongooseModel.findOne({title})
        let author_info = await User.findByName(blog.author, false)
        return this.format(blog, author_info)
    }

    //根据作者名查找
    async findByAuthor(author: string) {
        let author_info = await User.findByName(author, false)
        let blogs = await this.mongooseModel.find({author})
        blogs = blogs.map(blog => this.format(blog, author_info))
        return blogs
    }

    //根据名字查找，并且分页
    async findByAuthorAndPage(author: string, skip: number, limit: number) {
        let author_info = await User.findByName(author, false)
        let blogs = await this.mongooseModel.find({author}).skip(skip).limit(limit)
        blogs = blogs.map(blog => this.format(blog, author_info))
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
    getCountByAuthor(author, callback?: (err: any, count: number) => void) {
        return this.mongooseModel.count({author}, callback);
    }


    //删除
    removeByUid(uid: string, callback: (err: NativeError) => void) {
        //findOneAndUpdate([conditions],[update],[options],[callback])
        return this.mongooseModel.remove({uid}, callback)
    }


    /**
     * 格式化数据
     * @param blog  文章数据
     * @param author_info    是否增加作者信息字段
     */
    format(blog: Document, author_info?: Document) {
        if (!blog) return null
        blog.set('author_info', author_info||{})
        return blog
    }


}

export default BlogService









