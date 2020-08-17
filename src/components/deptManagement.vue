<template>
    <div>
        <el-input
                class="searchInputClass"
                placeholder="请输入要查询部门名称..."
                v-model="filterText">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="departmentList"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                ref="tree">
                
        <!--node:当前元素，data:当前元素中的数据(Json对象) -->
        <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex;justify-content:space-between;width: 100%;">
            <span>{{ data.name }}</span>  <!-- 和:props="defaultProps" 中的label属性是一个作用。 -->
            <span>
              <el-button
                      type="primary"
                      size="mini" class="butCls"
                      @click="() => showAddDialog(data)">
                添加部门
              </el-button>
              <el-button
                      type="danger"
                      size="mini" class="butCls"
                      @click="() => deleteDept(data)">
                删除部门
              </el-button>
            </span>
        </span>
        </el-tree>
        <div>
            <el-dialog
                    title="添加部门"
                    :visible.sync="dialogVisible"
                    width="30%">
            <table>
                <tr>
                    <td><el-tag style="width: 70px;">父节点</el-tag></td>
                    <td><el-input v-model="pname" disabled></el-input></td>
                </tr>
                <tr>
                    <td><el-tag style="width: 70px;">部门名称</el-tag></td>
                    <td><el-input placeholder="请输入部门名称..." v-model="addDeptModel.name" @keyup.enter.native="addDept"></el-input></td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="addDept">确 定</el-button>
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest, postRequest} from "../utils/api";

    export default {
        name: "deptManagement",
        //watch:对某个变量进行监控，如果发生改变就触发相应方法
        watch: {
            //如果filterText的值发生改变，就会触发此方法
            filterText(val) {
                //filter(val):filter方法是树中节点过滤的方法，filter触发的方法就是':filter-node-method'所指定的方法
                //val:filterText变量的新值，并且也会作为':filter-node-method'所指定的方法中第一个参数
                this.$refs.tree.filter(val);
            }
        },

        mounted() {
            this.initDepartment();
        },

        methods: {
            deleteAfterInitDept(depts, id) {
                for(let i = 0; i < depts.length; i++) {
                    let dept = depts[i];
                    if (dept.id == id){
                        //删除操作，从i位置开始，删除1个元素
                        depts.splice(i,1);
                    }else{
                        this.deleteAfterInitDept(dept.children, id);
                    }
                }
            },
            deleteDept(data){
                if (data.parent){
                    this.$message.error("此项为父部门");
                }else{
                    this.$confirm('此操作将永久删除'+ data.name +', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteRequest("/system/basic/department/" + data.id).then(resp=>{
                            if (resp){
                                this.deleteAfterInitDept(this.departmentList, resp.object);
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            addAfterInitDept(depts, department){
                depts.forEach(dept=>{
                    if (dept.id == department.parentId){
                        dept.children = dept.children.concat(department);
                    }else{
                        this.addAfterInitDept(dept.children, department);
                    }
                })
            },
            addDept(){
                postRequest("/system/basic/department/",this.addDeptModel).then(resp=>{
                    if (resp){
                        this.dialogVisible = false;
                        this.addAfterInitDept(this.departmentList, resp.object);
                        this.addDeptModel.name = '';
                    }
                })
            },
            showAddDialog(data) {
                this.dialogVisible = true;
                this.pname = data.name;
                this.addDeptModel.parentId = data.id;
            },
            //value:filterText变量的新值。data:树中每个节点的数据(json对象),一个data对应着一个json对象
            filterNode(value, data) {
                //返回true就是把当前节点留下来，返回false就是把当前节点去掉
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initDepartment() {
                getRequest("/system/basic/department/").then(resp=> {
                    if (resp) {
                        this.departmentList = resp.object;
                    }
                })
            }
        },

        data() {
            return {
                addDeptModel: {
                  parentId: -1,
                  name: ''
                },
                pname: '',
                dialogVisible: false,
                filterText: '',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                departmentList: [],
            }
        }
    }
</script>

<style>
    .searchInputClass {
        width: 400px;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
    }
    .butCls{
        padding: 2px;
    }

</style>