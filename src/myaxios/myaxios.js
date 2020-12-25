<<<<<<< HEAD
import axios from "axios"
let myaxios = axios.create({
<<<<<<< HEAD
    baseURL: "http://rap2api.taobao.org/app/mock/274116/"
=======
    baseURL: "http://rap2api.taobao.org/app/mock/273673/admin"
>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
})
myaxios.interceptors.response.use(
=======
import axios from "axios";
//1.配置公共url部分
const instance = axios.create({
    baseURL: "http://linweiqin.cn:8001/",
});
// 2.响应的拦截器
instance.interceptors.response.use(
>>>>>>> 30981ac2199038667878f050de74c24b72886161
    function(response){
        return response.data;
    },
    function(error){
       return Promise.reject(error);
    }
<<<<<<< HEAD
)
<<<<<<< HEAD
export default  myaxios
=======
export default  myaxios

>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
=======
);

export default instance;
>>>>>>> 30981ac2199038667878f050de74c24b72886161
