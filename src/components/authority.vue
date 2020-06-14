<template>
    <div>
        <div class="addBoxClass">
            <el-input placeholder="请输入角色英文名称...." v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input style="margin-left: 10px;margin-right: 8px;" v-model="role.nameZh" placeholder="请输入角色的中文名称..." @keyup.enter.native="addAuthority"></el-input>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addAuthority">添加</el-button>
        </div>
        <div>
            <el-collapse  accordion v-model="activeName" @change="initMenuList">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roleList" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问资源</span>
                            <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete" @click="deleteRole(r.id)"></el-button>
                        </div>
                        <div>
                            <!-- data:树形结构的数据，
                             props:指定data数据中，哪个字段是当前节点展示的内容，哪个字段是展示子节点的
                             node-key:每个节点在树中的唯一标识，
                             default-checked-keys:被选中的节点的唯一标识数组,
                             ref:类似原生js中的id属性一样，全局唯一标识，但是vue中关于全局唯一标识有新的属性就是ref-->
                            <el-tree
                                    node-key="id"
                                    :default-checked-keys="selectedMenus"
                                    ref="tree"
                                    show-checkbox
                                    :data="menuList"
                                    :props="defaultProps"
                                    accordion>
                            </el-tree>
                        </div>
                        <div style="display: flex;justify-content: flex-end;">
                            <el-button type="primary" size="small" @click="doUpdate(r.id,index)">确定</el-button>
                            <el-button type="warning" size="small" @click="cancelUpdate">取消修改</el-button>
                        </div>
                    </el-card>

                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest, postRequest, putRequest} from "../utils/api";

    export default {
        name: "authority",
        mounted() {
            this.initRoleList();
        },
        methods: {
            deleteRole(id) {
                deleteRequest("/system/basic/Authority/"+id).then(resp=> {
                    if (resp){
                        this.initRoleList();
                    }
                })
            },
            addAuthority() {
              if (this.role.name && this.role.nameZh) {
                postRequest("/system/basic/Authority/",this.role).then(resp=> {
                    if (resp) {
                        this.initRoleList();
                        this.role = '';
                    }
                })
              }else {
                  this.$message.error('请完善选项');
              }
            },
            cancelUpdate() {
                this.activeName = -1;
            },
            doUpdate(rid, index) {
                let treeIdArr = this.$refs.tree[index].getCheckedKeys(true);
                let tempParamter = "?rid=" + rid;
                treeIdArr.forEach(item=> {
                    tempParamter += "&mids=" + item
                })
                putRequest("/system/basic/Authority/" + tempParamter).then(resp=> {
                    if (resp) {
                        this.activeName = -1;
                    }
                })
            },
            initMenuList(rid) {
                if (rid) {
                    getRequest('/system/basic/Authority/menus').then(resp=> {
                        if (resp) {
                            this.menuList = resp.object;
                        }
                    })
                    this.selectedMenus = this.initSelectedMenus(rid);
                }
            },
            initSelectedMenus(rid) {
                getRequest('/system/basic/Authority/selectMenus/'+rid).then(resp=> {
                    if (resp) {
                        this.selectedMenus = resp.object;
                    }
                })
            },
            initRoleList() {
                getRequest('/system/basic/Authority/').then(resp=> {
                    if (resp) {
                        this.roleList = resp.object;
                    }
                })
            }
        },
        data(){
            return {
                //每个角色展开后默认选中的菜单项数据
                selectedMenus: [],
                //添加时装表单数据的对象
                role: {
                    name: '',
                    nameZh: ''
                },
                //后台获取的角色列表
                roleList: [],
                //后台获取的菜单列表
                menuList: [],
                //和树形结构有关，label:指定数据中哪个变量是当前节点展示的内容，children:数据中哪个变量是展示子节点的
                defaultProps: {
                    label: 'name',
                    children: 'children'
                },
                //控制展开哪个折叠面板
                activeName: -1

            }
        }
    }
</script>

<style>
    .addBoxClass {
        display: flex;
        justify-content: flex-start;

    }
    .addBoxClass .el-input {
        width: 300px;
    }
</style>