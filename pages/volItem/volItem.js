// import api from '../../api/api.js'
import util from '../../utils/util.js'

const app = getApp()
//var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage

Page({
  data: {
    vols: app.jokes,
    current: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 10,
    duration: 5,
    previousMargin: 0,
    nextMargin: 0,

    xmad: {
      adData: {},
      ad: {
        banner: "xm6af34a1b995dc4d57ed465e5a576ed",
        insert: "xm89372fed7b9637bab41fb1b2357db4",
        fixed: "xm11a2174a683e4417c95daa9bd0ad9a"
      }
    },
  },

  onLoad: function (e) {
    // this.setData({
    //   vols: app.vols_pws
    // })
    // api.getVolIdList({
    //   success: (res) => {
    //     if (res.data.res === 0) {
    //       let idList = res.data.data
    //       this.getVols(idList)
    //     }
    //   }
    // })
  },
  
  getVols: function (idList) {
    let vols = this.data.vols

    if (idList.length > 0) {
      api.getVolById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let vol = res.data.data

            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            vols.push(vol)
          }
          this.getVols(idList)
        }
      })
    } else {
      this.setData({ vols })
    }
  },

  handleChange: function (e) {
    let current = e.detail.current
    let volsLength = this.data.vols.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: '../history/history?page=index',
        success: () => {
          this.setData({
            current: volsLength - 1
          })
        }
      })
    }
  },

  saveOfficialQRCode: function (){
    util.saveOfficialQRCode("")
  },

  onShareAppMessage: function () {
    return {
      title: 'Toastmasters是什么? 头马助手带你玩转头马',
      imageUrl: '/images/whytm.jpg'
    }
  }
})
