//desc.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
    let name_en
    let name_cn
    console.log(options.level)

    if(options.level == 1){
      name_en = "Level1: Mastering Fundamentals"
      name_cn = "阶段一: 掌握基础"
    } else if (options.level == 2){
      name_en = "Learning Your Style"
      name_cn = "阶段二：学习风格"
    } else if (options.level == 3) {
      name_en = "Increasing Knowledge"
      name_cn = "阶段三：丰富知识"
    } else if (options.level == 4) {
      name_en = "Building Skills"
      name_cn = "阶段四：培养技能"
    } else if (options.level == 5) {
      name_en = "Demonstrating Expertise"
      name_cn = "阶段五：专业展示"
    }
    this.setData({
      level_name_en: name_en,
      level_name_ch: name_cn
    })

    if (options.level == 1) {
      this.setData({
        level: app.level1
      })
    } else if (options.level == 2){
      this.setData({
        level: app.level2
      })
    }
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
