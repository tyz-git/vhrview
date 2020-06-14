<template>
    <div>
        <el-tabs type="border-card" style="height: 585px;" v-model="activeName">
            <el-tab-pane label="部门管理" name="deptManagement"><deptManagement></deptManagement></el-tab-pane>
            <el-tab-pane label="职位管理" name="positionManagement"><positionManagement></positionManagement></el-tab-pane>
            <el-tab-pane label="职称管理" name="jobTitleManagement"><jobTitleManagement></jobTitleManagement></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="rewardPunishmentManagement"><rewardPunishmentManagement></rewardPunishmentManagement></el-tab-pane>
            <el-tab-pane label="权限组" name="authority"><authority></authority></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    //定义好组件后，把它们导入进来，就可以在当前页面使用了
    import deptManagement from '../../components/deptManagement'
    import positionManagement from '../../components/positionManagement'
    import jobTitleManagement from '../../components/jobTitleManagement'
    import rewardPunishmentManagement from '../../components/rewardPunishmentManagement'
    import authority from '../../components/authority'
    export default {
        name: "SysBasic",
        data() {
            return {
                activeName: 'deptManagement'
            }
        },
        components: {
            //说明：如果不给组件起其他名字，可以简化的写，不要指定名字了,单引号是给组件起的名字(下面的每个名字都相当于自定义的标签，它们代替的就是对应组件中的内容)
            'deptManagement': deptManagement,
            'positionManagement': positionManagement,
            'jobTitleManagement': jobTitleManagement,
            'rewardPunishmentManagement': rewardPunishmentManagement,
            'authority': authority
        }
    }
</script>

<style scoped>

</style>