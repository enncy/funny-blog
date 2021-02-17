

const request = require('@/utils/request.js')
const commentsURL = '/api/comments'

module.exports = {

    getByUid(uid){
        return request({
            method:'get',
            url:commentsURL + '/get/by/uid/'+uid,
        })
    },
    getByBlog(blog_uid,skip,limit){
        return request({
            method:'get',
            url:commentsURL + `/get/by/blog/${blog_uid}/${skip}/${limit}`,
        })
    },
    getByAuthor(author){
        return request({
            method:'get',
            url:commentsURL + '/get/by/name/'+author,
        })
    },
    /**
     * 对文章发表评论
     * @param blog_uid      文章uid
     * @param body  评论
     * @return {*}
     */
    create(blog_uid,body){
        return request({
            method:'post',
            url:commentsURL + '/create',
            data:{
                blog_uid,
                body
            }
        })
    },
    /**
     * 删除评论
     * @param uid   评论uid
     * @param blogUid   文章 uid
     * @return {*}
     */
    remove(blogUid,uid){
        return request({
            method:'post',
            url:commentsURL + '/remove',
            data:{
                uid,blogUid
            }
        })
    },


    reply(parent_uid,body){
        return request({
            method:'post',
            url:commentsURL + '/reply',
            data:{
                parent_uid,body
            }
        })
    }


}


