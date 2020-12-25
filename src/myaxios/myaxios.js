import axios from "axios";
//1.配置公共url部分
const instance = axios.create({
    baseURL: "http://linweiqin.cn:8001/",
});
// 2.响应的拦截器
instance.interceptors.response.use(
    function(response){
        return response.data;
    },
    function(error){
       return Promise.reject(error);
    }
);

export default instance;