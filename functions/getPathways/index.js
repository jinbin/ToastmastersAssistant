// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var level = parseInt(event.level)
  var path = parseInt(event.path)

  console.log(level)
  console.log(path)
  
  const _ = db.command

  if(path == 0 || path){
    return db.collection('pathwaysNew').where({
      level: level,
      path: path
    }).get()
  }else{
    console.log("走全量")

    return db.collection('pathwaysNew').where({
      level: level,
    }).get()
  }

}