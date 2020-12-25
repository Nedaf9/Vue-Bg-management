<<<<<<< HEAD
import myaxios from '../utils/myaxiox';
//获取数据库信息
const getDatabase = () => myaxios.get("/273655/admin/database");
//首页获取用户名
const getUserData = () => myaxios.get("/273655/admin/home/userData")
//首页获取系统信息
const getSystemStatus = () => myaxios.get("/273655/admin/home/systemStatus")
//首页获取已安装软件信息
const getSoftware = () => myaxios.get("/273655/admin/home/software")
//首页获取流量
const getFlux = () => myaxios.get("/273655/admin/home/flux")

export {
  getDatabase,
  getUserData,
  getSystemStatus,
  getSoftware,
  getFlux
}
=======
<<<<<<< HEAD
<<<<<<< HEAD
import myaxios from "../myaxios/myaxios";

//获取端口量
const getsecurity = () => {
    return myaxios.get("/admin/security").catch((err) => {
      console.log(err);
    });
  };

export { getsecurity }

const getuselog = () => {
    return myaxios.get("/admin/log").catch((err) => {
      console.log(err);
    });
  };

export { getuselog }
=======
<<<<<<< HEAD
import axios from 'axios';
const getDocument = ()=> axios.get('http://rap2api.taobao.org/app/mock/273678/document_content')
     
=======
import myaxios from "../myaxios/myaxios";
>>>>>>> 30981ac2199038667878f050de74c24b72886161

//数据导入的接口
export const login = (params) =>{
    return myaxios.post("admin/login",params).catch((err)=>[
       console.log(err)
    ])
}


//退出接口
export const logout = (params) =>{
    return myaxios.get("admin/signout").catch((err)=>{
        console.log(err);
    })
}
<<<<<<< HEAD
=======
>>>>>>> 4de3acee78ca0b78f1c32227710eab85026e3d02
>>>>>>> 14b372900450cc4ff1e8aaf9e411cc0dd06ef9b3
>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
=======
>>>>>>> 30981ac2199038667878f050de74c24b72886161
>>>>>>> 21eed39cd0e756e25861be3662d80aca4abd0783
