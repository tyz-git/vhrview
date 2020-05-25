<template>
    <div>
        <el-container>
            <!--页面顶部-->
            <el-header class="homeHeader">
                <div class="title">微管理</div>
                <!-- command指令指向的方法可以获取到被选中的下拉框的command属性值 -->
                <el-dropdown class="userInfo" @command="command">
                    <span class="el-dropdown-link">
                    {{user.name}}<i><img :src="user.userface" alt=""></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <!--菜单栏-->
                <el-aside width="200px">
                    <!--router:把子菜单(el-menu-item)的index属性当做路径，直接转发-->
                    <el-menu router>
                        <!--this.$router.options.routes:用当前vue对象获取router文件中的routers属性-->
                        <el-submenu index="1" v-for="(item, index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="item1.path" v-for="(item1,indexj) in item.children" :key="indexj">{{item1.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!--右侧主要展示部分-->
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        methods: {
            command(option) {
                if (option == 'logout'){
                    this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest('/logout').then(resp => {
                            this.$message.success("注销成功!");
                        });
                        window.sessionStorage.removeItem("user");
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        }
    }
</script>

<style>
    /*这里需要注意一下，页面展示上可能会有边距，这是因为body自带边距。所以要去index.html中把body的边距设置为0*/
    /*设置布局头部*/
    .homeHeader {
        background: #409eff;
        /*弹性布局*/
        display: flex;
        /*垂直居中 --弹性布局做基础*/
        align-items: center;
        /*空白在中间，内容在两边  --弹性布局做基础*/
        justify-content: space-between;
        /*内边距*/
        padding: 0px 15px;
        box-sizing: border-box;
    }
    /*设置布局头部中字体样式*/
    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: white;
    }
    .el-dropdown-link {
        display: flex;
        /*垂直居中*/
        align-items: center;
    }
    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        /*圆角*/
        border-radius: 24px;
        margin-left: 8px;
    }
    .userInfo {
        /*设置光标的样式为手指*/
        cursor: pointer;
    }
</style>