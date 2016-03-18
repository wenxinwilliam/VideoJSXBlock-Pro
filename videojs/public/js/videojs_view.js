/* Javascript for videojsXBlock. */
var urls = new Array();
var players = new Array();

function videojsXBlockInitView(runtime, element) {
    /* Weird behaviour :
     * In the LMS, element is the DOM container.
     * In the CMS, element is the jQuery object associated*
     * So here I make sure element is the jQuery object */
    if (element.innerHTML) element = $(element);

    //urls.push(runtime.handlerUrl(element, 'tracking_log'));
    var handlerUrl = runtime.handlerUrl(element, 'tracking_log');

    var previousTime = 0;
    var currentTime = 0;

    var video = element.find('video');
    for (var i = 0; i < video.size(); i++) {
        videojs(video.get(i), {playbackRates: [0.75, 1, 1.25, 1.5, 1.75, 2]}, function () {
            players[this.id()] = handlerUrl;
            console.log(players);
            this.on('timeupdate', function () {
                previousTime = currentTime;
                currentTime = this.currentTime();
                if (this.seeking()) {//Math.round()
                    var msg = "{'id':'" + get_xblock_id(players[this.id()]) + "','old_time':" + previousTime + ",'new_time':" + currentTime + ",'type':'onSlideSeek','code':'html5'}";
                    send_msg(players[this.id()], msg, 'seek_video');
                }
            });
            this.on('pause', function () {
                var msg = "{'id':'" + get_xblock_id(players[this.id()]) + "','currentTime':" + currentTime + ",'code':'html5'}";
                send_msg(players[this.id()], msg, 'pause_video');
            });
            this.on('play', function () {
                var msg = "{'id':'" + get_xblock_id(players[this.id()]) + "','currentTime':" + currentTime + ",'code':'html5'}";
                send_msg(players[this.id()], msg, 'play_video')
            });
            this.on('ended', function () {
                var msg = "{'id':'" + get_xblock_id(players[this.id()]) + "','currentTime':" + currentTime + ",'code':'html5'}";
                send_msg(players[this.id()], msg, 'stop_video')
            });
            this.on('loadstart', function () {
                var msg = "{'id':'" + get_xblock_id(players[this.id()]) + "','code':'html5'}";
                console.log(msg);
                send_msg(players[this.id()], msg, 'load_video')
            })
        });
    }
}

function get_xblock_id(url) {
    console.log('get_xblock_id_start');
    return url.slice(url.lastIndexOf('@') + 1, url.indexOf('/handler'));
}

function send_msg(url, msg, type) {
    console.log('send_msg_start');
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({msg: msg, type: type}),
        success: function (result) {
            console.log(result);
            if (result['result'] == 'success') {
                return 1;
            } else {
                return 0;
            }
        }
    });
    console.log('send_msg_end');
}