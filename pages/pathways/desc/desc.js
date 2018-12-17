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

    if(options.level == 1){
      name_en = "Level 1: Mastering Fundamentals"
      name_cn = "阶段一: 掌握基础"
    } else if (options.level == 2){
      name_en = "Level 2: Learning Your Style"
      name_cn = "阶段二：学习风格"
    } else if (options.level == 3) {
      name_en = "Level 3: Increasing Knowledge"
      name_cn = "阶段三：丰富知识"
    } else if (options.level == 4) {
      name_en = "Level 4: Building Skills"
      name_cn = "阶段四：培养技能"
    } else if (options.level == 5) {
      name_en = "Level 5: Demonstrating Expertise"
      name_cn = "阶段五：专业展示"
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

    if (options.level == 6){
      this.setData({
        projects: app.CC
      })
    } else if (options.level == 7){
      this.setData({
        projects: app.level7
      })
    } else {
      wx.showLoading({
        title: '精彩马上呈现',
      })
      wx.cloud.callFunction({
        name: 'getPathways',
        data: {
          level: options.level
        },
        success: res => {
          console.log(res)
          that.setData({
            projects: res.result.data
          })
          wx.hideLoading()
        }
      })
    }
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  touchstart: function (e) {
    console.log("touchstart")
  },

  touchmove: function (e) {
    console.log("touchmove")
    if (this.data.activeIndex == 0){
      this.setData({
        activeIndex: 1
      })
    }else{
      this.setData({
        activeIndex: 0
      })
    }
  },

  touchend: function (e) {
    console.log("touchend")
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
    var id = e.currentTarget.id, projects = this.data.projects;
    for (var i = 0, len = projects.length; i < len; ++i) {
      if (projects[i].id == id) {
        projects[i].open = (projects[i].open == "true") ? "false" : "true"
      } else {
        projects[i].open = "false"
      }
    }
    this.setData({
      projects: projects
    });
  },

  onShareAppMessage: function (options) {
    return {
      title: '头马助手 | Pathways手册' + '【' + this.data.level_name_ch + '】', 
      // path: '/pages/pathways/desc/desc?level=' + options.level
    }
  }
})
