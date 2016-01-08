$(window).on("load", function() {

    var minZoom = 0.5;
    var maxZoom = 4;

    // 画像のズーム設定
    var d3ZoomImg = d3.behavior.zoom().scaleExtent([minZoom, maxZoom]);
    d3.select("#img-box").call(d3ZoomImg.on("zoom", function () {
        zoomedImg(d3ZoomImg);
    }));
    
    // pdfのズーム設定
    var d3ZoomIFrame = d3.behavior.zoom().scaleExtent([minZoom, maxZoom]);
    d3.select("#pdf-box").call(d3ZoomIFrame.on("zoom", function () {
        zoomedIFrame(d3ZoomIFrame);
    }));

    // 初期化
    // d3ZoomImg.scale(1).translate([0, 0]);
    // d3ZoomIFrame.scale(1).translate([0, 0]);
    zoomedImg(d3ZoomImg);
    zoomedIFrame(d3ZoomIFrame);
});

function zoomedImg(d3ZoomImg) {
    var d = d3ZoomImg.translate();
    var s = d3ZoomImg.scale();
    var t = "translate(" + d[0] + 'px,' + d[1] + "px) scale(" + s + ")";
    $("#img-view").css({
        "transform-origin": "0 0",
        "transform": t
    });
}

function zoomedIFrame(d3ZoomIFrame) {
    var d = d3ZoomIFrame.translate();
    var s = d3ZoomIFrame.scale();
    var w = 800;
    var boxWidth = $("#pdf-box").width();
    var t = "translate(" + d[0] + 'px,' + d[1] + "px) scale(" + (boxWidth * s / w)  + ")";

    $("#pdf-view").css({
        "transform-origin": "0 0",
        "transform": t
    });
}
