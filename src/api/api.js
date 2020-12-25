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
