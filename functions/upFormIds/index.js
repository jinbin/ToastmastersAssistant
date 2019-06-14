// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {

  var used = event.used
  
  const _ = db.command
  if (used.length != 0) {
    try {
      return await db.collection('formIds').where({
        formId: _.in(used) 
      })
      .update({
        data: {
          available: false
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (used.length == 0) {
    console.log("new Date() is " + new Date())
    console.log("used为空，更新所有过期formIds失效")
    try {
      return await db.collection('formIds').where({
        available: true,
        expire: _.lt(new Date())
      })
      .update({
        data: {
          available: false
        },
        success: res => {
          console.log(res)
        },
        complete: res => {
          console.log(res)
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}