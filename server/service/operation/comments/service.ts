import BaseService from "../../index";
import {Document} from "mongoose";
const utils = require('../../../utils')


class CommentsOperationService extends  BaseService {

    initSchema(): void {
        this.schema.index({uid: 1});
        this.schema.index({user: 1,comments_uid:1});
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


    model(user:string, like: boolean): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()
        return new this.mongooseModel({
            uid,user, like, date
        });
    }

    findOne(user:string,comments_uid:string){
        return this.mongooseModel.findOne({user,comments_uid})
    }

    /**
     * 更新
     * @param user  用户
     * @param like  是否点赞
     */
    async updateLike(user:string, like: boolean){
        return this.mongooseModel.findOneAndUpdate({user: user}, {
            like
        })
    }



    format(data: any) {
    }

}

export  default  CommentsOperationService