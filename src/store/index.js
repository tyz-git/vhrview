import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const now = new Date();
const store = new Vuex.Store({

    //state中的变量相当于java中的成员变量
    state: {
        routes : [],
        //第三方聊天 以下
        sessions:[{
            id:1,
            user:{
                name:'示例介绍',
                img:'../src/assets/images/2.png'
            },
            messages:[{
                content:'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                date:now
            },{
                content:'项目地址(原作者): https://github.com/coffcer/vue-chat',
                date:now
            },{
                content:'本项目地址(重构): https://github.com/is-liyiwei',
                date:now
            }]
        },{
            id:2,
            user:{
                name:'webpack',
                img:'../src/assets/images/3.jpg'
            },
            messages:[{
                content:'Hi，我是webpack哦',
                date:now
            }]
        }],
        currentSessionId:1,
        filterKey:''
    },
    //mutations相当于java中成员变量的set方法。用来修改state中变量的值
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        //第三方聊天 以下
        changeCurrentSessionId (state,id) {
            state.currentSessionId = id;
        },
        addMessage (state,msg) {
            state.sessions[state.currentSessionId-1].messages.push({
                content:msg,
                date: new Date(),
                self:true
            })
        },
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        }
    },
    //mutations是直接修改state中的值，而actions是专门调用mutations中的方法
    actions: {
        //第三方聊天
        initData (context) {
            context.commit('INIT_DATA')
        }
    }
})
//第三方聊天
store.watch(function (state) {
    return state.sessions
},function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;