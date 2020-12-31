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
    sliderLeft: 0,
    array: [
      "阶段一: 掌握基础", "阶段二: 学习风格", "阶段三: 丰富知识", "阶段四: 培养技能", "阶段五: 专业展示", "返回首页"
    ],
    // arrayPath: ["全部", "创新计划", "激励策略","表达精通","领导力发展","愿景沟通","战略关系","动态领导力","说服影响力","有效指导","团队协作"],
    arrayPath: ["全部", "创新计划"],
    // list: [
    //   ["Level 1: Mastering Fundamentals","阶段一: 掌握基础"],
    //   ["Level 2: Learning Your Style","阶段二：学习风格"],
    //   ["Level 3: Increasing Knowledge", "阶段三：丰富知识"],
    //   ["Level 4: Building Skills","阶段四：培养技能"],
    //   ["Level 5: Demonstrating Expertise", "阶段五：专业展示",]
    // ],
    list: [
      ["阶段一", "掌握基础"],
      ["阶段二", "学习风格"],
      ["阶段三", "丰富知识"],
      ["阶段四", "培养技能"],
      ["阶段五", "专业展示",]
    ],
    index: 0,
    indexPath: 0,
    highlight: [],
    pathStyle: false,
    currentTab: 0,
    paths: app.Paths
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
    })

    db.collection("information").doc("config").get({
      success: function(res){
        console.log("pathways_external")
        console.log(res.data["pathways_external"])
        that.setData({
          pathways_external: res.data["pathways_external"],
        })
      }
    })

    let name_en
    let name_cn

    console.log("HHHHHHHH")
    console.log(options.level)

    this.setData({
      index: options.level -1 
    })

    var options_level = options.level
    console.log("options")
    console.log(options)

    if(options_level == 0){
      name_en = "After L2 of any path, you can start your Pathways Mentor Program Project. There are 3 projects."
      name_cn = "完成任意Path的Level 2 之后即可开启你的导师计划。导师计划分为3个项目。"
    }

    if(options_level == 1){
      name_en = "Level 1: Mastering Fundamentals"
      name_cn = "阶段一: 掌握基础"
      this.setData({
        color0: "#FFB90F"
      })
    } else if (options_level == 2){
      name_en = "Level 2: Learning Your Style"
      name_cn = "阶段二：学习风格"
      this.setData({
        color1: "#FFB90F"
      })
    } else if (options_level == 3) {
      name_en = "Level 3: Increasing Knowledge"
      name_cn = "阶段三：丰富知识"
      this.setData({
        color2: "#FFB90F"
      })
    } else if (options_level == 4) {
      name_en = "Level 4: Building Skills"
      name_cn = "阶段四：培养技能"
      this.setData({
        color3: "#FFB90F"
      })
    } else if (options_level == 5) {
      name_en = "Level 5: Demonstrating Expertise"
      name_cn = "阶段五：专业展示"
      this.setData({
        color4: "#FFB90F"
      })
    } else if (options_level == 6) {
      name_en = "Competent Communication"
      name_cn = "胜任沟通"
      this.setData({
        color5: "#FFB90F"
      })
    } else if (options_level == 7) {
      name_en = "Pathways资料"
      name_cn = "Pathways Resources"
    } else if (options_level == 10) {
      name_en = "Pathways: 11条路径"
      name_cn = "Pathways是2018年在中国正式上线的Toastmasters新一代教育系统的称呼。Pathways包含11条路径，每条路径包含一定量的project，将为全球的头马会员提供新的成长服务。"      
    }
    this.setData({
      level_name_en: name_en,
      level_name_ch: name_cn
    })

    if (options_level == 6){
      this.setData({
        projects: app.CC
      })
    } else if (options_level == 10){
      this.setData({
        projects: app.Paths
      })
    } else {
      wx.showLoading({
        title: '精彩马上呈现',
      })
      // 创新计划 0
      // 动态领导力 1
      // 高效教练 2
      // 领导力发展 3
      // 激励策略 4
      // 战略关系 5
      // 有说服力的影响 6
      // 精通演讲 7
      // 团队协作 8
      // 愿景沟通 9
      // 幽默路径 10
      console.log("currentTab: " + that.data.currentTab)
      wx.cloud.callFunction({
        name: 'getPathways',
        data: {
          level: options.level,
          path: that.data.currentTab
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

  swichNav: function (e) {
    var that = this 
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })

    wx.showLoading({
      title: '精彩马上呈现',
    })
    // 创新计划 0
    // 动态领导力 1
    // 高效教练 2
    // 领导力发展 3
    // 激励策略 4
    // 战略关系 5
    // 有说服力的影响 6
    // 精通演讲 7
    // 团队协作 8
    // 愿景沟通 9
    // 幽默路径 10
    console.log("currentTab: " + that.data.currentTab)
    console.log("level: " + (that.data.index + 1))
    wx.cloud.callFunction({
      name: 'getPathways',
      data: {
        level: parseInt(that.data.index)+ 1,
        path: parseInt(that.data.currentTab)
      },
      success: res => {
        console.log(res)
        that.setData({
          projects: res.result.data
        })
        wx.hideLoading()
      }
    })
  },

  changebook: function (e) {
    console.log(e.currentTarget.dataset.id)

    this.setData({
      color0: "",
      color1: "",
      color2: "",
      color3: "",
      color4: ""
    })

    if (e.currentTarget.dataset.id == 0){
      this.setData({
        color0: "#FFB90F"
      })
    } else if (e.currentTarget.dataset.id == 1){
      this.setData({
        color1: "#FFB90F"
      })
    } else if (e.currentTarget.dataset.id == 2) {
      this.setData({
        color2: "#FFB90F"
      })
    } else if (e.currentTarget.dataset.id == 3) {
      this.setData({
        color3: "#FFB90F"
      })
    } else if (e.currentTarget.dataset.id == 4) {
      this.setData({
        color4: "#FFB90F"
      })
    }

    console.log('选择改变，携带值为', e.currentTarget.dataset.id)

    if (e.currentTarget.dataset.id == 5) {
      wx.switchTab({
        url: '/pages/merger/merger',
      })
      return
    }

    this.setData({
      index: parseInt(e.currentTarget.dataset.id)
    })
    var that = this
    wx.showLoading({
      title: '精彩马上呈现',
    })

    console.log("wwwwwwwww")
    console.log(that.data.currentTab)
    console.log(parseInt(e.currentTarget.dataset.id) + 1)

    wx.cloud.callFunction({
      name: 'getPathways',
      data: {
        level: parseInt(e.currentTarget.dataset.id) + 1,
        path: parseInt(that.data.currentTab)
      },
      success: res => {
        console.log(res)
        that.setData({
          projects: res.result.data
        })
        wx.hideLoading()
      }
    })
  },

  saveOfficialQRCode: function (e) {
    wx.navigateTo({
      url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/uybVCD6KfKgSoCq0Jo4g_A',
    })
  },

  toCanvas: function (e) {
    var that = this
    var ctx = wx.createCanvasContext('canvas')

    this.canvasTextAutoLine("本项目的重点是如何规划变化，制定沟通计划，并确定成功的障碍。目的：本项目的目的是练习制定变更管理计划。概述：为真实或假设情况创建变更管理计划。你可以根据个人、演讲会或职业生活中发生的过去或未来变化来制定计划。在5 - 7分钟内与你的俱乐部分享你的变更管理计划。你的演讲可能是幽默的，信息性的，或者任何其他吸引你的风格。这不是一份关于你从项目中学到了什么的报告，而是一份关于你的计划以及它将如何使你和团队受益的概述。这个项目包括：制定变更管理计划, 准备变更工作表, 编写沟通计划资源,1个5 - 7分钟的演讲", ctx, 30, 30, 20, 200)//绘制文本
    ctx.save()
    ctx.beginPath()
    // ctx.arc(50, 50, 50, 0, 2 * Math.PI, false)
    // ctx.clip()
    // ctx.drawImage("../../images/qrcode.jpg", 100, 100, 50, 50, 50, 50)
    ctx.restore()
    //调用draw()开始绘制
    ctx.draw(true,
      function (e) {
        console.log(e)
        // 把当前画布指定区域的内容导出生成指定大小的图片。
        wx.canvasToTempFilePath({
          // width: 300,
          // height: 300,
          destWidth: 750,
          destHeight: 750,
          canvasId: 'canvas',
          fileType: 'jpg',
          success(res) {
            console.log(res)
            that.data.tmpPath = res.tempFilePath
            wx.previewImage({
              current: res.tempFilePath, // 当前显示图片的http链接
              urls: [res.tempFilePath] // 需要预览的图片http链接列表
            })
          }
        })
      }
    )
  },

  canvasTextAutoLine(str, ctx, initX, initY, lineHeight, canvasWidth) {
    const arrText = str.split('')//字符串分割为数组
    let currentText = ''// 当前字符串及宽度
    let currentWidth
    for (let letter of arrText) {
      currentText += letter
      currentWidth = ctx.measureText(currentText).width
      if (currentWidth > canvasWidth) {
        ctx.fillText(currentText, initX, initY)
        currentText = ''
        initY += lineHeight
      }
    }
    if (currentText) {
      ctx.fillText(currentText, initX, initY)
    }
  },

  tabClick: function (e) {
    console.log(this.data.activeIndex)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: parseInt(e.currentTarget.id)
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
    console.log("被选中id: " + id)
    for (var i = 0, len = projects.length; i < len; ++i) {
      if (projects[i].id == id) {
        projects[i].open = (projects[i].open == "true") ? "false" : "true"
      } else {
        projects[i].open = "false"
      }
    }
    this.setData({
      projects: projects,
      indexPath: 0,
      pathStyle: false
    });
  },

  bindPickerChangePath(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexPath: e.detail.value
    })
    if(e.detail.value == 0){
      console.log("全部")
      for (let i = 0; i < this.data.projects.length; ++i) {
        this.data.projects[i].highlight = false
        this.setData({
          projects: this.data.projects,
          pathStyle: false
        })
      }
    }else if(e.detail.value == 1){
      console.log("创新计划")
      for (let i = 0; i < this.data.projects.length; ++i) {
        // console.log(this.data.projects[i].id)
        console.log(app.divideByPath[0])
        // console.log(this.data.projects[i].id in [1,2])
        var mark = false 
        for (var item in app.divideByPath[0]){
          if (this.data.projects[i].id == app.divideByPath[0][item]){
            mark = true 
            break
          }
        }
        this.data.projects[i].highlight = mark
        console.log(this.data.projects[i].highlight)
        this.setData({
          projects: this.data.projects,
          pathStyle: true
        })
      }
    } else if (e.detail.value == 2){
      
    }
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    if (e.detail.value == 5){
      wx.switchTab({
        url: '/pages/merger/merger',
      })
      return 
    }

    this.setData({
      index: e.detail.value
    })
    var that = this
    wx.showLoading({
      title: '精彩马上呈现',
    })
    wx.cloud.callFunction({
      name: 'getPathways',
      data: {
        level: parseInt(e.detail.value) + 1
      },
      success: res => {
        console.log(res)
        that.setData({
          projects: res.result.data
        })
        wx.hideLoading()
      }
    })
  },

  onShareAppMessage: function (options) {
    return {
      title: '头马Pathways手册: 100+演讲进阶项目一站搞定', 
      // path: '/pages/pathways/desc/desc?level=' + options.level
      // imageUrl: '/images/pathwaysbookforward-min.jpeg'
    }
  },

  onShareTimeline: function (options) {
    return {
      title: '头马Pathways手册: 100+演讲进阶项目一站搞定', 
      // imageUrl: '/images/pathwaysbookforward-min.jpeg'
    }
  }
})
