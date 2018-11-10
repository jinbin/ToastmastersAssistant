// pages/map.js

const app = getApp()

Page({
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 30.2839508306,
      longitude: 120.1367318630,
      title: '西子双语演讲俱乐部',
      label: { 
        content: "点击进入导航页", 
        color: "#ff0000", 
        fontSize: 25,   
        borderRadius: "10", 
        padding: "20",       
        display:"ALWAYS" 
      }
    }],
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
    
  intoMap: function () {
      wx.openLocation({
        latitude: 30.2839508306,
        longitude: 120.1367318630,
        name: "西子双语演讲俱乐部",
        address: "文二路188号（文二路和教工路交叉口）浙江省团校内 浙江青年创业学院教学楼202室",
        scale: 28
      })
  },

  gps: function () {
    this.mapCtx.moveToLocation()
  },

  onShareAppMessage: function (options) {
    var text = "西子双语演讲俱乐部介绍"

    return {
      title: text,
      path: "/pages/map/map"
    }
  }
})