
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    text: "Pathways是全世界Toastmasters会员培养沟通力和领导力的进阶之路，是Toastmasters教育系统焕新后的成果。\nPathways建立在Toastmasters为个体赋能这个理念的基础之上，帮助会员提高在不同场合下与他人沟通和领导他人所需的各种实用技能。\n在Pathways取得进展的同时，会员锻炼并增强了他们的沟通力和领导力。Pathways提供了59个不同的项目，每一个项目都为会员安排了任务。会员需要按照项目的要求完成任务，最后在俱乐部会议上做演讲才能完成这些项目。通过完成项目和做演讲，会员挑战了自己，同时提高和完善了他们的某些技能。"
  },
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  onShareAppMessage: function () {
    return {
      title: '头马助手 | Pathways介绍及入门视频'
    }
  }
})