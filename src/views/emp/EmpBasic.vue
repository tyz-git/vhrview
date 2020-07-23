<template>
    <div>
        <div style="display: flex;justify-content: space-between;">
            <div>
                <el-input placeholder="请输入员工名称..." prefix-icon="el-icon-search" style="width: 300px;margin-right: 10px;" v-model="searchName"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-sort">高级搜索</el-button>
            </div>
            <div>
                <el-upload
                        class="upload-demo"
                        action="/emp/basic/uploadImport"
                        style="display:inline-flex;margin-right: 8px;"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="onSuccess"
                        :disabled="isAbled"
                        multiple>
                    <el-button  type="success" :icon="importIcon">{{importData}}</el-button>
                </el-upload>
                <el-button type="success" icon="el-icon-download" @click="exportData">导出数据</el-button>
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
                        <el-button size="mini" type="warning" @click="showEditDialog(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteEmp(scope.row)">删除</el-button>
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
                    :title="showTitle"
                    width="80%"
                    :visible.sync="isShow">
                <el-form :model="addEmployeeForm" status-icon :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                                <el-form-item label="婚姻状况：" prop="wedlock">
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
                    <el-button type="primary" @click="addEmployee">确 定</el-button>
                    <el-button @click="closeDialog">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest, postRequest, putRequest} from "../../utils/api";

    export default {
        name: "EmpBasic",
        data(){
            return {
                isAbled: false,
                importIcon: 'el-icon-upload2',
                importData: '导入数据',
                showTitle: '',
                //显示在树中模拟下拉框的div中
                tempTreeName: '',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                deps: [],
                showDepsPopover: false,
                rules:{
                    name: [{required: true, message: '请输入员工姓名', trigger: 'blur'}],
                    gender:[{required: true, message: '请选择性别', trigger: 'blur'}],
                    birthday:[{required: true, message: '请选择出生日期', trigger: 'blur'}],
                    idCard:[
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                        {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式不正确', trigger: 'blur'}
                    ],
                    wedlock:[{required: true, message: '请选择婚姻状况', trigger: 'blur'}],
                    nationId:[{required: true, message: '请选择民族', trigger: 'blur'}],
                    nativePlace:[{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    politicId:[{required: true, message: '请选择政治面貌', trigger: 'blur'}],
                    email:[
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                        ],
                    phone:[
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([0125689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[89]\d)\d{7}$/, message: '手机号格式不正确', trigger: 'blur'}
                        ],
                    address:[{required: true, message: '请输入居住地址', trigger: 'blur'}],
                    departmentId:[{required: true, message: '请选择部门', trigger: 'blur'}],
                    jobLevelId:[{required: true, message: '请选择职称', trigger: 'blur'}],
                    posId:[{required: true, message: '请选择职位', trigger: 'blur'}],
                    engageForm:[{required: true, message: '请选择聘用形式', trigger: 'blur'}],
                    tiptopDegree:[{required: true, message: '请选择学历', trigger: 'blur'}],
                    specialty:[{required: true, message: '请输入专业名称', trigger: 'blur'}],
                    school:[{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    beginDate:[{required: true, message: '请选择入职时间', trigger: 'blur'}],
                    workState:[{required: true, message: '请选择在职状态', trigger: 'blur'}],
                    workID:[{required: true, message: '请输入员工工号', trigger: 'blur'}],
                    contractTerm:[{required: true, message: '请输入合同期限', trigger: 'blur'}],
                    conversionTime:[{required: true, message: '请选择转正日期', trigger: 'blur'}],
                    notWorkDate:[{required: true, message: '请选择离职日期', trigger: 'blur'}],
                    beginContract:[{required: true, message: '请选择合同起始日期', trigger: 'blur'}],
                    endContract:[{required: true, message: '请选择合同终止日期', trigger: 'blur'}],
                    workAge:[{required: true, message: '请输入工龄', trigger: 'blur'}]
                },
                //学历
                educations: ['本科','大专','博士','硕士','高中','初中','小学','其他'],
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
                    name: "",
                    gender: "",
                    birthday: "",
                    idCard: "",
                    wedlock: "",
                    nationId: '',
                    nativePlace: "",
                    politicId: '',
                    email: "",
                    phone: "",
                    address: "",
                    departmentId: '',
                    jobLevelId: '',
                    posId: '',
                    engageForm: "",
                    tiptopDegree: "",
                    specialty: "",
                    school: "",
                    beginDate: "",
                    workState: "",
                    workID: "",
                    contractTerm: '',
                    conversionTime: "",
                    notWorkDate: '',
                    beginContract: "",
                    endContract: "",
                    workAge: null
                },
            }
        },
        mounted() {
            this.getEmpListByPage();
            this.initDictionaryData()
        },
        methods:{
            onSuccess(reponse, file, fileList){
                this.importData = '导入数据';
                this.importIcon = 'el-icon-upload2';
                this.isAbled = false;
            },
            //excel上传前执行
            beforeUpload(){
                this.importData = '正在上传';
                this.importIcon = 'el-icon-loading';
                this.isAbled = true;
            },
            exportData(){
              window.open("/emp/basic/export");
            },
            deleteEmp(data){
                this.$confirm('此操作将永久删除'+data.name+', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRequest("/emp/basic/"+data.id).then(resp=>{
                        if (resp){
                            this.getEmpListByPage();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            addEmployee(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid){
                        if (this.addEmployeeForm.id){
                            putRequest('/emp/basic/', this.addEmployeeForm).then(resp=>{
                                if (resp){
                                    this.getEmpListByPage();
                                    this.isShow = false;
                                    this.initEmp();
                                }
                            })
                        }else {
                            postRequest("/emp/basic/", this.addEmployeeForm).then(resp=>{
                                if (resp){
                                    this.getEmpListByPage();
                                    this.isShow = false;
                                    this.initEmp();
                                }
                            })
                        }
                    }else {
                        this.$mes服务器被吃了sage.error("请完善选项");
                    }
                })
            },
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
              // if (!window.sessionStorage.getItem("politicsStatus")){
                  getRequest("/emp/basic/politicsStatus").then(resp=>{
                      if (resp){
                          this.politicsStatus = resp.object;
                          window.sessionStorage.setItem("politicsStatus", resp.object);
                      }
                  });
              // }else {
              //     this.politicsStatus = window.sessionStorage.getItem("politicsStatus");
              // }
              // if (!window.sessionStorage.getItem("nations")) {
                  getRequest("/emp/basic/nations").then(resp => {
                      if (resp) {
                          this.nations = resp.object;
                          window.sessionStorage.setItem("nations", resp.object);
                      }
                  });
              // }else {
              //     this.nations = window.sessionStorage.getItem("nations");
              // }
            },
            initEmp(){
              this.addEmployeeForm = {
                  name: "",
                  gender: "",
                  birthday: "",
                  idCard: "",
                  wedlock: "",
                  nationId: '',
                  nativePlace: "",
                  politicId: '',
                  email: "",
                  phone: "",
                  address: "",
                  departmentId: '',
                  jobLevelId: '',
                  posId: '',
                  engageForm: "",
                  tiptopDegree: "",
                  specialty: "",
                  school: "",
                  beginDate: "",
                  workState: "",
                  workID: "",
                  contractTerm: '',
                  conversionTime: "",
                  notWorkDate: '',
                  beginContract: "",
                  endContract: "",
                  workAge: null
              },
              this.tempTreeName = '';
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
            showEditDialog(data){
                this.showTitle = '编辑员工信息';
                this.addEmployeeForm = data;
                this.tempTreeName = data.department.name;
                this.initPositionsAndJobLevels();
                this.isShow = true;
            },
            showDialog(){
                this.getEmployeeWorkId();
                this.showTitle = '新增员工';
                this.initPositionsAndJobLevels();
                this.isShow = true;
            },
            closeDialog(){
                this.initEmp();
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>

</style>