import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    //state中的变量相当于java中的成员变量
    state: {
        routes : []
    },
    //mutations相当于java中成员变量的set方法。用来修改state中变量的值
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    },
    //mutations是直接修改state中的值，而actions是专门调用mutations中的方法
    actions: {

    }
})