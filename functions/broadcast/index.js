// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let template_id = "bZ7b6ZkH0AiytbK8QmmdxNyIDP7yLJOV3AEMsf-bjE0"
  let appId = "wx16c76d4762cbe0b3"
  let appSecret = "012c05c6e349b45f336145cf21aea071"
  let result

  //获取access_token
  let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret
    return new Promise((resolve, reject) => {
      request(url, function (error, response, body) {
        let data = eval('(' + body + ')')
        resolve(data.access_token)
      });
    });
  // var options = {
  //   method: 'GET',
  //   url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret,
  //   body: {
  //   },
  //   json: true
  // }

  // rp(options).then(res => {
  //   console.log("res res res : ")
  //   result = res
  // }).catch(err_res => {
  //   console.log(err_res)
  // })

  // console.log("rp start")

  // rp("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret)
  // .then( res => {
  //     console.log("请求 success:")
  //     //result = JSON.parse(resultValue)
  //     result = resultValue
  //   })
  //   .catch(function (err) {
  //     console.log(err)
  //    })

  //获取openid
  //获取touser（openid）
  //获取form_id
}