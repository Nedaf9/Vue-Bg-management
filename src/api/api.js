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
     

export {getDocument}
=======
import myaxios from "@/myaxios/myaxios"

export const apps = function(param){
    return myaxios.get("/apps",param).catch(function(err){
        console.log(err);
    })
}
<<<<<<< HEAD
export const pages = function(param){
    return myaxios.get("/pages",param).catch(function(err){
        console.log(err);
    })
}
=======
>>>>>>> 4de3acee78ca0b78f1c32227710eab85026e3d02
>>>>>>> 14b372900450cc4ff1e8aaf9e411cc0dd06ef9b3
>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
