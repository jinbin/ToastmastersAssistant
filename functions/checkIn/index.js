// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext.OPENID)
  const _ = db.command
  // db.collection('checkin').where({
  //   _openid: wxContext.OPENID,
  // }).update({
  //   data: {
  //     checkin: _.inc(1)
  //   },
  //   success: console.log,
  //   fail: console.error
  // })

  db.collection('checkin').add({
    data:({
      checkin: 2,
      date: "20190708"
    }),
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },
    fail: console.error
  })

  console.log("ok")

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}