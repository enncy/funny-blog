import BaseService from "../../index";
import {Document} from "mongoose";
const utils = require('../../../utils')


class BlogOperationService extends  BaseService {

    initSchema(): void {
        this.schema.index({uid: 1});
        this.schema.index({user: 1,blog_uid:1});
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

    model(user:string, like: boolean,fav:boolean): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()
        return new this.mongooseModel({
            uid,user, like ,fav, date
        });
    }


    findOne(user:string,blog_uid:string){
        return this.mongooseModel.findOne({user, blog_uid});
    }

    /**
     * 更新
     * @param user  用户
     * @param like  是否点赞
     */
    async updateLike(user:string, like: boolean){
        return  this.mongooseModel.findOneAndUpdate({user: user}, {
            like
        })
    }
    /**
     * 更新
     * @param user  用户
     * @param fav  是否收藏
     */
    async updateFav(user:string,fav:boolean){
        return  this.mongooseModel.findOneAndUpdate({user: user}, {
            fav
        })
    }


    format(data: any) {
    }

}

export  default  BlogOperationService