<template>
    <div>
        <div>
            <el-input
                placeholder="请填写职称..."
                class="addInput"
                prefix-icon="el-icon-plus"
                v-model="jl.name">
            </el-input>
            <el-select v-model="jl.titleLevel" placeholder="请选择等级" style="float: left;margin-right: 10px;" @keyup.enter.native="addJobLevel">
                <!-- label:展示的数据，value:下拉框实际数据 -->
                <el-option
                        v-for="item in levels"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button type="primary" style="float: left" @click="addJobLevel">添加</el-button>
            <el-button type="danger" @click="deleteJobLevels" icon="el-icon-delete" style="float:left;" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <div style="margin-top: 8px;">
            <el-table
                    :data="jobLevelList"
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 100%;height: 100%;">
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
                        label="职称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="titleLevel"
                        width="180"
                        label="等级">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope"> <!-- scope.row:获取当前行数据 -->
                        <el-tag type="success" v-if="scope.row.enabled" style="width: 58px;text-align: center;">启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <!-- :visible.sync='x' x是一个变量，来控制这个dialog是否显示 -->
            <el-dialog
                    title="修改职称"
                    :visible.sync="isShow"
                    width="30%">
                <div>
                    <el-tag style="width:70px;">职称</el-tag>
                    <el-input v-model="dialogJl.name" size="small" placeholder="请输入职称" style="width: 300px;margin-left: 10px;" @keyup.enter.native="updateJobLevel"></el-input>
                </div>
                <div>
                    <el-tag style="width:70px;">等级</el-tag>
                    <el-select v-model="dialogJl.titleLevel" placeholder="请选择等级" size="small" style="width: 300px;margin-left: 10px;margin-top: 10px;">
                        <el-option
                                v-for="item in levels"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-top: 10px;">
                    <el-tag style="margin-right: 13px;">是否启用</el-tag>
                    <el-switch
                            style="margin-right: 165px;"
                            v-model="dialogJl.enabled"
                            active-text="启用"
                            inactive-text="未启用">
                    </el-switch>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="updateJobLevel">确 定</el-button>
                    <el-button size="small" @click="isShow = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import {deleteRequest, getRequest, postRequest, putRequest} from "../utils/api";

    export default {
        name: "jobTitleManagement",
        mounted() {
            this.initJobLevel();
        },
        methods: {
            updateJobLevel() {
                putRequest("/system/basic/jobLevel/", this.dialogJl).then(resp=> {
                    if (resp) {
                        this.isShow = false;
                        this.initJobLevel();
                    }
                })
            },
            deleteJobLevels() {
                this.$confirm('此操作将永久删除【'+ this.multipleSelection.length +'】条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let tempStr = '?';
                    this.multipleSelection.forEach(item=> {
                        tempStr += 'ids=' + item.id + '&'
                    })
                    deleteRequest("/system/basic/jobLevel/" + tempStr).then(resp=> {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addJobLevel() {
                if (this.jl.name && this.jl.titleLevel) {
                    postRequest("/system/basic/jobLevel/", this.jl).then(resp=> {
                        if (resp) {
                            this.jl.name = '';
                            this.jl.titleLevel = '';
                            this.initJobLevel();
                        }
                    })
                }else {
                    this.$message.error('请填写职称和等级!');
                }
            },
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除【'+ data.name +'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRequest("/system/basic/jobLevel/" + data.id).then(resp=> {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(index, data) {
                this.isShow = true;
                Object.assign(this.dialogJl, data);
            },
            initJobLevel() {
              getRequest("/system/basic/jobLevel/").then(resp=> {
                  if (resp) {
                      this.jobLevelList = resp.object;
                  }
              })
            }
        },
        data() {
          return {
              jl: {
                  titleLevel: '',
                  name: ''
              },
              jobLevelList: [],
              isShow: false,
              dialogJl: {
                  name: '',
                  titleLevel: '',
                  enabled: false
              },
              multipleSelection: [],
              levels:[
                  '正高级',
                  '副高级',
                  '初级',
                  '中级',
                  '员级'
              ]
          }
        },
    }
</script>

<style>
    .addInput {
        width: 300px;
        float: left;
        margin-right: 10px;
    }

</style>