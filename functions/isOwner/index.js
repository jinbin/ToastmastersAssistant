// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  let { OPENID, APPID, UNIONID } = cloud.getWXContext() 
  
  return db.collection('information').doc("owner").get()

}