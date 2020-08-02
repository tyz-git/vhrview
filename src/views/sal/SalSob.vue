<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <el-button type="primary" icon="el-icon-plus" @click="showSalaryDialog">新增账套</el-button>
            <el-button style="width:70px;" type="success" icon="el-icon-refresh-right" @click="getSalarySob"></el-button>
        </div>
        <div style="margin-top: 15px;">
            <el-table
                    :data="salarys"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="name"
                        label="名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="basicSalary"
                        label="基本工资"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="bonus"
                        label="奖金"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="lunchSalary"
                        label="午餐补助"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="trafficSalary"
                        label="交通补助"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="allSalary"
                        label="应发工资"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="300">
                </el-table-column>
                <el-table-column label="养老金">
                    <el-table-column
                            prop="pensionBase"
                            label="基数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="pensionPer"
                            label="比率"
                            width="120">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="医疗金">
                    <el-table-column
                            prop="medicalBase"
                            label="基数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="medicalPer"
                            label="比率"
                            width="120">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="公积金">
                    <el-table-column
                            prop="accumulationFundBase"
                            label="基数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="accumulationFundPer"
                            label="比率"
                            width="120">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="showSalaryDialog(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteSalary(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible">
                <el-steps :active="step" finish-status="success">
                    <el-step :title="item" v-for="(item, index) in showSalaryDictionaryData" :key="index"></el-step>
                </el-steps>
                <div>                                                                                                                      <!--遍历对象：value:key-value中的value，title:key-value中的key-->
                    <el-input v-model="salary[title]" :placeholder="'请输入'+ showSalaryDictionaryData[index] +'...'"  v-show="step==index" v-for="(value,title,index) in salary" :key="index"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" v-show="this.step==0?false:true" @click="buttonPrev">上一步</el-button>
                    <el-button type="primary" style="width: 84px;" @click="buttonNext">{{this.step == this.showSalaryDictionaryData.length-1?"完成":"下一步"}}</el-button>
                    <el-button @click="initSalary">取 消</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest, postRequest, putRequest} from "../../utils/api";

    export default {
        name: "SalSob",
        data(){
            return {
                step: 0,
                dialogVisible: false,
                showSalaryDictionaryData:[
                    "名称",
                    "基本工资",
                    "交通补助",
                    "午餐补助",
                    "奖金",
                    "养老金基数",
                    "养老金比率",
                    "医疗保险基数",
                    "医疗保险比率",
                    "公积金基数",
                    "公积金比率",
                ],
                salarys: [],
                salary:{
                    name: null,
                    basicSalary: null,
                    trafficSalary: null,
                    lunchSalary: null,
                    bonus: null,
                    pensionBase: null,
                    pensionPer: null,
                    medicalBase: null,
                    medicalPer: null,
                    accumulationFundBase: null,
                    accumulationFundPer: null
                },
            }
        },
        mounted() {
            this.getSalarySob();
        },
        methods: {
            deleteSalary(data){

                  this.$confirm('此操作将永久删除'+ data.name +', 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                      deleteRequest("/sal/sob/"+data.id).then(resp=>{
                          if (resp) {
                              this.getSalarySob();
                          }
                      })
                  }).catch(() => {
                      this.$message({
                          type: 'info',
                          message: '已取消删除'
                      });
                  });
            },
            initSalary(){
                this.salary = {
                    name: null,
                    basicSalary: null,
                    trafficSalary: null,
                    lunchSalary: null,
                    bonus: null,
                    pensionBase: null,
                    pensionPer: null,
                    medicalBase: null,
                    medicalPer: null,
                    accumulationFundBase: null,
                    accumulationFundPer: null
                }
                this.dialogVisible = false;
                this.step = 0;
            },
            buttonPrev(){
                if (this.step == 0){
                    return false;
                }
                this.step--;
            },
            buttonNext(){
                if (this.step == this.showSalaryDictionaryData.length - 1){
                    if (this.salary.id){
                        putRequest("/sal/sob/",this.salary).then(resp=>{
                            if (resp) {
                                this.initSalary();
                                this.getSalarySob();
                            }
                        })
                    }else {
                        postRequest("/sal/sob/", this.salary).then(resp=>{
                            if (resp) {
                                this.initSalary();
                                this.getSalarySob();
                            }
                        })
                    }
                    return false;
                }
                this.step++;
            },
            showSalaryDialog(data){
              if (data.id) {
                  this.salary = {
                      name: data.name,
                      basicSalary: data.basicSalary,
                      trafficSalary: data.trafficSalary,
                      lunchSalary: data.lunchSalary,
                      bonus: data.bonus,
                      pensionBase: data.pensionBase,
                      pensionPer: data.pensionPer,
                      medicalBase: data.medicalBase,
                      medicalPer: data.medicalPer,
                      accumulationFundBase: data.accumulationFundBase,
                      accumulationFundPer: data.accumulationFundPer,
                      id: data.id
                  }
              }
              this.dialogVisible = true;
            },
            getSalarySob(){
                getRequest("/sal/sob/").then(resp=>{
                    if (resp){
                        this.salarys = resp.object;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>