// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  postMessage: function(e) {
    let formId = e.detail.formId
    let activityName = e.detail.value.activityName
    let activityLocation = e.detail.value.activityLocation
    let activityDesc = e.detail.value.activityDesc

    wx.cloud.callFunction({
      name: "broadcast",
      complete: res => {
        console.log("broadcast")
        console.log(res.result)

        console.log("https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + res.result)

        wx.request({
          url: "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + res.result,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" },
          data: json2Form({ 
            touser: "oWbQf0esXoh89a77zkfhQqDJ1kvQ", 
            template_id: "bZ7b6ZkH0AiytbK8QmmdxNyIDP7yLJOV3AEMsf-bjE0",
            form_id: "cb5cb421ee65436034d2af5c4f5fab66",
            data: {
              "keyword1":{
                "value": "1111"
              },
              "keyword2": {
                "value": "2222"
              },
              "keyword3": {
                "value": "333"
              }
            }
          }),
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            console.log("complete::::::::::")
          }
        })
      }
    }),

    wx.navigateBack({})
  },

  //填入活动名称
  bindActivityName: function (e) {
    // console.log(e.detail.value)
  },

  //填入活动地址
  bindActivityLocation: function (e) {
    // console.log(e.detail.value)
  },

  //填入活动说明
  bindDesInput: function(e) {
    // console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&")
}