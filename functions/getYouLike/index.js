// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  console.log(event)
  var event_type = event.type
  console.log(event_type)

  const tasks = []

  if (event_type == "" | event_type == undefined) {
    // 先取出集合记录总数
    const countResult = await db.collection('guessYouLike').count()
    const total = countResult.total
    console.log(total)
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('guessYouLike')
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get()
      tasks.push(promise)
    }
  } else {
    // 先取出集合记录总数
    const countResult = await db.collection('guessYouLike').where({
      type: event_type
    }).count()
    const total = countResult.total
    console.log(total)
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('guessYouLike')
        .where({
          type: event_type
        })
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get()
      tasks.push(promise)
    }
  }

  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}