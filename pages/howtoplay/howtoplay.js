Page({
    data: {
        url: "https://daka.55rd.com/index.php/how_to_play?id=1"
    },
    onLoad: function(t) {
        this.setData({
            url: "https://daka.55rd.com/index.php/how_to_play?id=" + t.id
        });
    }
});