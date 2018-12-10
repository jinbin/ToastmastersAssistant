//desc.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; 

const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({
  data: {
    tabs: ["中文", "英文"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    let name_en
    let name_cn
    console.log(options.level)

    if(options.level == 1){
      name_en = "Level 1: Mastering Fundamentals"
      name_cn = "阶段一: 掌握基础"
    } else if (options.level == 2){
      name_en = "Level 2: Learning Your Style"
      name_cn = "阶段二：学习风格"
    } else if (options.level == 3) {
      name_en = "Level 3: Increasing Knowledge"
      name_cn = "阶段三：丰富知识" + "(未完待续)"
    } else if (options.level == 4) {
      name_en = "Level 4: Building Skills"
      name_cn = "阶段四：培养技能" + "(未完待续)"
    } else if (options.level == 5) {
      name_en = "Level 5: Demonstrating Expertise"
      name_cn = "阶段五：专业展示" + "(未完待续)"
    } else if (options.level == 6) {
      name_en = "Competent Communication"
      name_cn = "胜任沟通"
    } else if (options.level == 7) {
      name_en = "Pathways资料"
      name_cn = "Pathways Resources"
    }
    this.setData({
      level_name_en: name_en,
      level_name_ch: name_cn
    })

    if (options.level == 1) {
      db.collection('pathwaysNew').where({
        level: 1
      }).get({
        success: res => {
          console.log(res)
          this.setData({
            level: res.data
          })
        }
      })
    } else if (options.level == 2){
      db.collection('pathwaysNew').where({
        level: 2
      }).get({
        success: res => {
          console.log(res)
          this.setData({
            level: res.data
          })
        }
      })
    } else if (options.level == 3){
      db.collection('pathwaysNew').where({
        level: 3
      }).get({
        success: res => {
          console.log(res)
          this.setData({
            level: res.data
          })
        }
      })
    } else if (options.level == 4) {
      db.collection('pathwaysNew').where({
        level: 4
      }).get({
        success: res => {
          console.log(res)
          this.setData({
            level: res.data
          })
        }
      })
    } else if (options.level == 5) {
      db.collection('pathwaysNew').where({
        level: 5
      }).get({
        success: res => {
          console.log(res)
          this.setData({
            level: res.data
          })
        }
      })
    } else if (options.level == 6){
      this.setData({
        level: app.CC
      })
    } else if (options.level == 7){
      this.setData({
        level: app.level7
      })
    }
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
        // level[i].open = !level[i].open
        console.log(i)
        console.log(level[i].open)
        level[i].open = (level[i].open == "true") ? "false" : "true"
        console.log(level[i].open)
      } else {
        console.log(i)
        console.log(level[i].open)
        level[i].open = "false"
      }
    }
    this.setData({
      level: level
    });
  },

  onShareAppMessage: function (options) {
  }
})
