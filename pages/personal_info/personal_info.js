getApp();

var e = wx.getStorageSync("information"), a = " ", t = " ", o = !1;

Page({
    data: {
        head: "../../image/default-l.png"
    },
    onLoad: function() {
        var e = this;
        wx.showNavigationBarLoading();
        var t = wx.getStorageSync("session_key");
        wx.getUserInfo({
            success: function(o) {
                wx.request({
                    url: "https://daka.55rd.com/index.php/api/wx/xcx_user_data_decrypt",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        encrypted: o.encryptedData,
                        iv: o.iv,
                        session_key: t,
                        type: 1
                    },
                    method: "post",
                    success: function(t) {
                        console.log(t), t.data.data && (a = t.data.data.user.name, e.setData({
                            head: t.data.data.user.head_img,
                            name: t.data.data.user.name,
                            phone: t.data.data.user.phone
                        }), wx.hideNavigationBarLoading());
                    }
                });
            }
        });
    },
    getPhoneNumber: function(a) {
        var t = this, o = wx.getStorageSync("session_key");
        console.log(a), "getPhoneNumber:fail user deny" == a.detail.errMsg ? wx.openSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        console.log(e), t.onLoad();
                    }
                });
            },
            fail: function(e) {
                console.log(e);
            }
        }) : wx.request({
            url: "https://daka.55rd.com/index.php/api/wx/xcx_user_data_decrypt",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                encrypted: a.detail.encryptedData,
                iv: a.detail.iv,
                session_key: o,
                type: 2,
                user_id: e.id
            },
            method: "post",
            success: function(e) {
                console.log(e), 200 == e.statusCode && e.data.data && t.setData({
                    phone: e.data.data.user.phone
                }), t.onLoad();
            }
        });
    },
    bindbank: function() {
        wx.showModal({
            title: "目前小程序不支持提现绑定，请下载APP进行绑定",
            content: "是否去下载APP",
            confirmText: "确认下载",
            success: function(e) {
                e.confirm ? wx.navigateTo({
                    url: "../../pages/DownloadApp/DownloadApp"
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    nickname: function(e) {
        a = e.detail.value, o = " " != a;
    },
    chooseImage: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var n = a.tempFilePaths[0];
                t = n, o = !0, console.log(t), e.setData({
                    head: n
                });
            },
            fail: function() {
                o = !1;
            }
        });
    },
    updata: function() {
        var n = this;
        1 == o ? (wx.uploadFile({
            url: "https://daka.55rd.com/index.php/api/user/edit",
            filePath: t,
            name: "head_img",
            formData: {
                user_id: e.id,
                token: e.token
            },
            header: {
                "content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                e.data;
                console.log(e.data), n.onLoad();
            }
        }), wx.request({
            url: "https://daka.55rd.com/index.php/api/user/edit",
            data: {
                user_id: e.id,
                token: e.token,
                name: a
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e), wx.showToast({
                    title: "保存成功"
                }), n.onLoad();
            }
        })) : wx.showToast({
            title: "无可修改信息",
            icon: "none"
        });
    }
});