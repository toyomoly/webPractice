/* メイン */
$(function () {

    var $body = $(document.body);
    var $starArea = $("#starArea");
    var $resultArea = $("#resultArea");
    var $startButton = $("#startButton");
    var $retryButton = $("#retryButton");

    var Star = function () {
        var x = Math.floor(Math.random() * 600);
        var y = Math.floor(Math.random() * 600);
        var r = Math.floor(Math.random() * 100) + 100;
        var R = Math.floor(Math.random() * 200) + 50;
        var G = Math.floor(Math.random() * 200) + 50;
        var B = Math.floor(Math.random() * 200) + 50;
        this.$dom = $("<div class='star'>●</div>").css({
            "left": x + "px",
            "top": y + "px",
            "width": r + "px",
            "height": r + "px",
            "line-height": r + "px",
            "font-size": r + "px",
            "color": "rgb(" + R + "," + G + "," + B + ")"
        }).append($("<div class='num'>" + Math.floor(Math.random() * 10) + "</div>"));

        this.visible = false;
        this._r = r;
    }
    Star.prototype = {
        show: function () {
            this.$dom.addClass("show");
            this.visible = true;
        },
        hide: function (f) {
            this.$dom.removeClass("show");
            this.visible = false;
        },
        remove: function () {
            var d = this.$dom;
            this.hide(function () {
                d.remove();
            });
        }
    }

    StarManager = {

        Level: 2,
        stars: [],
        _playable: false,

        init: function () {
            var self = this;
            $body.on("tap", ".star", function () {
                var stars = self.stars;
                if (!self._playable) return;
                if (stars[stars.length - 1].$dom.get(0) == this) {
                    stars.pop().remove();
                    if (stars.length == 0) {
                        self._playable = false;
                        self.Level++;
                        $resultArea.html("成功！<br />次は Level " + self.Level + " です").show();
                        $startButton.show();
                    }
                } else {
                    self._playable = false;
                    $resultArea.html("失敗しました！<br />Level " + self.Level + " でした").show();
                    $retryButton.show();
                }
            });
        },

        _createStars: function (count) {
            this.stars = [];
            $starArea.empty();
            for (var i=0; i<count; i++) {
                var s = new Star();
                this.stars.push(s);
                $starArea.append(s.$dom);
            }
        },

        start: function () {
            this._createStars(this.Level);
            var self = this;
            setTimeout(function () {
                self._ready(self.Level);
            }, 300);
        },

        _ready: function (count) {
            var self = this;
            if (count != this.Level) {
                this.stars[count].hide();
            }
            
            if (count == 0) {
                
                setTimeout(function () {
                    self.stars.forEach(function (e, i) {
                        e.show();
                    });
                    self._playable = true;
                }, 500);
            } else {
                this.stars[count - 1].show();
                
                setTimeout(function () {
                    self._ready(count - 1);
                }, 800);
            }
        }
    }

    StarManager.init();
    
    $resultArea.hide();
    $retryButton.hide();
    
    $startButton.on("tap", function () {
        StarManager.start();
        $resultArea.hide();
        $startButton.hide();
    });
    
    $retryButton.on("tap", function () {
        StarManager.Level = 2;
        StarManager.start();
        $resultArea.hide();
        $retryButton.hide();
    });
    
    //alert("time break");
});