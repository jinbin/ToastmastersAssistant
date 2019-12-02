//article.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
    let name_en
    let name_cn
    console.log(options.level)
    
    this.setData({
      level_name_en: name_en,
      level_name_ch: name_cn
    })

  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          title: "内容已复制"
        })
      }
    })
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, level = this.data.level;
    for (var i = 0, len = level.length; i < len; ++i) {
      if (level[i].id == id) {
        level[i].open = !level[i].open
      } else {
        level[i].open = false
      }
    }
    this.setData({
      level: level
    });
  },

  onShareAppMessage: function (options) {
  }
})
