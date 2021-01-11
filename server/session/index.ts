






module.exports = {

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
        return  req.session.user
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
        return  req.session.emailInfo
    }




}













