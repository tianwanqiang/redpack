Page({
    data: {},
    onLoad: function(e) {
        setTimeout(function() {
            wx.reLaunch({
                url: "../../pages/home/home"
            });
        }, 2e3);
    }
});