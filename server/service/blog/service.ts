import Index from "../index";
import {Document} from "mongoose";
import User from "../user";



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

    model(title: String ,author : String, user_uid : String  , body: String , ...defintion): Document<any> {

        return new this.mongooseModel({
            title,author ,user_uid , body
        });
    }

    findByTitle(title:String){
        return this.mongooseModel.findOne({title})
    }
    findByAuthor(author :String){
        return this.mongooseModel.findOne({author})
    }
    findByUserId(user_uid : String){
        return this.mongooseModel.findOne({user_uid})
    }

}

export default  BlogService










