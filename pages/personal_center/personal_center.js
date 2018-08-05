Page({
    data: {
        head: "../../image/default-l.png",
        contract: "0.00",
        harvest: "0.00",
        join_count: 0,
        balance: "0.00"
    },
    to_personal_info: function() {
        wx.navigateTo({
            url: "../../pages/personal_info/personal_info"
        });
    },
    onLoad: function(a) {
        var t = this;
        wx.showNavigationBarLoading();
        var e = wx.getStorageSync("session_key");
        wx.getUserInfo({
            success: function(a) {
              console.log("userInfo:"+JSON.stringify(a));
                wx.request({
                    // url: "https://daka.55rd.com/index.php/api/wx/xcx_user_data_decrypt",
                  url:"http://localhost:8080/wx/decryUserData",
                    header: {
                      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    data: {
                        encrypted: a.encryptedData,
                        iv: a.iv,
                        session_key: e,
                        type: 1
                    },
                    method: "post",
                    success: function(a) {
                      console.log("response:" + a.data.data.user.name), wx.setStorageSync("logined", !0), a.data.data && (wx.setStorageSync("information", a.data.data.user), 
                        t.setData({
                            head: a.data.data.user.head_img,
                            name: a.data.data.user.name,
                            join_count: a.data.data.user.join_count,
                            contract: parseFloat(a.data.data.user.contract / 100).toFixed(2),
                            harvest: parseFloat(a.data.data.user.harvest / 100).toFixed(2)
                        }), wx.hideNavigationBarLoading()), 
                        wx.request({
                            // url: "https://daka.55rd.com/index.php/api/user/get_balance",
                        url:"http://localhost:8080/wx/getBalance",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                user_id: a.data.data.user.id,
                                token: a.data.data.user.token
                            },
                            method: "post",
                            success: function(a) {
                                t.setData({
                                    balance: parseFloat(.01 * a.data.balance).toFixed(2)
                                });
                            }
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    
    
    
    
    }
});