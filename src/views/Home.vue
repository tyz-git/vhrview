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
                        <!--注意:
                            1.下一行的index一定要设置成一个变量,如果是相同的值,ui框架会以为下拉框都是同一个,会导致点击其中一个下拉框,其他下拉框也会展开
                            2.index的值是字符串,如果我们给的值是数字类型,页面会给出警告。所以index变量后需要加一个引号-->
                        <el-submenu :index="index+''" v-for="(item, index) in routers" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color: #3e9eff;margin-right: 8px;" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="item1.path" v-for="(item1,indexj) in item.children" :key="indexj">{{item1.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!--右侧主要展示部分-->
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="breadCrumbs" v-if="this.$router.currentRoute.path == '/home'">
                        欢迎来到微管理系统
                    </div>
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
        computed: {
          routers() {
              return this.$store.state.routes;
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
                        this.$store.commit('initRoutes', []);
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
    .breadCrumbs{
        font-size: 30px;
        font-family: 华文行楷;
        color: #3e9eff;
        padding-top: 60px;
    }
</style>