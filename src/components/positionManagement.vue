<template>
    <div>
        <div>
            <el-input
                    class="addPosition"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="position.name">
            </el-input>
            <el-button type="primary" style="float: left;" @click="addPosition">添加</el-button>
            <el-button type="danger" @click="deletePositions" icon="el-icon-delete" style="float:left;" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <div class="tableClass">
            <el-table
                    :data="positionList"
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column label="操作">
                    <!-- 下面两个方法参数作用一致，拿handleEdit(scope.$index,scope.row)举例。scope.$index:当前操作的是第几行数据,scope.row:获取当前行的数据 -->
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showDialog(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog
                    title="修改职位"
                    :visible.sync="isShow"
                    width="30%">
                <el-tag>职位</el-tag>
                <el-input v-model="updatePos.name" @keyup.enter.native="update" class="updateInputClass" size="small" placeholder="请输入职位"></el-input>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="update" size="small">确 定</el-button>
                <el-button @click="closeDialog" size="small">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, putRequest} from "../utils/api";

    export default {
        name: "jobManagement",
        mounted() { //钩子函数，类似页面加载函数
            this.initPosition();
        },
        methods: {
            deletePositions() {
                this.$confirm('此操作将永久删除【'+ this.multipleSelection.length +'】条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let tempIds = '?';
                    this.multipleSelection.forEach(item=> {
                        tempIds += 'ids='+item.id + '&'
                    })
                    deleteRequest("/system/basic/position/"+tempIds).then(resp=> {
                        if (resp) {
                            this.initPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) { //val:选中行的数据（json）
                this.multipleSelection = val;
            },
            update() {
                putRequest("/system/basic/position/", this.updatePos).then(resp => {
                    if (resp) {
                        this.isShow = false;
                        this.updatePos.name = '';
                        this.initPosition();
                    }
                })
            },
            closeDialog() {
                this.isShow = false;
            },
            showDialog(index, data) {
                this.isShow = true;
                //拷贝，把data数据拷贝到this.updatePos上
                Object.assign(this.updatePos, data);
            },
            handleDelete(index, data) {  //index：当前是哪行，data：当前行的数据（json对象）
                this.$confirm('此操作将永久删除【'+ data.name +'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRequest("/system/basic/position/" + data.id).then(resp => {
                        if (resp) {
                            this.initPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addPosition() {
                if (this.position.name) {
                    this.postRequest("/system/basic/position/", this.position).then(resp => {
                        if (resp) {
                            this.initPosition();
                            this.position.name = ''
                        }
                    })
                }else {
                    this.$message.error('职位不能为空');
                }
            },
            initPosition() {
                this.getRequest("/system/basic/position/").then(resp => {
                    if (resp){
                        this.positionList = resp.object;
                    }
                })
            }
        },
        data() {
            return {
                position: {
                    name: ''
                },
                positionList: [],
                multipleSelection: [],
                isShow: false,
                updatePos: {
                    name: ''
                }
            }
        }
    }
</script>

<style>
.addPosition {
    width: 300px;
    float: left;
    margin-right: 10px;
}
.tableClass {
    margin-top: 8px;
}
.updateInputClass {
    width: 300px;
    margin-left: 8px;
}
</style>