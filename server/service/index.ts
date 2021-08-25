
import {Schema, Document, Model, Query , SchemaDefinition} from "mongoose";

const mongoose = require('mongoose');
/**
 * 基础服务类 ， 封装简单服务
 * @author  enncy
 * @date  2021/1/10 : 15:09
 */

abstract class BaseService {

    schema ?:Schema
    mongooseModel ?: Model<Document>

    constructor(UserSchemaType : SchemaDefinition , model_name :String) {
        this.schema = new Schema( UserSchemaType , {versionKey:false})
        //调用init ， 初始化信息，和中间件
        this.initSchema()
        this.mongooseModel =mongoose.model(model_name,this.schema)
    }
    abstract initSchema() : void

    //创建模型
    abstract model(...definition):Document<any>
    //新建数据
    // create(...definition):Promise<Document>{
    //     return new Promise((resolve,reject)=>{
    //         const obj = this.model(...definition)
    //         obj.save((err => {
    //             if(err)reject(err)
    //             else resolve(obj)
    //         }))
    //     })
    // }

    getModel() : Model<Document>{
        return this.mongooseModel
    }

    getSchema() :Schema{
        return this.schema
    }

    //根据 uid 查找
    async findByUid(uid:String) : Promise<Query<Document<any>, Document<any>>> {
        return this.format( await this.mongooseModel.findOne({uid}))
    }



    /**
     * 每次执行业务处理 findByxxx 都要经过数据处理
     * @param data
     */
    abstract  format(data:any)

}


export  default  BaseService






