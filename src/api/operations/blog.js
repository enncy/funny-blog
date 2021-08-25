const request = require('@/utils/request.js')
const blogOperationsURL = '/api/operations/blog'


module.exports = {

    like(like,blog_uid){
        return request({
            method:'post',
            url:blogOperationsURL+'/like',
            data:{
                like,blog_uid
            }
        })
    },

    fav(fav,blog_uid){
        return request({
            method:'post',
            url:blogOperationsURL+'/fav',
            data:{
                fav,blog_uid
            }
        })
    }

}