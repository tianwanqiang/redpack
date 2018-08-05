var t, a, e, o, n, s, i, c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, d = wx.getStorageSync("information"), r = null, l = " ", u = "", p = [], g = !1, w = 1, h = 0, f = null, _ = null, m = !1, user_join_status = 0, is_information_get = !1, v = !1;

Page({
  data: {
    total_money: 0,
    or: "../../image/safety/choose.png",
    or1: "../../image/safety/not_choose.png",
    balance: "0.00",
    rank: "none",
    hint: "参与打卡挑战"
  },
  onLoad: function (t) {
    var a = this;
    wx.showNavigationBarLoading(), wx.showLoading({
      title: "加载中..."
    }), wx.getSystemInfo({
      success: function (t) {
        a.setData({
          h: t.windowWidth - 40
        });
      }
    }), t.project_id ? (w = t.project_id, wx.setStorageSync("project_id", w), a.showpage()) : (w = 1,
      wx.setStorageSync("project_id", w), a.showpage()), p = [];
  },
  showpage: function () {
    0 == v && wx.getUserInfo({
      success: function (t) {
        var a = wx.getStorageSync("session_key");
        wx.request({
          url: "http://localhost:8080/wx/decryUserData",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            encrypted: t.encryptedData,
            iv: t.iv,
            session_key: a,
            type: 1
          },
          method: "post",
          success: function (t) {
            200 == t.statusCode && (v = !0, null != t.data.data && wx.setStorageSync("information", t.data.data.user), console.log("information" + wx.getStorageSync("information")),
              p.showpage());
          },
          fail: function (t) {
            // console.log(t);
          }
        });
      },
      fail: function (t) {
        console.log("home.js getUserInfo fail 58L===>" + JSON.stringify(t));
      }
    }), d = wx.getStorageSync("information");
    var p = this;
    clearInterval(f), clearInterval(_), f = null, _ = null, "string" == typeof d ? (console.log("不存在id,token"), is_information_get = !1,
     wx.request({
        url: "http://localhost:8080/index/index",
        data: {
          project_id: w
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (a) {
          if (wx.hideNavigationBarLoading(), r = a.data.data.head_imgs,
            200 == a.statusCode) {
            var e = a.data.data.content_json.content, o = e.substring(0, 3), n = e.substring(10, e.length);
            u = a.data.data.content_json.how_to_play, i = a.data.data.current_time, t = a.data.data.join_amount / 100;
            var s = (a.data.data.total_count * t).toString();
            s = p.hh(s), p.setData({
              str1: o,
              str2: n,
              rank: 0 == a.data.data.tags.length ? "none" : "block",
              data: a.data.data,
              total_money: s,
              hint: "支付" + a.data.data.join_amount / 100 + "元参与" + a.data.data.content_json.title
            }), wx.hideLoading();
          }
        }
      })) : "object" == (void 0 === d ? "undefined" : c(d)) && (is_information_get = !0, console.log("存在id,token"),
        a = d.id, e = d.token, wx.request({
          url: "http://localhost:8080/index/index",
          data: {
            user_id: a,
            token: e,
            project_id: w
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (a) {
            if (wx.hideNavigationBarLoading(), r = a.data.data.head_img, 200 == a.statusCode) {
              console.log("get index ok");
                u = a.data.data.content_json.how_to_play,
                user_join_status = a.data.data.user_join_status,
                o = a.data.data.date,
                s = a.data.data.start_time,
                n = a.data.data.end_time,
                i = a.data.data.current_time;
               var e = a.data.data.content_json.content,
                c = e.substring(0, 3),
                d = e.substring(10, e.length);
                l = a.data.data.content_json.title,
                t = a.data.data.join_amount / 100;
              var g = (a.data.data.total_count * t).toString();
              g = p.hh(g),
               p.setData({ str1: c, str2: d, rank: 0 == a.data.data.tags.length ? "none" : "block",
                data: a.data.data,  total_money: g,  datelist: o
              }), wx.hideLoading(),  1 == a.data.data.user_join_status ? p.calculate_time() :
                  0 == a.data.data.user_join_status ? p.setData({
                    hint: "支付" + a.data.data.join_amount / 100 + "元参与" + a.data.data.content_json.title
                  }) : 2 != user_join_status && 3 != user_join_status || p.setData({
                    hint: "支付" + a.data.data.join_amount / 100 + "元参与" + a.data.data.content_json.title
                  });
            }
          }
        }), wx.request({
          url: "https://daka.55rd.com/index.php/api/user/get_balance",
          data: {
            user_id: d.id,
            token: d.token
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (t) {
            200 == t.statusCode && p.setData({
              balance: parseFloat(t.data.data.balance / 100).toFixed(2)
            });
          }
        }));
  },
  wxpay: function() {
    var t = this;
    if(1==is_information_get){
      //拿到用户信息
      if(0==user_join_status){
        //用户没有加入打卡挑战
        wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#b2b2b2"
        })
         t.setData({
          is_block: !0,
          is_show: !0
        })
      }else if(1==user_join_status){
        //用户加入打卡计划，计算时间
        if(1==m){
          console.log("以参与挑战，打卡时间到");
          wx.request({
            url: "https://daka.55rd.com/index.php/api/project/sign",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              user_id: d.id,
              token: d.token,
              project_id: w,
              date: o
            },
            method: "post",
            success: function (a) {
              wx.showToast({
                title: "打卡成功"
              }), 
              clearInterval(_),
              m = !1, 
              user_join_status = 1, 
              t.showpage();
            }
          })
        }else{
          console.log("已参与挑战,但打卡时间还未到");
        }
      }
    }else{
      console.log("没有获取用户信息");
      t.showpage();
    }
    // 1 == is_information_get ? 0 == user_join_status ? (wx.setNavigationBarColor({
    //   frontColor: "#ffffff",
    //   backgroundColor: "#b2b2b2"
    // }), t.setData({
    //   is_block: !0,
    //   is_show: !0
    // })) : 1 == user_join_status && (console.log("user_join_status == 1"),
    //   1 == m ? (console.log("已参与挑战,打卡时间到"), wx.request({
    //     url: "https://daka.55rd.com/index.php/api/project/sign",
    //     header: {
    //       "content-type": "application/x-www-form-urlencoded"
    //     },
    //     data: {
    //       user_id: d.id,
    //       token: d.token,
    //       project_id: w,
    //       date: o
    //     },
    //     method: "post",
    //     success: function (a) {
    //       console.log(a), wx.showToast({
    //         title: "打卡成功"
    //       }), clearInterval(_), m = !1, user_join_status = 1, t.showpage();
    //     }
    //   })) : console.log("已参与挑战,但打卡时间还未到")) : t.showpage();
  },
  choose_payway: function (t) {
    var a = t.currentTarget.dataset.index;
    0 == a ? (h = 0, this.setData({
      or1: "../../image/safety/not_choose.png",
      or: "../../image/safety/choose.png"
    })) : 1 == a && (h = 1, this.setData({
      or: "../../image/safety/not_choose.png",
      or1: "../../image/safety/choose.png"
    }));
  },
  challenge: function () {
    var t = this;
    if (0 == h) {
      var o = wx.getStorageSync("information");
      wx.request({
        url: "https://daka.55rd.com/index.php/api/wx/signature",
        data: {
          user_id: o.id,
          token: o.token,
          project_id: w,
          type: 1,
          openid: o.openid,
          miniapp: 1
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (o) {
          console.log(o), 200 == o.statusCode ? wx.requestPayment({
            timeStamp: o.data.data.timeStamp,
            nonceStr: o.data.data.nonceStr,
            package: o.data.data.package,
            signType: "MD5",
            paySign: o.data.data.paySign,
            success: function (o) {
              wx.request({
                url: "https://daka.55rd.com/index.php/api/index/index",
                data: {
                  user_id: a,
                  token: e,
                  project_id: w
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function (t) {
                  i = t.data.data.current_time;
                }
              }), wx.showToast({
                title: "支付成功"
              }), t.calculate_time(), t.cancle();
            },
            fail: function (t) {
              console.log(t);
            }
          }) : wx.showToast({
            title: "功能待完善",
            icon: "none"
          });
        }
      });
    } else if (1 == h) {
      wx.getStorageSync("information");
      wx.request({
        url: "https://daka.55rd.com/index.php/api/balance/balance_pay",
        data: {
          user_id: a,
          token: e,
          project_id: w
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (o) {
          console.log(o), 200 == o.statusCode && (200 == o.data.ret ? (wx.request({
            url: "https://daka.55rd.com/index.php/api/index/index",
            data: {
              user_id: a,
              token: e,
              project_id: w
            },
            header: {
              "content-type": "application/user_join_status-www-form-urlencoded"
            },
            method: "POST",
            success: function (t) {
              i = t.data.data.current_time;
            }
          }), wx.showToast({
            title: "支付成功"
          }), t.calculate_time(), t.cancle(), t.showpage()) : 201 == o.data.ret ? wx.showModal({
            title: "",
            content: "余额不足，请充值",
            confirmText: "去充值",
            success: function (a) {
              a.confirm ? (console.log("去充值"), wx.navigateTo({
                url: "../../pages/Recharge/Recharge"
              }), t.cancle()) : a.cancel && console.log("取消");
            }
          }) : wx.showModal({
            title: "提示",
            content: o.data.msg,
            showCancel: !1
          }));
        }
      });
    }
  },
  calculate_time: function () {
    var t = this;
    o = o.replace(/(-)/g, "/"), i = i.replace(/(-)/g, "/");
    var a = new Date(i).getTime(),//当前x他时间
     e = new Date(o + " " + s).getTime();//打卡开始时间
    f = setInterval(function () {
      if (a += 1e3, t.calculate_fn(e, a), a == e) {
        clearInterval(f), f = null, m = !0, function () {
          var a = 0, e = 0, 
          i = new Date(o + " " + s).getTime(), 
          c = new Date(o + " " + n).getTime();
          e = c - i, _ = setInterval(function () {
            a++ , console.log(a), a > e && (m = !1, clearInterval(_), t.showpage());
          }, 1e3);
        }(), t.setData({
          hint: "点击打卡"
        });
      }
    }, 1e3);
  },
  calculate_fn: function (t, a) {
    function e(t) {
      return t < 10 && (t < 0 && (t = 0), t = "0" + t), t;
    }
    var o = this, n = t - a,
      s = parseInt(n / 1e3 / 60 / 60 / 24, 10),
      i = parseInt(n / 1e3 / 60 / 60 % 24, 10),
      c = parseInt(n / 1e3 / 60 % 60, 10),
      d = parseInt(n / 1e3 % 60, 10);
     s = e(s);
    var r = (i = e(i)) + ":" + (c = e(c)) + ":" + (d = e(d));
    if (parseInt(s) <= 0 && parseInt(i) <= 0 && parseInt(c) <= 0 && parseInt(d) <= 0) {
      console.log("打卡时间段");
      m = !0;
      clearInterval(f);
      f = null;
      o.setData({ hint: "点击打卡" });
    } else {
      o.setData({
        hint:"打卡倒计时"+r
      });
    }
  },
  turn_to: function (e) {
      wx.navigateTo({
        url: '../../pages/personal_center/personal_center',
      })
    //   // wx.getUserInfo({
    //   //     success: function(t) {
    //   //         console.log("success,"+t), wx.navigateTo({
    //   //             url: "../../pages/personal_center/personal_center"
    //   //         });
    //   //     },
    //   //     fail: function(t) {
    //   //         console.log("failed"+t);
    //   //         wx.showModal({
    //   //           title: '警告',
    //   //           content: '尚未进行授权，请授权',
    //   //           success:function(e){
    //   //             if(e.confirm){

    //   //             }
    //   //           }
    //   //         })
    //   //         // wx.openSetting({
    //   //         //     success: function(t) {
    //   //         //         t.authSetting["scope.userInfo"] && wx.getUserInfo({
    //   //         //             success: function(t) {
    //   //         //                 console.log(t), wx.navigateTo({
    //   //         //                     url: "../../pages/personal_center/personal_center"
    //   //         //                 });
    //   //         //             }
    //   //         //         });
    //   //         //     },
    //   //         //     fail: function(t) {
    //   //         //         console.log(t);
    //   //         //     }
    //   //         // });
    //   //     }
    //   // });
  },
  turn_to_item: function () {
    wx.navigateTo({
      url: "../../pages/active/active"
    });
  },
  cancle: function () {
    wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#ffffff"
    }), g = !1, this.setData({
      is_block: g,
      qrcode: !1,
      share: !1,
      is_show: !1
    });
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(), this.showpage(), wx.stopPullDownRefresh();
  },
  hh: function (t) {
    var a11 = /\./.test(t) ? t.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,") : t.replace(/\d(?=(\d{3})+$)/g, "$&,");
    return a11;
  },
  onShareAppMessage: function () {
    return {
      title: "和我一起来瓜分万元现金",
      path: "/pages/home/home"
    };
  },
  howtoplay: function () {
    console.log(u), console.log("project_id: " + w), wx.navigateTo({
      url: "../../pages/howtoplay/howtoplay?id=" + w
    });
  },
  downloadApp: function () {
    wx.navigateTo({
      url: "../../pages/DownloadApp/DownloadApp"
    });
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.userInfo);
    console.log(e.detail.rawData);
  },
});