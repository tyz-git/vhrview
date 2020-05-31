服务端菜单数据加载完成后，数据放在哪里？办法如下：
1、sessionStorage(不安全)
2、localStorage(不安全)
3、vuex(安全) 状态管理 和它相似的vux是UI库，这个要区分开

使用vuex的好处：
1、数据可以放到一个公共的区域，其他组件也可以访问这些数据。这个需求sessionStorage和localStorage也是可以满足的
2、数据安全，这些数据其他人是看不到的。这个需求sessionStorage和localStorage不能满足，因为它们两个中的数据其他人是可以看到的。所以不安全

图标库：
font-awesome、阿里图标库