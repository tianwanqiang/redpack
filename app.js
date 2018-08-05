App({
    onLaunch: function() {
        (wx.getStorageSync("logs") || []).unshift(Date.now()), wx.setStorageSync("bgImg", " "), 
        wx.login({
            success: function(e) {
                if (e.code) {
                    var o = e.code;
                    wx.request({
                        url: "http://www.mikiyun.com:8080/wx/login",
                        header: {
                            "content-type":"application/x-www-form-urlencoded"
                        },
                        data: {
                            code: o
                        },
                        method: "post",
                        success: function(e) {
                            var o = e.data.data.session_key;
                            wx.setStorageSync("session_key", o), 
                              console.log("设置session_key:"+o);
                        }
                    });
                } else console.log(e.errMsg);
            },
            fail:function(e){
              console.log("login 失败====="+JSON.stringify(e));
            }
        });
    },
    globalData: {
        userInfo: null
    },
   
});