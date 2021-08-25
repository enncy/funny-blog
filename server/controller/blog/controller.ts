import Blog from "../../service/blog";


module.exports = {

    async getOneBlog(blog_uid:string){
        let blog:any = await Blog.findByUid(blog_uid)
    }



}
