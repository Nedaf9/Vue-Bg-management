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