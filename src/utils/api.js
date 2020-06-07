import axios from 'axios'
import {Message} from "element-ui";


/**
 * 响应回调统一处理  --方法的响应会被拦截器自动拦截到
 * success:请求成功的回调  --success中data字段才是真正的服务端响应数据、status字段是http的状态值
 * error:请求失败的回调
 * */
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.code == 500){
        Message.error(success.data.msg);
        return;
    }
    if (!success.data.isAlert) {
        if (success.data.msg){
            Message.success(success.data.msg);
        }
    }
    return success.data;
},error => {
    if (error.response.status == 504 || error.response.status == 404){
        return Message.error({message:'服务器被吃了o(╯□╰)o'});
    }else if (error.response.status == 403){
        return Message.error({message:'您的权限不足'});
    }else if (error.response.status == 401){
        return Message.error({message:'尚未登录，请登录'});
    }else {
        return Message.error({message:'未知错误'});
    }
    return;
})


// 基础路径
let base = '';


// 封装post方法  --spring security默认不支持json数据，支持key-value形式数据。这个方法就是把请求数据转成key-value形式
export const postKeyValueRequest=(url, params) => {
    return axios({
        method: 'post',
        //这里注意value值不是双引号，而是1前边的那个符号
        url: `${base}${url}`,
        data: params,
        //把请求参数的格式转化一下，转成key-value形式
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data){
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//封装普通post方法
export const postRequest=(url,params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    });
}
//封装普通put方法
export const putRequest=(url,params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    });
}
//封装普通get方法
export const getRequest=(url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
    });
}
//封装普通delete方法
export const deleteRequest=(url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
    });
}