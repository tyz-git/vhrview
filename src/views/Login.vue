<template>
    <div>
<!--        ref为表单的名字(和根据id查找元素是一样的，但是ref是vue的特性，这么写也比较方便)-->
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submit">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: 'zhangsan',
                    password: '0000'
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
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
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