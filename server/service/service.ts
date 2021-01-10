
import {Schema, Document, Model, Query , SchemaDefinition} from "mongoose";

const mongoose = require('mongoose');
/**
 * 服务类 ， 封装简单服务
 * @author  klskeleton
 * @date  2021/1/10 : 15:09
 */

class Service {
    definition:SchemaDefinition
    schema ?:Schema
    mongooseModel ?: Model<Document>

    constructor(UserSchemaType : SchemaDefinition , model_name :String) {

        if(!this.definition){
            this.schema = new Schema(UserSchemaType)
            this.definition = UserSchemaType
            this.mongooseModel =mongoose.model(model_name,this.schema)
            this.initSchema()
        }
    }
    initSchema(){
        this.schema.index({uid: 1});
    }

    model(definition:SchemaDefinition):Document{
        return  new this.mongooseModel(definition)
    }

    getModel() : Model<Document>{
        return this.mongooseModel
    }

    getSchema() :Schema{
        return this.schema
    }

    //根据 uid 查找
    findByUid(uid:String) : Query<Document<any>, Document<any>> {
        return this.mongooseModel.findOne({uid:this.definition.uid})
    }

}


export  default  Service






