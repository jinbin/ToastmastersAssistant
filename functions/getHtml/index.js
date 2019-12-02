// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // let template_id = "bZ7b6ZkH0AiytbK8QmmdxNyIDP7yLJOV3AEMsf-bjE0"
  // let appId = "wx16c76d4762cbe0b3"
  // let appSecret = "012c05c6e349b45f336145cf21aea071"
  // let result

  // //获取access_token
  // let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret
  // return new Promise((resolve, reject) => {
  //   request(url, function (error, response, body) {
  //     let data = eval('(' + body + ')')
  //     resolve(data.access_token)
  //   });
  // });

  console.log("rp start")

  request.get('https://mp.weixin.qq.com/s/HwxdK7nsSqh22Ysk9pXwXg')
    .on('response', function (response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
      return {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        result: response
      }
    })

  //获取openid
  //获取touser（openid）
  //获取form_id
}