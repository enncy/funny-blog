import Index from "../index";
import {Document} from "mongoose";
import User from "../user";

const utils = require('../../utils')

class CommentsService extends  Index {

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

    model(author  , body : string   ): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()
        return new this.mongooseModel({
            author,body ,uid , date
        });
    }


    /**
     * 格式化数据
     * @param comment  文章数据
     */
    format(comment){
        if(!comment)return null

        return comment
    }

}


export default  CommentsService




