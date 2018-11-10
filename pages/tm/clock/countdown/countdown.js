
const app = getApp()

var timer

Page({
  data: {
    hour: 0,
    min: 0,
    sec: 0
  },

  onLoad: function (options) {
    if(options.time){
      this.setData({
        time: options.time,
        hour: 0,
        min: options.time,
        sec: 0
      })
    }else{
      this.setData({
        time: 3,
        hour: 0,
        min: 3,
        sec: 0
      })
    }

    this.setData({
      xhour: zeroFill(this.data.hour, 2),
      xmin: zeroFill(this.data.min, 2),
      xsec: zeroFill(this.data.sec, 2),
    })

  },

  // 自定义的开始按钮
  startBtn: function() {
    console.log("开始按钮");
    Countdown(this);
  },

  // 自定义的暂停按钮  
  pauseBtn: function () {
    console.log("暂停按钮");
    clearTimeout(timer);
  },

  // 重新开始
  resetBtn: function() {
    clearTimeout(timer);
    console.log("Reset");
    this.setData({
      hour: 0,
      min: this.data.time,
      sec: 0
    })

    this.setData({
      xhour: zeroFill(this.data.hour, 2),
      xmin: zeroFill(this.data.min, 2),
      xsec: zeroFill(this.data.sec, 2),
    })
  }

})

// 倒计时
function Countdown(pointer) {
  timer = setTimeout(function () {
    pointer.data.sec = pointer.data.sec - 1
    if (pointer.data.sec < 0){
      if (pointer.data.min == 2){
        pointer.setData({
          color: "green"
        })
        wx.vibrateLong()
      } else if (pointer.data.min == 1){
        pointer.setData({
          color: "yellow"
        })
        wx.vibrateLong()
      }
      if (pointer.data.min != 0){
        pointer.data.sec = 59
        pointer.data.min = pointer.data.min - 1
        pointer.setData({
          xhour: zeroFill(pointer.data.hour, 2),
          xmin: zeroFill(pointer.data.min, 2),
          xsec: zeroFill(pointer.data.sec, 2),
        })
        Countdown(pointer);
      }else{
        console.log("完成")
        pointer.setData({
          color: ""
        })
        wx.vibrateLong()
      }
    }else{
      if (pointer.data.sec == 15 && pointer.data.min == 0){
        pointer.setData({
          color: "red"
        })
      }
      pointer.setData({
        xhour: zeroFill(pointer.data.hour,2),
        xmin: zeroFill(pointer.data.min, 2),
        xsec: zeroFill(pointer.data.sec, 2),
      })
      Countdown(pointer);
    }
  }, 1000);
}

function zeroFill(str, n){
  //补零方法，str为数字字符串 n为需要的位数，不够补零
  if (str.toString().length < n) {
    str = '0' + str
  }
  return str
}



