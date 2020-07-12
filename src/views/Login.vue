<template>
    <div>
<!--        ref为表单的名字(和根据id查找元素是一样的，但是ref是vue的特性，这么写也比较方便)-->
        <el-form  v-loading="loading" :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">                                                                      <!-- 这里如果是普通input标签就不需要加native,因为这是饿了么UI所以需要加上native-->
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submit">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    // //导入方法   --把方法导进来，才能使用。可以选择这种用哪个方法酒导入哪个方法。也可以把方法放到vue对象中的prototype中(main.js)。然后直接在使用的地方用当前vue对象(this)调用即可
    // import {postKeyValueRequest} from "../../utils/api";

    export default {
        name: "Login",
        data() {
            return {
                //控制加载效果的变量
                loading: false,
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [ { required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [ { required: true, message: '请输入密码', trigger: 'blur' }]
                }
            }
        },
        methods: {
            submit (){
                // 表单校验通过后才执行后面的代码
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        // resp:服务端响应数据
                        this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                            this.loading = false;
                            if (resp){
                                //其他页面也同样需要登录后才可以访问，所以登录成功后需要保存用户信息，提供给其他页面
                                window.sessionStorage.setItem('user', JSON.stringify(resp.object));
                                /**
                                 * vue提供了两种方式实现页面跳转
                                 * 方式一(replace):浏览器中有回退键，退到上一次访问的页面。但是这种方式相当于替换了页面，所以这种方式实现页面跳转后回退键不可点击
                                 * 方式二(push):压栈的意思，跳转页面相当于把页面压入栈中。回退键可以点击，点击后当前的页面就出栈了，页面就又会展示上一次访问的页面了
                                 * $.xx:调用xx对象。例如:this.$router,代表通过当前vue对象获取router对象
                                 */
                                //这里获取一下用户没登录的情况下是否请求了其他接口
                                let to = this.$route.query.redirect;
                                //如果有就直接跳转，没有直接进home页
                                this.$router.replace((to || to != undefined)?to:'/home');
                            }else {
                                this.$message.error("登录失败,请检查您的用户名和密码");
                            }
                        })
                    } else {
                        this.$message.error('请完善选项');
                        return false;
                    }
            });
        }
    }
}
</script>

<style>
    .loginContainer {
        /*加个边框*/
        border-radius: 15px;
        /*让这个像卡片一样浮出来的感觉*/
        background-clip: padding-box;
        /*外边距*/
        margin: 180px auto;
        /*宽度*/
        width: 350px;
        /*设置内边距:上、右、下、左*/
        padding: 35px 35px 25px 35px;
        /*背景*/
        background: #fff;
        /*边框样式 solid:实线 */
        border: 1px solid #eaeaea;
        /*阴影   参数：水平位置、垂直位置、阴影大小、阴影颜色*/
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle {
        margin: 20px auto 30px auto;
        text-align: center;
        color: #505458;
    }
    .loginRemember {
        float: left;
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>