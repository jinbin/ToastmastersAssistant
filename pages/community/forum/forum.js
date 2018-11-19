var index = require("../../../data/index-list.js")
var util = require("../../../utils/util.js")
//index.js
//获取应用实例
var app = getApp()
var sliderWidth = 96; 

Page({
  data: {
    tabs: ["活动通知", "动态", "私藏"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    articles: [],
    pageIndex: 1,
    pageSize: 2,
    audioIcon: "http://i.pengxun.cn/content/images/voice/voiceplaying.png",
    css: {
      "bankuaiSelected": ""
    },
    typeList: [],
    currentTypeId: 0,
    hot: 0,
    scrollLeft: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (options) {

    if (options.activeIndex in [0,1,2]){
      this.setData({
        activeIndex: options.activeIndex
      })
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  tabClick: function (e) {
    console.log(this.data.activeIndex)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  onShow: function () {
    var that = this

    const db = wx.cloud.database({
      env: "tmassistant-5275ad"
    })

    // db.collection("information").doc('pageViewNum').update({
    //   data: {
    //     value: 105
    //   }
    // })

    // //读取pageViewNum
    // db.collection("information").doc('pageViewNum').get({
    //   success: function (res) {
    //     console.log(res.data["value"] + 1)
    //     this.setData({
    //       pageViewNum: res.data["value"] + 1
    //     })
    //     db.collection("information").doc('pageViewNum').update({
    //       data: {
    //         value: pres.data["value"] + 1
    //       },
    //       success: function (res) {
    //         console.log("finish update")
    //       }
    //     })
    //   }
    // })


    // console.log("ssssssss")
    // console.log(that.data.pageViewNum)
    // db.collection("information").doc('pageViewNum').update({
    //   data: {
    //     value: that.data.pageViewNum + 1
    //   },
    //   success: function (res) {
    //     console.log("update")
    //     console.log(res.data)
    //     that.setData({
    //       pageViewNum: that.data.pageViewNum + 1
    //     })
    //   }
    // })

    db.collection("information").doc('pageViewNum').get({
      success: function (res) {
        // this.setData({
        //   pageViewNum: res.data["value"]
        // })
        console.log("after")
        console.log(res.data["value"])
      }
    })

    // var pageViewNum = 

    // db.collection('information').doc('').update({
    //   // data 传入需要局部更新的数据
    //   data: {
    //     // 表示将 done 字段置为 true
    //     done: true
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })

    console.log(this.data.hasUserInfo)

    wx.getSetting({
      success(res) {
        console.log("success")
        if (res.authSetting['scope.userInfo'])  {
          console.log("hasUserInfo")
          that.setData({
            hasUserInfo: true
          })
        }else{
          console.log("!hasUserInfo")
          that.setData({
            hasUserInfo: false
          })
        }
      }
    })

    db.collection('posts').where({
      isOpen: "open",
    }).orderBy('create_time', 'desc').get({
      success: function (res) {
        // res.data 包含该记录的数据

        //时间转换CST时间
        for (var index in res.data){
          res.data[index]["create_time"] = res.data[index]["create_time"].toLocaleDateString() + " " + res.data[index]["create_time"].toLocaleTimeString()
        }

        that.setData({
          posts: res.data
        })
      }
    })

    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        db.collection('posts').where({
          isOpen: "private",
          _openid: res.result.openid,
        }).orderBy('create_time', 'desc').get({
          success: function (res) {
            // res.data 包含该记录的数据

            //时间转换CST时间
            for (var index in res.data) {
              res.data[index]["create_time"] = res.data[index]["create_time"].toLocaleDateString() + " " + res.data[index]["create_time"].toLocaleTimeString()
            }

            that.setData({
              private_posts: res.data
            })
          }
        })
      }
    })

    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        db.collection('posts').where({
          isOpen: "activity",
          // _openid: res.result.openid,
        }).orderBy('create_time', 'desc').get({
          success: function (res) {
            // res.data 包含该记录的数据

            //时间转换CST时间
            for (var index in res.data) {
              res.data[index]["create_time"] = res.data[index]["create_time"].toLocaleDateString() + " " + res.data[index]["create_time"].toLocaleTimeString()
            }

            that.setData({
              activity_posts: res.data
            })
          }
        })
      }
    })

    //console.log(this.data.hasUserInfo)
    this.ready()
  },

  bindGetUserInfo: function(e){
    console.log(e.detail.userInfo)
    if(e.detail.userInfo){
      this.setData({
        hasUserInfo: true
      })
    }
  },

  post: function(){
    console.log("post")
    wx.navigateTo({
      url: "/pages/community/post/post",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 加载数据
  ready: function () {
    console.log("ready: 获取初始数值");
    console.log("ready: " + index);
    this.setData({
      articles: index.articles.slice(0, 10),
      typeList: index.typeList
    })
    console.log("ready " + this.data.articles);
  },
  moreArticle: function (event) {
    console.log("moreArticle: 加载更多");
    console.log("moreArticle: pageIndex: " + event.currentTarget.dataset.pageIndex);
    wx.showNavigationBarLoading();
    var first = (this.data.pageIndex) * this.data.pageSize;
    this.getArticle(first);
  },
  getArticle: function (first) {
    console.info(first);
    if ((first == "undefined") || (first == null)) {
      first = 1;
    }
    if (first > index.articles.length) {
      wx.hideNavigationBarLoading();
      return
    }
    var end = first + this.data.pageSize;
    if (end > index.articles.length) {
      end = index.articles.length;
    }
    var newArticle = index.articles.slice(first, end);
    this.setData({
      articles: this.data.articles.concat(newArticle),
      pageIndex: parseInt(this.data.pageIndex) + 1
    });
    wx.hideNavigationBarLoading();
  },
  // 点击版块跳转
  toBankuai: function (event) {
    console.log("点击版块跳转");
    console.log(event);
    var typeId = event.currentTarget.dataset.typeid;
    var hot = event.currentTarget.dataset.hot;
    if (hot) {
      typeId = 0;
      hot = 1;
    } else {
      typeId = typeId;
      hot = 0;
    }
    console.log(this.data.currentTypeId);
    console.log(this.data.hot);
    this.setData({
      articles: this.data.articles,
      currentTypeId: typeId,
      hot: hot
    });
  },
  // 展开箭头 举报
  openArrow: function (event) {
    console.info("openArrow: ");
    var user = event.currentTarget.dataset.userId;
    console.log(user)
    wx.showActionSheet({
      itemList: ["举报", "取消"],
      success: function (res) {
        if (res.tapIndex == 0) {
          // 举报
          console.info("举报");
          util.tipOff(user);
        }
      }
    });
  },
  // 播放声音
  playAudio: function (event) {
    console.info("播放声音");
    var voiceId = event.currentTarget.dataset.vId;
    console.info(voiceId);
    var storageVoice = app.globalData.voice;
    var audioContext = wx.createAudioContext(voiceId + "");
    // 获取正在播放的内容
    if (typeof storageVoice == "undefined" || storageVoice == "" || storageVoice == null) {
      // 当前未播放
      audioContext.play();
      storageVoice = new Object();
      storageVoice.id = voiceId;
      storageVoice.status = 2;
    } else if (storageVoice.id == voiceId) {
      // 暂定状态
      if (storageVoice.status == 1) {
        audioContext.play();
        storageVoice.status = 2;
      } else
        // 播放状态 - 转为暂停
        if (storageVoice.status == 2) {
          audioContext.pause();
          storageVoice.status = 1;
        }
    } else {
      // 停止当前的，播放另一个
      var usingAudioContext = wx.createAudioContext(storageVoice.id + "")
      usingAudioContext.seek(0);
      usingAudioContext.pause();
      storageVoice = new Object();
      storageVoice.id = voiceId;
      storageVoice.status = 2;
      audioContext.play();
    }
    app.setGlobalData({
      voice: storageVoice
    })

  },
  // 更多版块
  moreType: function (event) {
    var that = this;
    var types = app.globalData.types;
    console.log(event);
    if (typeof types == "undefined") {
      return;
    }
    var typeIds = [];
    var typeNames = [];
    for (var i = 0; i < types.length; i++) {
      typeIds[i] = types[i].ArticleTypeID;
      typeNames[i] = types[i].ArticleTypeName;
    }
    wx.showActionSheet({
      itemList: typeNames,
      success: function (res) {
        if (res.cancel) {
          console.log("取消");
        } else {
          // 获取新的内容
          var idx = res.tapIndex;
          var typeId = typeIds[idx];
          that.typeChange(typeId);
        }
      }
    })
  },
  // 切换版块
  typeChange: function (typeId) {
    var that = this;
    var pn = 1;
    var h = 0;
    var hongbao = "";
    var rspan = 1;
    app.getMoreArticle(pn, typeId, h, hongbao, rspan, function (res) {
      var articleList = res.ArtList;
      that.data.articles = that.data.articles(articleList);
    })
    var tmp = this.data.typeList;
    var typeList = tmp;
    for (var i = 0; i < typeList.length; i++) {
      if (typeList[i].ArticleTypeID == typeId) {
        var tmpType = {
          ArticleTypeID: typeId,
          ArticleTypeName: typeList[i].ArticleTypeName
        }
        typeList.splice(i, 1);
        typeList.splice(1, 0, tmpType);
      }
    }
    that.setData({
      currentTypeId: typeId,
      typeList: typeList,
      scrollLeft: -900
    })
    console.log(this.data.currentTypeId);
  },

  toMiniProgram: function (e) {
    console.log("toMiniProgram")
    wx.navigateToMiniProgram({
      appId: 'wx09a49d05a365a4e6',
      path: "pages/my/leftdays/leftdays",
      // envVersion: 'trial',
      success(res) {
        console.log("SUCCESS")
      }
    })
  },

  imgPre: function (e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current], // 需要预览的图片http链接列表
    })
  },

  onShareAppMessage: function (options) {
    console.log(app.globalData.userInfo)
    var text
    var path
    //"活动通知":0, "动态":1, "私藏":2
    if (this.data.activeIndex == 0){
      text = app.globalData.userInfo.nickName + "邀请你来头马社区查看最新活动信息"
      path = "pages/community/forum/forum?activeIndex=0"
    } else {
      text = app.globalData.userInfo.nickName + "邀请你来头马社区围观讨论"
      path = "pages/community/forum/forum?activeIndex=" + this.data.activeIndex
    }

    return {
      path: path,
      title: text
    }
  }
})
