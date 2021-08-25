import BaseService from "../index";
import {Document, SchemaDefinition} from "mongoose";


const utils = require('../../utils')

class UserService extends  BaseService {

    initSchema(): void {
        this.schema.index({uid: 1});
        this.schema.index({name: 1});
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

    model(name: string , pwd : string ,email : string ): Document<any> {
        let uid = utils.createUid()
        let date = Date.now()
        return new this.mongooseModel({
            name,pwd,email , uid ,date
        });
    }


    /**
     * 修改公共信息
     * @param name  名字
     * @param avatar
     * @param profile
     */
    async updateCommon(name:string,avatar:string, profile:string){
        //findOneAndUpdate([conditions],[update],[options],[callback])
        return this.format(await this.mongooseModel.findOneAndUpdate({name},{
            avatar,
            profile,
        }))
    }

    /**
     * 通过名字获取用户
     * @param name  名字
     * @param show_pwd  是否返回密码字段
     */
    async findByName(name : string,show_pwd ?: boolean){
        return this.format(await this.mongooseModel.findOne({name}),show_pwd)
    }
    async findByEmail(email : string){
        return this.format(await this.mongooseModel.findOne({email}))
    }

    async hasUser(uid:string){
        let user = await this.mongooseModel.findOne({uid});
        return !!user
    }


    /**
     * 格式化数据
     * @param user  用户数据
     * @param show_pwd  是否返回密码字段
     */
    format(user:Document,show_pwd ?: boolean){
        if(!user)return null
        user.set('uid',undefined)
        user.set('email',undefined)
        if(!show_pwd)user.set('pwd',undefined)
        return user
    }


}


export  default  UserService






