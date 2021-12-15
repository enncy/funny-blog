import axios, { AxiosRequestConfig } from "axios";
import md5 from 'md5'; 

let key = "db6c6c411bb7467e996fbd5fda687b18"

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
        config.headers = {
            token:getMd5(config.data,key)
        }
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
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
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);




//传入json对象，和key(任意字符串，越长越好)，获取md5加密
function getMd5(params:any,key:string){
	let str = JSON.stringify(sort_ASCII(params))
	return md5(encodeURIComponent(str+key))
}

//对json 对象进行 ascii码 排序
function sort_ASCII(obj:any) {
	var arr:string[] = new Array();
	var num = 0;
	for (var i in obj) {
		arr[num] = i;
		num++;
	}
	var sortArr = arr.sort();
	var sortObj:any = {};
	for (var i in sortArr) {
		sortObj[sortArr[i]] = obj[sortArr[i]];
	}
	return sortObj;
}
 