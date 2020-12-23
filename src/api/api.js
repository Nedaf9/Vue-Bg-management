import myaxios from "@/myaxios/myaxios"

export const apps = function(param){
    return myaxios.get("/apps",param).catch(function(err){
        console.log(err);
    })
}