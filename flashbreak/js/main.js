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
        this.$dom = $("<div class='star'></div>").css({
            "left": x + "px",
            "top": y + "px",
            "background-color": "rgb(" + R + "," + G + "," + B + ")",
            "border-radius": r / 2 + "px"
        });

        this.visible = false;
        this._r = r;
    }
    Star.prototype = {
        show: function () {
            var d = this.$dom;
            d.show();
            d.css({
                "width": "0px",
                "height": "0px"
            });
            d.animate({
                "width": this._r + "px",
                "height": this._r + "px"
            }, {
                duration: "fast",
                complete: function () {
                    
                }
            });

            this.visible = true;
        },
        hide: function (f) {
            if (this.visible) {
                var d = this.$dom;
                d.animate({
                    "width": "0px",
                    "height": "0px"
                }, {
                    duration: "fast",
                    complete: function () {
                        d.hide();
                        if(f) f();
                    }
                });
                
                this.visible = false;
            }
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
            this._ready(this.Level);
        },

        _ready: function (count) {
            if (count == 0) {
                this.stars.forEach(function (e, i) {
                    e.show();
                });
                this._playable = true;
            } else {
                if (count != this.Level) {
                    this.stars[count].hide();
                }
                this.stars[count - 1].show();
                
                var self = this;
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