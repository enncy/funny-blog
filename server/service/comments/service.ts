import BaseService from "../index";
import {Document, Query} from "mongoose";
import User from "../user";
import Blog from "../blog";

const utils = require('../../utils')

class CommentsService extends  BaseService {

    initSchema(): void {
        this.schema.index({uid: 1});
        // this.schema.index({author: 1});
        this.schema.index({blog_uid: 1});
        this.schema.index({parent_uid: 1});
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

     model(author:string  , body : string  ,parent_uid:string ,blog_uid:string): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()
        let parent = undefined

        return new this.mongooseModel({
            author,body ,uid , date ,parent_uid,blog_uid
        });
    }

    /**
     * 更新评论数据
     * @param uid   评论uid
     * @param like_num  评论的点赞
     */
    async  updateLikeNum(uid:string,like_num:number){
        return this.format(await this.mongooseModel.findOneAndUpdate({uid: uid}, {
            like_num,
        }))
    }


    /**
     * 获取文章下面的评论
     * @param blog_uid  文章 uid
     * @param skip
     * @param limit
     */
    findByBlog(blog_uid : string,skip:number,limit:number){
        return   this.mongooseModel.find({blog_uid}).skip(Math.round(skip)).limit(Math.round(limit));
    }

    /**
     * 获取父评论下面的评论
     * @param parent_uid  文章 uid
     * @param skip
     * @param limit
     */
    findByParentUid(parent_uid: string,skip?:number,limit?:number){
        return   this.mongooseModel.find({parent_uid}).skip(Math.round(skip)).limit(Math.round(limit));
    }

    //获取用户的评论
    findByAuthor(author : string){
        return   this.mongooseModel.find({author})
    }

    /**
     * 获取评论下的回复
     * @param parent_uid    父评论
     * @param skip
     * @param limit
     */
    async findByReply(parent_uid: string,skip:number,limit:number){
        let comments = await this.mongooseModel.find({parent_uid})
        let result =  []
        while(comments.length){
            let comment:any = comments.pop()
            result.push(comment)
            let children:any =await this.mongooseModel.find({parent_uid:comment.uid})
            for (const child of children) {
                if(child.reply){
                    comments.push(child)
                }
            }

        }

        return result.splice(skip,limit)
    }


    removeByUid(uid,callback){
        return this.mongooseModel.remove({uid}, callback)
    }


    /**
     * 格式化数据
     * @param comment  文章数据
     */
    format(comment:Document){
        if(!comment)return null

        return comment
    }

}


export default  CommentsService




