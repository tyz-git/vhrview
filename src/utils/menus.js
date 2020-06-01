import {getRequest} from './api'

//加载菜单数据方法
// router:router文件，store:store文件(存储公共数据的地方)
export const initMenu=(router, store) => {

    //如果store.state.routes中有数据，就不再去服务端加载数据
    if (store.state.routes.length > 0){
        return;
    }
    getRequest('/system/config/getMenuListByHrId').then(data => {
        if (data) {
            //格式化数据，因为后端返回的数据的时候，component字段是字符串类型，
            //但是实际上router文件中的component字段是一个我们声明的对象，所以这里我们需要将component类型从字符串转为对象
            let fatRoutes = formatRoutes(data.object);
            //将转换后的数据放入router中,动态添加路由列表
            router.addRoutes(fatRoutes);
            //同时也把转换后的数据放入公共区域。commit(方法名,参数)
            store.commit('initRoutes', fatRoutes);
        }
    })
}
//格式化菜单方法(component字段,服务端返回的是字符串,但是我们实际需要的不是字符串)
export const formatRoutes=(routes) => {

    let totalFormatRoutes = [];
    routes.forEach(route => {
        //批量定义变量，例如：url = route.url, path = route.path等等。。然后对象中的值就会默认赋值到对应自定义变量上
        let {
            url,
            path,
            component,
            name,
            iconCls,
            meta,
            children
        } = route;

        //如果当前菜单有子菜单，那么子菜单中的component字段也需要处理一下
        if (children && children instanceof Array) {
            //如果children的类型是数组类型，说明这是一级菜单，它还有子菜单，递归处理一下
            children = formatRoutes(children);
        }
        let format = {
            url: url,
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve){
                // require(要跳转的模板路径,/) 告诉vue你要跳转的模板的在哪里
                if (component.startsWith('Home')){
                    require(['../views/' + component + '.vue'], resolve);
                }else if (component.startsWith("Emp")){
                    require(['../views/emp/' + component + '.vue'], resolve);
                }else if (component.startsWith("Per")){
                    require(['../views/per/' + component + '.vue'], resolve);
                }else if (component.startsWith("Sal")){
                    require(['../views/sal/' + component + '.vue'], resolve);
                }else if (component.startsWith("Sta")){
                    require(['../views/sta/' + component + '.vue'], resolve);
                }else if (component.startsWith("Sys")){
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        totalFormatRoutes.push(format);
    })
    return totalFormatRoutes;
}