<template>
    <div>
        <el-table
                :data="empSobs"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="workID"
                    label="工号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="电子邮件"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="department.name"
                    label="所属部门"
                    width="300">
            </el-table-column>
            <el-table-column
                    label="工资账套"
                    width="120">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right" v-if="scope.row.salary">
                        <table slot="content">
                            <tr>
                                <td>名称：</td>
                                <td>{{scope.row.salary.name}}</td>
                            </tr>
                            <tr>
                                <td>基本工资：</td>
                                <td>{{scope.row.salary.basicSalary}}</td>
                            </tr>
                            <tr>
                                <td>奖金：</td>
                                <td>{{scope.row.salary.bonus}}</td>
                            </tr>
                        </table>
                        <el-tag>{{scope.row.salary.name}}</el-tag>
                    </el-tooltip>
                    <el-tag v-else>暂未设置</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-popover
                            placement="left"
                            width="250"
                            @hide="updateSob(scope.row)"
                            title="修改员工账套信息"
                            trigger="click">
                        <el-select v-model="salSob">
                            <el-option
                                    v-for="item in salSobs"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button type="primary" slot="reference" @click="showSob(scope.row)">修改账套</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: flex-end;">
            <el-pagination
                    background
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    layout="sizes, prev, pager, next, jumper, ->, total, slot"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getRequest, putRequest} from "../../utils/api";

    export default {
        name: "SalSobCfg",
        data(){
            return {
                salSob: null,
                salSobs: [],
                empSobs: [],
                page: 1,
                size: 10,
                total: 0
            }
        },
        mounted() {
            this.getEmpSobs();
        },
        methods: {
            updateSob(data) {
                if (this.salSob) {
                    putRequest("/sal/sobcfg/?sid="+this.salSob+"&eid="+data.id).then(resp=>{
                        if (resp) {
                            this.getEmpSobs();
                            this.salSob = null;
                        }
                    })
                }
            },
            showSob(data) {
                getRequest("/sal/sob/").then(resp=>{
                    if (resp) {
                        this.salSobs = resp.object;
                        this.salSob = data.salary.id;
                    }
                })
            },
            getEmpSobs() {
                getRequest("/sal/sobcfg/?"+ "page="+this.page+"&size=" + this.size).then(resp=>{
                    if (resp) {
                        this.empSobs = resp.list;
                        this.total = resp.total;
                    }
                })
            },
            currentChange(currentPage){
                this.page = currentPage;
                this.getEmpSobs();
            },
            sizeChange(pageSize){
                this.size = pageSize;
                this.getEmpSobs();
            }
        }
    }
</script>

<style scoped>

</style>