


// const axios = require('axios')

axios.defaults.withCredentials=true; //跨域携带cookie

/**
 * request 是 axios 的封装，封装了简单的请求拦截器功能 <br/>
 * 官方文档 : http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8
 * @author  enncy
 * @date  2021/1/7 : 23:52
 */



const request = axios.create({
    baseURL: process.env.NODE_ENV==='development'?'http://localhost:3011':'', //基础路径
    timeout: 60 * 1000, //超时时间
})



request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


module.exports = request



