const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('')
}

function recordTime(date) {

  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()

  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function dashang() {
  wx.navigateToMiniProgram({
    appId: 'wx18a2ac992306a5a4',
    path: 'pages/apps/largess/detail?id=LYFYxTFDv9E%3D'
  })
}

function saveOfficialQRCode() {
  wx.showModal({
    content: '搜索"头马助手"官方公众号, 获取历年头马世界冠军演讲视频！',
    showCancel: false,
    confirmText: '去关注',
    confirmColor: '#ff7f50',
    success: function (res) {
      if (res.confirm) {
        wx.setClipboardData({
          data: "头马助手 Toastmasters Assistant",
          success: function (res) {
            wx.showToast({
              title: "公众号名已复制"
            })
          }
        })
        console.log('用户点击确定');
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  recordTime: recordTime,
  dashang: dashang,
  saveOfficialQRCode: saveOfficialQRCode
}
