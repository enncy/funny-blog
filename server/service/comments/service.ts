import Index from "../index";
import {Document} from "mongoose";

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

    model(author:String, user_uid: String , blog_uid: String , body : String   ): Document<any> {
        return new this.mongooseModel({
            author,user_uid,blog_uid,body
        });
    }

    findByUserUid(user_uid : String){
        return this.mongooseModel.findOne({user_uid})
    }

}


export default  CommentsService






