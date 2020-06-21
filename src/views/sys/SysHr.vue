<template>
    <div>
        <div>
            <el-input v-model="searchHrName" style="width: 400px;" placeholder="请输入员工名称..." prefix-icon="el-icon-search" @keyup.enter.native="initHrList"></el-input>
            <el-button icon="el-icon-search" style="margin-left: 10px;" type="primary" @click="initHrList">搜索</el-button>
        </div>
        <div class="body-class">
            <el-card class="card-class" v-for="(hr,index) in hrs">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0;color:red;" type="text" icon="el-icon-delete" @click="deleteHr(hr)"></el-button>
                </div>
                <img :src="hr.userface" :alt="hr.name" :title="hr.name">
                <div style="margin-top: 10px;">
                    <table>
                        <tr>
                            <td>用户名：</td>
                            <td>{{hr.name}}</td>
                        </tr>
                        <tr>
                            <td>手机号：</td>
                            <td>{{hr.telephone}}</td>
                        </tr>
                        <tr>
                            <td>电话号：</td>
                            <td>{{hr.phone}}</td>
                        </tr>
                        <tr>
                            <td>地址：</td>
                            <td>{{hr.address}}</td>
                        </tr>
                        <tr>
                            <td>用户状态：</td>
                            <td>
                                <el-switch
                                    v-model="hr.enabled"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="updateHr(hr)"
                                    active-text="启用"
                                    inactive-text="禁用">
                                </el-switch>
                            </td>
                        </tr>
                        <tr>
                            <td>用户角色：</td>
                            <td>
                                <el-tag class="tag-class" type="success" v-for="(role,indexj) in hr.roles" :key="indexj">{{role.nameZh}}</el-tag>
                                <el-popover
                                        placement="right"
                                        title="用户角色"
                                        width="200"
                                        @show="showPopOver(hr)"
                                        @hide="updateRoles(hr)"
                                        trigger="click">
                                    <div>
                                        <el-select v-model="selectedRoles" placeholder="请选择角色" multiple>
                                            <el-option
                                                    v-for="role in roles"
                                                    :key="role.id"
                                                    :label="role.nameZh"
                                                    :value="role.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <el-button style="margin-left: 4px;" slot="reference" icon="el-icon-more" type="text" @click="initRoles"></el-button>
                                </el-popover>
                            </td>
                        </tr>
                        <tr>
                            <td>备注：</td>
                            <td>{{hr.remark}}</td>
                        </tr>
                    </table>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest, putRequest} from "../../utils/api";

    export default {
        name: "SysHr",
        mounted() {
            this.initHrList();
        },
        methods:{
          deleteHr(hr){
              this.$confirm('此操作将永久删除'+ hr.name +', 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                 deleteRequest("/system/hr/deleteHr/"+hr.id).then(resp=>{
                     if (resp){
                         this.initHrList();
                     }
                 })
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
          },
          updateRoles(hr){
              let temp = "?hrid="+hr.id;
              this.selectedRoles.forEach(role=>{
                  temp += "&rids=" + role;
              })
              putRequest("/system/hr/updateHrRoles/"+temp).then(resp=>{
                if (resp){
                    this.initHrList();
                }
              })
          },
          showPopOver(hr){
            this.selectedRoles = [];
            hr.roles.forEach(role=>{
                this.selectedRoles.push(role.id);
            })
          },
          initRoles(){
            getRequest("/system/hr/getRoles").then(resp=>{
                if (resp){
                    this.roles = resp.object;
                }
            })
          },
          updateHr(hr){
              console.log(hr)
              putRequest("/system/hr/", hr).then(resp=>{
                  if (resp) {
                      this.initHrList();
                  }
              })
          },
          initHrList(){
              getRequest("/system/hr/?hrName="+this.searchHrName).then(resp=>{
                  if (resp){
                      this.hrs = resp.object;
                  }
              })
          }
        },
        data(){
            return {
                searchHrName: '',
                hrs: [],
                roles: [],
                selectedRoles: [],
            }
        }
    }
</script>

<style>
.card-class{
    width: 400px;
    height: 450px;
    margin-top: 15px;
}
.body-class{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.body-class img{
    width: 100px;
    height: 100px;
    border-radius: 100px;
}
.tag-class{
    margin-left: 5px;
}
</style>