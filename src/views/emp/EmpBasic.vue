<template>
    <div>
        <div style="display: flex;justify-content: space-between;">
            <div>
                <el-input placeholder="请输入员工名称..." prefix-icon="el-icon-search" style="width: 300px;margin-right: 10px;" v-model="searchName"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-sort">高级搜索</el-button>
            </div>
            <div>
                <el-button type="success" icon="el-icon-upload2">导入数据</el-button>
                <el-button type="success" icon="el-icon-download">导出数据</el-button>
                <el-button type="success" icon="el-icon-plus" @click="showDialog">新增员工</el-button>
            </div>
        </div>
        <div style="margin-top: 15px;">
            <el-table
                    :data="emps"
                    v-loading="loading"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column
                        width="100"
                        fixed
                        prop="workID"
                        label="工号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        label="姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="birthday"
                        label="出生日期">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="idCard"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        label="民族">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        label="籍贯">
                </el-table-column>
                <el-table-column
                        prop="politicsstatus.name"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        width="170"
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="phone"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        width="200"
                        prop="address"
                        label="家庭住址">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="position.name"
                        label="职位">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="jobLevel.name"
                        label="职称">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        label="聘请形式">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="学历">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="specialty"
                        label="专业">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="school"
                        label="毕业院校">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="beginDate"
                        label="入职时间">
                </el-table-column>
                <el-table-column
                        prop="workState"
                        label="工作状态">
                </el-table-column>
                <el-table-column
                        label="合同期限">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}年</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="conversionTime"
                        label="转正日期">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="beginContract"
                        label="合同起始日期">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="endContract"
                        label="合同结束日期">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="250"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info">高级资料</el-button>
                        <el-button size="mini" type="warning">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="display: flex;justify-content: flex-end;">
            <el-pagination
                    background
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    layout="sizes, prev, pager, next, jumper, ->, total, slot"
                    :total="total">
            </el-pagination>
        </div>
        <!-- 添加员工的对话框 -->
        <div>
            <el-dialog
                    title="新增员工"
                    width="80%"
                    :visible.sync="isShow">
                <el-form :model="addEmployeeForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="员工姓名：" prop="name">
                                    <el-input  placeholder="请输入员工姓名.."  v-model="addEmployeeForm.name"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="性别：" prop="gender" style="width: 210px;">
                                    <el-radio v-model="addEmployeeForm.gender" label="男">男</el-radio>
                                    <el-radio v-model="addEmployeeForm.gender" label="女">女</el-radio>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="出生日期：" prop="birthday">
                                    <el-date-picker
                                            v-model="addEmployeeForm.birthday"
                                            type="date"
                                            format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="政治面貌：" prop="politicId">
                                    <el-select v-model="addEmployeeForm.politicId" placeholder="政治面貌">
                                        <el-option
                                                v-for="item in politicsStatus"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 第二行 -->
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="民族：" prop="nationId">
                                    <el-select v-model="addEmployeeForm.nationId" placeholder="民族">
                                        <el-option
                                                v-for="item in nations"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="籍贯：" prop="nativePlace" style="width: 280px;">
                                    <el-input  placeholder="请输入籍贯.."  v-model="addEmployeeForm.nativePlace"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="电子邮箱：" prop="email">
                                    <el-input  placeholder="请输入电子邮箱.."  v-model="addEmployeeForm.email"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="家庭住址：" prop="address">
                                    <el-input  placeholder="请输入家庭住址.."  v-model="addEmployeeForm.address"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 第三行 -->
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="职位：" prop="posId">
                                    <el-select v-model="addEmployeeForm.posId" placeholder="职位">
                                        <el-option
                                                v-for="item in positions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="职称：" prop="jobLevelId" style="width: 280px;">
                                    <el-select v-model="addEmployeeForm.jobLevelId" placeholder="职称">
                                        <el-option
                                                v-for="item in joblevels"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="所属部门：" prop="departmentId">
                                    <el-popover
                                            placement="right"
                                            title="部门"
                                            width="300"
                                            trigger="manual"
                                            v-model="showDepsPopover">
                                        <div>
                                            <el-tree
                                                    :data="deps"
                                                    :props="defaultProps"
                                                    accordion
                                                    :expand-on-click-node="false"
                                                    default-expand-all
                                                    @node-click="handleNodeClick">
                                            </el-tree>
                                        </div>
                                        <div slot="reference" style="width:200px;height: 38px;border: 1px solid #eaeaea;border-radius: 5px;cursor: pointer;" @click="showDeps">{{tempTreeName}}</div>
                                    </el-popover>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="电话号码：" prop="phone">
                                    <el-input  placeholder="请输电话号码.."  v-model="addEmployeeForm.phone"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 第四行 -->
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="工号：" prop="workID">
                                    <el-input disabled placeholder="请输电话工号.."  v-model="addEmployeeForm.workID"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="学历：" prop="tiptopDegree" style="width: 280px;">
                                    <el-select v-model="addEmployeeForm.tiptopDegree" placeholder="学历">
                                        <el-option
                                                v-for="item in educations"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="毕业院校：" prop="school">
                                    <el-input  placeholder="请输入毕业院校.."  v-model="addEmployeeForm.school"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="专业名称：" prop="specialty">
                                    <el-input  placeholder="请输专业名称.."  v-model="addEmployeeForm.specialty"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 第五行 -->
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="入职日期：" prop="beginDate">
                                    <el-date-picker
                                            v-model="addEmployeeForm.beginDate"
                                            type="date"
                                            format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="转正日期：" prop="conversionTime">
                                    <el-date-picker
                                            v-model="addEmployeeForm.conversionTime"
                                            type="date"
                                            format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="合同起始日期：" prop="beginContract" >
                                    <el-date-picker
                                            v-model="addEmployeeForm.beginContract"
                                            type="date"
                                            style="margin-left: 10px;"
                                            format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="合同终止日期：" prop="endContract">
                                    <el-date-picker
                                            v-model="addEmployeeForm.endContract"
                                            type="date"
                                            format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 第六行 -->
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="身份证号码：" prop="idCard">
                                    <el-input  placeholder="请输入身份证号码.."  v-model="addEmployeeForm.idCard"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6" style="margin-left: 50px;">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="聘用形式：" prop="engageForm" >
                                    <el-radio v-model="addEmployeeForm.engageForm" label="劳动合同">劳动合同</el-radio>
                                    <el-radio v-model="addEmployeeForm.engageForm" label="劳务合同">劳务合同</el-radio>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="6" style="margin-left: 50px;">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="婚姻状况：" prop="beginContract">
                                    <el-radio-group v-model="addEmployeeForm.wedlock">
                                        <el-radio label="已婚">已婚</el-radio>
                                        <el-radio label="未婚">未婚</el-radio>
                                        <el-radio label="离异">离异</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="">确 定</el-button>
                    <el-button @click="closeDialog">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/api";

    export default {
        name: "EmpBasic",
        data(){
            return {
                //显示在树中模拟下拉框的div中
                tempTreeName: '',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                deps: [],
                showDepsPopover: false,
                rules:[],
                //学历
                educations: ['本科','专科','博士','硕士','研究生','高中','小学','其他'],
                //职称
                joblevels: [],
                //职位
                positions: [],
                //民族
                nations: [],
                //政治面貌
                politicsStatus: [],
                emps: [],
                searchName: '',
                // 总条数
                total: 0,
                //当前页数
                page: 1,
                //每页展示条数
                size: 10,
                loading: false,
                //dialog是否展示
                isShow: false,
                addEmployeeForm:{
                    name: "嘎嘎",
                    gender: "男",
                    birthday: "1989-12-31",
                    idCard: "610122199001011256",
                    wedlock: "已婚",
                    nationId: 1,
                    nativePlace: "陕西",
                    politicId: 13,
                    email: "laowang@qq.com",
                    phone: "18565558897",
                    address: "深圳市南山区",
                    departmentId: 5,
                    jobLevelId: 9,
                    posId: 29,
                    engageForm: "劳务合同",
                    tiptopDegree: "本科",
                    specialty: "信息管理与信息系统",
                    school: "深圳大学",
                    beginDate: "2017-12-31",
                    workState: "在职",
                    workID: "00000001",
                    contractTerm: 2.0,
                    conversionTime: "2018-03-31",
                    notWorkDate: null,
                    beginContract: "2017-12-31",
                    endContract: "2019-12-31",
                    workAge: null
                },
            }
        },
        mounted() {
            this.getEmpListByPage();
            this.initDictionaryData()
        },
        methods:{
            handleNodeClick(data){
                this.tempTreeName = data.name;
                this.addEmployeeForm.departmentId = data.id;
                this.showDepsPopover = false;
            },
            showDeps(){
                getRequest("/emp/basic/departments").then(resp=>{
                    this.deps = resp.object;
                })
                this.showDepsPopover = true;
            },
            getEmployeeWorkId(){
              getRequest("/emp/basic/getMaxWorkId").then(resp=>{
                  if (resp){
                      this.addEmployeeForm.workID = resp.object;
                  }
              })
            },
            initPositionsAndJobLevels(){
                getRequest("/emp/basic/positions").then(resp=>{
                    if (resp){
                        this.positions = resp.object;
                    }
                });
                getRequest("/emp/basic/joblevels").then(resp=>{
                    if (resp){
                        this.joblevels = resp.object;
                    }
                });
            },
            initDictionaryData(){
              if (!window.sessionStorage.getItem("politicsStatus")){
                  getRequest("/emp/basic/politicsStatus").then(resp=>{
                      if (resp){
                          this.politicsStatus = resp.object;
                          window.sessionStorage.setItem("politicsStatus", resp.object);
                      }
                  });
              }else {
                  this.politicsStatus = window.sessionStorage.getItem("politicsStatus");
              }
              if (!window.sessionStorage.getItem("nations")) {
                  getRequest("/emp/basic/nations").then(resp => {
                      if (resp) {
                          this.nations = resp.object;
                          window.sessionStorage.setItem("nations", resp.object);
                      }
                  });
              }else {
                  this.nations = window.sessionStorage.getItem("nations");
              }
            },
            getEmpListByPage(){
                this.loading = true;
                getRequest("/emp/basic/?page="+this.page+"&size="+this.size).then(resp=>{
                    this.loading = false;
                    if (resp){
                        this.emps = resp.list;
                        this.total = resp.total;
                    }
                })
            },
            currentChange(currentPage){
                this.page = currentPage;
                this.getEmpListByPage();
            },
            sizeChange(pageSize){
                this.size = pageSize;
                this.getEmpListByPage();
            },
            showDialog(){
                this.initPositionsAndJobLevels();
                this.getEmployeeWorkId();
                this.isShow = true;
            },
            closeDialog(){
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>

</style>