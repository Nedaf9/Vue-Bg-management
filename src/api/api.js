import myaxios from "../myaxios/myaxios";

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
