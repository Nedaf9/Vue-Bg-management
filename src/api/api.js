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
>>>>>>> 4de3acee78ca0b78f1c32227710eab85026e3d02
