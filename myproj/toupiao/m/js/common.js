
// 引入iconfont，项目中增加图标线上地址会变，这里先由公共js统一引入
// loadCss('http://at.alicdn.com/t/font_689894_75mfzjg179b8d7vi.css');
// loadScritp('http://at.alicdn.com/t/font_689894_75mfzjg179b8d7vi.js');

/* function loadScritp(src){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}
function loadCss(src){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
} */

function eleHasClass( elements,cName ){
    return !!elements.className.match( new RegExp( '(\\s|^)' + cName + '(\\s|$)') );
}
function eleAddClass( elements,cName ){
    if( !eleHasClass( elements,cName ) ){
    elements.className += ' ' + cName;
    }
}
function eleRemoveClass( elements,cName ){
    if( eleHasClass( elements,cName ) ){
    elements.className = elements.className.replace( new RegExp( '(\\s|^)' + cName + '(\\s|$)' ), ' ');
    }
}

/* 扩展 scrollTo方法 */
$.fn.scrollTo = function(options){
    var defaults = {
        toT : 0,    //滚动目标位置
        durTime : 300,  //过渡动画时间
        delay : 30,     //定时器时间
        callback:null   //回调函数
    };
    var opts = $.extend(defaults,options),
        timer = null,
        _this = $(this),
        curTop = _this.scrollTop(),//滚动条当前的位置
        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function(t){
            index++;
            var per = Math.round(subTop/dur);
            if(index >= dur){
                _this.scrollTop(t);
                window.clearInterval(timer);
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
                _this.scrollTop(curTop + index*per);
            }
        };
    timer = window.setInterval(function(){
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};

document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单
    var navBtn = document.getElementById('navBtn');
    var navBox = document.getElementById('navBox');
    var top = document.getElementById('top');
    navBtn.addEventListener('touchend',function(){
        if( eleHasClass(navBox,'show') ){
            navBox.classList.remove('show');
            top.classList.remove('open');
        }else{
            navBox.classList.add('show');
            top.classList.add('open');
        }
    });

});

// 全局变量， 定义事件类型
var evType = (typeof $.touch == 'object') ? 'tap' : 'click';
// console.log(typeof $.touch);

/* 二维码弹窗 */
function ewmLayer() {
    /* jshint -W117 */
    layer.open({  // jshint ignore:line
        type: 1,
        title: '',
        anim: 'up',
        className: 'prop-box ',
        content: '<h2 class="prop-tit">二维码</h2>'+
        '<div class="prop-cont prop-ewm">'+
        '<div class="pic">'+
        '<img src="images/vote-ewm.jpg"/>'+
        '</div>'+
        '<div class="flex-box btn-wrap">'+
        '<a href="" class="btn">240*240</a>'+
        '<a href="" class="btn">300*300</a>'+
        '</div>'+
        '<div class="flex-box btn-wrap">'+
        '<a href="" class="btn">500*500</a>'+
        '<a href="" class="btn">800*800</a>'+
        '</div>'+
        '</div>'+
        '<div class="prop-btn"><span class="btn-l btn-yes">确认</span></div>',
        success: function(elem){
            var btnYes = $(elem).find('.btn-l');
            btnYes.on(evType,function(){
                layer.closeAll(); 
            });
        }
    });
}
/* 链接弹窗 */
function linkLayer() {
    /* jshint -W117 */
    layer.open({
        type: 1,
        title: '',
        anim: 'up',
        className: 'prop-box ',
        content: '<h2 class="prop-tit">链接</h2>'+
        '<div id="linkText" class="prop-cont prop-link">'+
        'http://www.xxxx.com/view/id/2483'+
        '</div>'+
        '<div class="prop-btn"><span class="btn-l btn-yes">确认</span><span class="btn-r btn-copy">复制链接</span></div>',
        success: function(elem){
            var btnYes = $(elem).find('.btn-l');
            var btnCopy = $(elem).find('.btn-copy');
            var linkTxt = $(elem).find('.prop-link');
            btnYes.on(evType,function(){
                layer.closeAll(); 
            });
            // 复制链接
            btnCopy.on(evType,function(){
                var input = document.createElement('input');
                input.setAttribute('readonly', 'readonly');
                input.setAttribute('value', linkTxt.text());
                document.body.appendChild(input);
                input.focus();
                input.setSelectionRange(0, 9999);
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    alert('复制成功');
                }else{
                    alert('请长按文字复制');
                }
                document.body.removeChild(input);
            });
        }
    });
}


$(function(){

    // 回到顶部
    $('#gotop').on('click',function () {
        $('html,body').scrollTo({toT: 0});
    });

    // 操作收缩和展开
    $('.v-list').on(evType,'li .handel',function(){
        $(this).parent().toggleClass('collspace');
    });
    
    // 二维码弹窗
    $('.btn-ewm').on(evType,function(){
        ewmLayer();
    });
    // 链接弹窗
    $('.btn-link').on(evType,function(){
        linkLayer();
    });

    // 操作选项点击显示隐藏
    $('.has-option').on(evType,function(e){
        e.stopPropagation(); // 阻止弹出层的事件，防止冒泡到body
        $(this).children('.operator').toggleClass('showup');
    });
    // 点击其他地方关闭操作选项弹层
    $(document).on(evType,function(e){
        var _con = $('.has-option').children('.operator');
        var f = e.target == _con;
        if( !f && _con.has(e.target).length === 0){
            _con.removeClass('showup');
        }
    });
});
