// pages/tm/champ/champ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    champs: [
      {
        key: "2019",
        url: "https://mp.weixin.qq.com/s/AGXrq_DrbyQ-uEj4S0bX6g"
      },
      {
        key: "2018",
        url: "https://mp.weixin.qq.com/s/-5rl79r229hFzS8pTAURfA"
      },
      {
        key: "2017",
        url: "https://mp.weixin.qq.com/s/6v_uGIXsRfCfp8b16mlNAQ"
      },
      {
        key: "2016",
        url: "https://mp.weixin.qq.com/s/6v_uGIXsRfCfp8b16mlNAQ"
      },
      {
        key: "2015",
        url: "https://mp.weixin.qq.com/s/6v_uGIXsRfCfp8b16mlNAQ"
      },
      {
        key: "2014",
        url: "https://mp.weixin.qq.com/s/m9M1UIej3RBNDXMUK_Jrzw"
      },
      {
        key: "2013",
        url: "https://mp.weixin.qq.com/s/m9M1UIej3RBNDXMUK_Jrzw"
      },
      {
        key: "2012",
        url: "https://mp.weixin.qq.com/s/m9M1UIej3RBNDXMUK_Jrzw"
      },
      {
        key: "2011",
        url: "https://mp.weixin.qq.com/s/muU5wMvnddXP1HqmtbhMTA"
      },
      {
        key: "2010",
        url: "https://mp.weixin.qq.com/s/PLjhA9iHdAoplrXaV1TkbQ"
      },
      {
        key: "2009",
        url: "https://mp.weixin.qq.com/s/3bfJXJ4zpIV5S4tDdtIRvg"
      },
      {
        key: "2008",
        url: "https://mp.weixin.qq.com/s/Ag3k-VmnnJnfDHR5zkhSww"
      },
      {
        key: "2007",
        url: "https://mp.weixin.qq.com/s/CT8DyBIeHOpg30LGZ7e6aA"
      },
      {
        key: "2005",
        url: "https://mp.weixin.qq.com/s/MSCSvlnW1Gk-KociLQjprA"
      },
      {
        key: "2004",
        url: "https://mp.weixin.qq.com/s/Z4VtEDpCFfvc0BwH3AQA0w"
      },
      {
        key: "2003",
        url: "https://mp.weixin.qq.com/s/jKXAkRTUkwCnkLRU2yLwyw"
      },
      {
        key: "2002",
        url: "https://mp.weixin.qq.com/s/9qQdU_n8dr9GLK5IwdwA4Q"
      },
      {
        key: "2001",
        url: "https://mp.weixin.qq.com/s/2gAe9nuMtFn9E3-LjdL_qw"
      },
      {
        key: "1999",
        url: "https://mp.weixin.qq.com/s/_pu4u_YZGBoE1HNy0EujDQ"
      },
      {
        key: "1997",
        url: "https://mp.weixin.qq.com/s/Z8oWHGTsyjy2lsDkmSST3A"
      },
      {
        key: "1996",
        url: "https://mp.weixin.qq.com/s/96oEVIH9xWxl9_cbDH2XTw"
      },
      {
        key: "1995",
        url: "https://mp.weixin.qq.com/s/Kgxzk5LPBpZ71C_wgro_Qg"
      },
      {
        key: "1991",
        url: "https://mp.weixin.qq.com/s/Kq4Bw-CxWHUOGbJwrQkWcA"
      }
    ],
    jixing_champs: [
      {
        key: "1",
        url: "https://mp.weixin.qq.com/s/DAOjgsID2L8YCnRhNGnAbA"
      },
      {
        key: "2",
        url: "https://mp.weixin.qq.com/s/DszeVTHRLUIpaR_fuifQBQ"
      },
      {
        key: "3",
        url: "https://mp.weixin.qq.com/s/hy4VltLD_atgD4wAfPmQIg"
      },
      {
        key: "4",
        url: "https://mp.weixin.qq.com/s/Up64ZgPIrLoGuHZ7tNwsBQ"
      },
      {
        key: "5",
        url: "https://mp.weixin.qq.com/s/jN50eKmnLnNOrRxPdjgK8w"
      },
      {
        key: "6",
        url: "https://mp.weixin.qq.com/s/mbNfl8ps6DA-kAv8jL4FWA"
      },
      {
        key: "7",
        url: "https://mp.weixin.qq.com/s/0Ln11jGjykhzAR1QcvWEKg"
      },
      {
        key: "8",
        url: "https://mp.weixin.qq.com/s/40VJc3x8SvCUplpGBULpsA"
      },
      {
        key: "9",
        url: "https://mp.weixin.qq.com/s/MGY0Q4_eX4OghKssITmd0A"
      },
      {
        key: "10",
        url: "https://mp.weixin.qq.com/s/h8OOlmnt8WJWiTrgaTxWcA"
      },
      {
        key: "11",
        url: "https://mp.weixin.qq.com/s/ZEXQ0TL6iHrJ5O7pFEEOoQ"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })

    if(options.currentTab==1){
      this.setData({
        currentTab: 1
      })
    }
  },

  change: function(options) {
    this.setData({
      currentTab: options.currentTarget.dataset.id
    })
  },

  do_champ: function(options) {
    console.log(options.currentTarget.dataset.id)
    console.log(this.data.champs[options.currentTarget.dataset.id])
    wx.navigateTo({
      url: '/pages/testdb/testdb?src=' + this.data.champs[options.currentTarget.dataset.id]["url"],
    })
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
  onShareAppMessage: function (res) {
    return {
      title: '头马世界演讲冠军全集，赶紧收藏！',
      imageUrl: '/images/champ-min.png'
    }
  },

  onShareTimeline: function (res) {
    return {
      title: '头马世界演讲冠军全集，值得收藏！',
      imageUrl: '/images/champ-min.png'
    }
  }
})