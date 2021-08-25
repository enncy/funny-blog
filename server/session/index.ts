



const formatUtils = require('../utils/format')



module.exports = {

    /**
     * 操作是否需要用户权限，需要则验证用户
     * @param match_path       匹配的路由
     * @param req
     * @param res
     * @param next
     * @param diyValid {    自定义验证方法
     *          pass:boolean    是否通过
     *          ,errMsg:string  未通过消息
     *          }
     */
    valid(match_path,req,res,next,diyValid){
        if(req.url.match(match_path)){
            if(this.getUser(req)){
                if(diyValid){
                    let valid = diyValid()
                    if(valid.pass){
                        next()
                    }else{
                        res.send(formatUtils.formatError(valid.errMsg))
                    }
                }else{
                    next()
                }
            }else{
                res.send(formatUtils.formatError("未登录"))
            }
        }else{
            next()
        }
    },
    hasUser(req){
        return !!this.getUser(req)
    },

    /**
     *  保存用户数据
     * @param req   请求
     * @param user  用户信息
     */
    setUser(req,user){
        req.session.user  = user
    },

    /**
     * 获取用户数据
     * @param req   请求
     */
    getUser(req){
        return  req?.session?.user
    },

    /**
     * 设置邮箱验证码
     * @param req   请求
     * @param info  信息
     */
    setEmail(req,info){

        req.session.emailInfo = {
            email:info.email,
            code:info.code
        }
    },

    /**
     * 获取邮箱验证码
     * @param req   请求
     */
    getEmail(req){
        return  req?.session?.emailInfo
    }




}













