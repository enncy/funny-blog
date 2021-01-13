
import {Schema, Document, Model, Query , SchemaDefinition} from "mongoose";

const mongoose = require('mongoose');
/**
 * 服务类 ， 封装简单服务
 * @author  klskeleton
 * @date  2021/1/10 : 15:09
 */

abstract class Index {

    schema ?:Schema
    mongooseModel ?: Model<Document>

    constructor(UserSchemaType : SchemaDefinition , model_name :String) {
        this.schema = new Schema( UserSchemaType , {versionKey:false})
        //调用init ， 初始化信息，和中间件
        this.initSchema()
        this.mongooseModel =mongoose.model(model_name,this.schema)
    }
    abstract initSchema() : void

    abstract model(...definition):Document<any>

    getModel() : Model<Document>{
        return this.mongooseModel
    }

    getSchema() :Schema{
        return this.schema
    }

    //根据 uid 查找
    findByUid(uid:String) : Query<Document<any>, Document<any>> {
        return this.format(this.mongooseModel.findOne({uid}))
    }

    /**
     * 每次执行业务处理 findByxxx 都要经过数据处理
     * @param data
     */
    abstract  format(data:any)

}


export  default  Index






