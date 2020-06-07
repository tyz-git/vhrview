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
                    style="width: 100%;">
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
    </div>
</template>

<script>

    import {deleteRequest, getRequest, postRequest} from "../utils/api";

    export default {
        name: "jobTitleManagement",
        mounted() {
            this.initJobLevel();
        },
        methods: {
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