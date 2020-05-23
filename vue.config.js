let proxyObj = {};
//配置网络请求代理  -- 解决(假)跨域问题
proxyObj['/'] = {
    // 关闭webSocket
    ws: false,
    // 拦截到的地址转发到哪
    target: 'http://localhost:8081',
    changeOrigin: true,
    // 拦截到这些以下字符时不重写
    pathRewrite: {
        '^/': ''
    }
}


module.exports = {
    // 类似后台中的项目配置文件  --application.yml
    devServer: {
        host: 'localhost',
        port: '8080',
        proxy: proxyObj
    }
}