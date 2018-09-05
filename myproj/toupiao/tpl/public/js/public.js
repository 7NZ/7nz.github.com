$(function(){
// 选择
(function(){
    var checktxt = "点击选择";
    var checkedtxt = "已选择";
    if($('.icheckbox input').length>0){
        $('.icheckbox input').each(function(){
            var self = $(this);
                self.iCheck({
                checkboxClass: 'icheckbox-item',
                insert: '<span data-checked="'+checkedtxt+'"  data-unchecked="'+checktxt+'">' + checktxt +'</span>'
            });
        });
        $('.icheckbox input').on('ifChecked', function(event){
            _span = $(this).parent().find("span");
            _span.html(_span.attr("data-checked"));
            //setHadSelOpNum($(this),'add');
        });
        $('.icheckbox input').on('ifUnchecked', function(event){
            _span = $(this).parent().find("span");
            _span.html(_span.attr("data-unchecked"));
            //setHadSelOpNum($(this),'sub');
        });
    }
})();

// 背景音乐
function audioPlay(id){
    var audio = document.getElementById(id);
    var ico = document.getElementsByClassName('music')[0].getElementsByTagName('i')[0];
    if(audio.paused){
        audio.play();
        ico.classList.add('torotate');
    }else{
        audio.pause();
        ico.classList.remove('torotate');
    }
}

$('body').on('click',function(event){
    var playBtn = $('.music i');
    var music = document.getElementById('audio');
    var target = $( event.target );
    if( target.is( playBtn )){
        //console.log(playBtn, event.target, target);
        audioPlay('audio');
    }else{
        music.play();
        playBtn.addClass('torotate');
    }
});

if(window.WeixinJSBridge){
    WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
        audioPlay('audio');
    }, false);
}else{
    document.addEventListener("WeixinJSBridgeReady", function() {
    WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
        audioPlay('audio');
    });
}, false);
}

})