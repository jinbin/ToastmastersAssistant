var index = require("../../../data/index-list.js")
var util = require("../../../utils/util.js")
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
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
  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
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

    const db = wx.cloud.database({
      env: "tmassistant-5275ad"
    })

    db.collection('posts').orderBy('create_time', 'desc').get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.setData({
          posts: res.data
        })
      }
    })

    console.log("hello world")
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
  }
})
