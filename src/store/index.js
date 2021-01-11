import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: undefined
    },

    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo  = userInfo
        },

    },
    actions: {
        setUserInfo (context,userInfo) {
            context.commit('setUserInfo',userInfo)
        }
    }
})