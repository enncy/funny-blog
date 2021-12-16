import axios, { AxiosRequestConfig } from "axios";
import md5 from "crypto-js/md5";

// 携带 cookie
axios.defaults.withCredentials = true;

// md5 密钥
let key = "db6c6c411bb7467e996fbd5fda687b18";

// 全局配置
let baseConfig = {
    baseURL: "http://localhost:8999",
    timeout: 30 * 1000,
};
export const request = axios.create(baseConfig);

export const get = (url: string, config?: AxiosRequestConfig) => {
    return axios.get(url, {
        ...baseConfig,
        ...config,
    });
};

export const post = (url: string, data: any, config?: AxiosRequestConfig) => {
    return axios.post(url, data, {
        ...baseConfig,
        ...config,
    });
};

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        if (config.url) {
            config.url = config.url.replace(/%E2%80%8B/g, "");
        }
        // 加密处理
        let time = Date.now();
        let obj = Object.assign({}, config.data || {}, config.params || {});
        config.headers = {
            token: MD5(obj, time),
            time: time,
        };
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        console.error(error);

        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        console.error(error);
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

//传入json对象，和key(任意字符串，越长越好)，获取md5加密
export function MD5(params: any, time: number) {
    let str = JSON.stringify(asciiSort(params));
    let s = encodeURIComponent(str + time + key).toLocaleLowerCase();
    return md5(s).toString();
}

//对json 对象进行 ascii码 排序
function asciiSort(obj: any) {
    // 键值排序
    var sortKeys = Reflect.ownKeys(obj).sort();
    var newObj = {};
    sortKeys.forEach((v) => Reflect.set(newObj, v, obj[v]));
    return newObj;
}
