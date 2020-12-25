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
