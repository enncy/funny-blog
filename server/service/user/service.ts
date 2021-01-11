import Index from "../index";
import {Document, SchemaDefinition} from "mongoose";




class UserService extends  Index {

    initSchema(): void {

        this.schema.index({uid: 1});

        //保存后置钩子
        this.schema.post('save', function(error, doc, next)  {

            //重复的值出现
            if (error.name === 'MongoError' && error.code === 11000) {
                next(new Error('There was a duplicate key error'));
            } else {
                console.log(`user ${doc.name} was saved`);
                next();
            }
        });

    }

    model(name: String , pwd : String ,email : String ): Document<any> {
        return new this.mongooseModel({
            name,pwd,email
        });
    }


    findByName(name : String){
        return this.mongooseModel.findOne({name})
    }
    findByEmail(email : String){
        return this.mongooseModel.findOne({email})
    }

    async hasUser(uid:String){
        let user = await this.mongooseModel.findOne({uid});
        return !!user
    }

    /**
     * 格式化数据
     * @param user  用户数据
     */
    format(user){
        return {
            name:user.name,
            email:user.email,   //邮箱
            date:user.date,  //创建时间
            blogs_uid:user.blogs_uid,   //自己的博客
            favorites_uid:user.favorites_uid,    //自己的喜欢博客文章id
        }
    }


}


export  default  UserService






