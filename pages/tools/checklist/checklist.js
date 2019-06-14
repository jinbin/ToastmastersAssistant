// pages/tools/checklist/checklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['会议主持人'],
    index1: 0,
    checklist: { 
      "会议主持人": {} 
    },
    items: {
      "会议主持人": [{
          name: 'tm-step1',
          value: '确定会议主题'
        },
        {
          name: 'tm-step2',
          value: '收集演讲人的演讲信息'
        },
        {
          name: 'tm-step3',
          value: '补充未约满的角色'
        },
        {
          name: 'tm-step4',
          value: '串联所有参会人员'
        },
        {
          name: 'tm-step5',
          value: '制作议程'
        },
        {
          name: 'tm-step6',
          value: '更新投票系统数据'
        },
        {
          name: 'tm-step7',
          value: '会议信息保留，做好收尾'
        }
      ]
    },
    help: {
      "会议主持人": {
        "tm-step1": "记得融入自己对头马的理解~",
        "tm-step2": "收集好桌面主持人和所有演讲人的演讲信息，作为素材和PR材料~",
        "tm-step3": "尽早到会议群和来宾群找到适合担任角色的人~",
        "tm-step4": "保证会议所有人都清楚自己的角色",
        "tm-step5": "做完议程及时发到会议群让大家确认~",
        "tm-step6": "投票系统里的信息需要更新~",
        "tm-step7": "当期会议最佳名单、照片记得保存"   
      }
    }
  },

  help: function(e) {
    console.log(e.target.dataset.content)
    wx.showModal({
      title: '头马助手de提示',
      showCancel: false,
      confirmColor: "#ff7f50",
      confirmText: "复制模板发群里",
      content: e.target.dataset.content,
      success(res) {}
    })
  },

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e)
    // console.log(e)

    var that = this
    console.log(Object.keys(that.data.checklist[that.data.array[that.data.index1]]))

    //that.data.index1: 0
    //that.data.array: 会议主持人
    //that.data.checklist: 
    console.log("ok")
    var pre = Object.keys(that.data.checklist[that.data.array[that.data.index1]]) || [] 
    var pre_len = (Object.keys(that.data.checklist[that.data.array[that.data.index1]]) || [] ).length

    // 求 a 和 b 数组的差值 
    let aSet = new Set(e.detail.value)
    let bSet = new Set(pre)
    let difference = Array.from(new Set(e.detail.value.concat(pre).filter(v => !aSet.has(v) || !bSet.has(v))))

    // 当前是从 未√ 到 √ 状态
    if (e.detail.value.length > pre_len) {
      wx.showModal({
        title: '头马助手de提示',
        // showCancel: true,
        confirmColor: "#ff7f50",
        cancelText: "再想想",
        confirmText: "确定完成",
        content: that.data.help[that.data.array[that.data.index1]][difference[0]],
        success(res) {
          if (res.confirm) {
            that.data.checklist[that.data.array[that.data.index1]] = {}
            for (var i = 0; i < e.detail.value.length; i++) {
              console.log(e.detail.value[i])
              that.data.checklist[that.data.array[that.data.index1]][e.detail.value[i]] = true
            }

            console.log(that.data.checklist)
            that.setData({
              checklist: that.data.checklist
            })

            wx.setStorage({
              key: 'checklist',
              data: that.data.checklist
            })
          } else { // 再想想
            console.log("再想想")

            // 求 a 和 b 数组的差值 
            // let aSet = new Set(e.detail.value)
            // let bSet = new Set(pre)
            // let difference = Array.from(new Set(e.detail.value.concat(pre).filter(v => !aSet.has(v) || !bSet.has(v))))

            that.data.checklist[that.data.array[that.data.index1]] = {}
            for (var i = 0; i < pre.length; i++) {
              that.data.checklist[that.data.array[that.data.index1]][pre[i]] = true
            }

            that.setData({
              checklist: that.data.checklist
            })

            wx.setStorage({
              key: 'checklist',
              data: that.data.checklist
            })
          }
        } // success
      }) // showModal
    } else { // // 当前是从 √ 到 未√ 状态
      that.data.checklist[that.data.array[that.data.index1]] = {}
      for (var i = 0; i < e.detail.value.length; i++) {
        console.log(e.detail.value[i])
        that.data.checklist[that.data.array[that.data.index1]][e.detail.value[i]] = true
      }

      console.log(that.data.checklist)
      that.setData({
        checklist: that.data.checklist
      })

      wx.setStorage({
        key: 'checklist',
        data: that.data.checklist
      })
    }
  },

bindPickerChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  var that = this
  wx.getStorage({
    key: 'checklist',
    success(res) {
      that.data.checklist = res.data || {}
      console.log(that.data.checklist)
      that.setData({
        checklist: that.data.checklist
      })
    }
  })
  // this.data.checklist = this.data.checklist || {"tm": {}}

  // this.setData({
  //   checklist: this.data.checklist
  // })
  console.log(this.data.checklist)
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {
  return {
    title: "一步步教你做好" + this.data.array[this.data.index1]
  }
}
})