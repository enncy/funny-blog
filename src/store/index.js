// import Vue from 'vue'
// import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //当前用户名
        userInfo: undefined,
        //本地博客缓存信息
        blogs: [],

    },

    getters:{

    },

    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo  = userInfo
        },
        addBlog(state, blogInfo){
            if(blogInfo.uid){
                //判断缓存中是否已经有信息，如果没有则添加，否则替换旧的信息
                if(state.blogs.filter(blog=>blog.uid===blogInfo.uid).length===0){
                    state.blogs.push()
                    state.blogs.push(blogInfo)
                }else{
                    //替换旧内容
                    state.blogs.map(blog=>{
                        if(blog.uid===blogInfo.uid){
                            blog = blogInfo
                        }
                        return blog
                    })
                }
            }

        },
        removeBlog(state, uid){
            state.blogs =  state.blogs.filter(blog=>blog.uid !== uid)
        },
        clearBlog(state){
            state.blogs = []
        }

    },
    actions: {
        setUserInfo (context,userInfo) {
            context.commit('setUserInfo',userInfo)
        },
        addBlog (context,blogIngo) {
            context.commit('addBlog',blogIngo)
        },
        removeBlog (context,uid) {
            context.commit('removeBlog',uid)
        },
        clearBlog (context) {
            context.commit('clearBlog')
        }
    }
})