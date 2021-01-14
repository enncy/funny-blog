


const request  = require('@/utils/request.js')


const blogURL = '/api/blog'

module.exports = {

    /**
     * 分页获取文章
     * @param skip
     * @param limit
     * @return {*}
     */
    getByPage(skip,limit){
        return request({
            method:'get',
            url: blogURL+`/get/some/${skip}/${limit}`,
        })
    },

    /**
     * 获取用户文章并且分页
     * @param author
     * @param skip
     * @param limit
     */
    getByAuthorAndPage(author,skip,limit){
        return request({
            method:'get',
            url: blogURL+`/get/name/${author}/${skip}/${limit}`,
        })
    },

    /**
     * 通过 uid 查询文章
     * @param uid
     * @return {*}
     */
    getByUid(uid){
        return request({
            method:'get',
            url: blogURL+`/get/one/${uid}`,
        })
    },

    /**
     * 创建文章
     * @param blog  文章信息
     * @return {*}
     */
    craete(blog){
        return request({
            method:'post',
            url:blogURL+'/create',
            data:blog
        })
    },

    /**
     * 删除文章
     * @param uid      文章uid
     * @return {*}
     */
    remove(uid){
        return request({
            method:'post',
            url:blogURL+'/remove',
            data:{
                uid,
            }
        })
    },

    /**
     * 修改文章
     * @param blog
     * @return {*}
     */
    update(blog){
        return request({
            method:'post',
            url:blogURL+'/update',
            data:blog
        })
    },



}





