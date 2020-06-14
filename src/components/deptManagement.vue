<template>
    <div>
        <el-input
                class="searchInputClass"
                placeholder="输入部门名称..."
                v-model="filterText">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="departmentList"
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="tree">
        </el-tree>
    </div>
</template>

<script>
    import {getRequest} from "../utils/api";

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

</style>