layui.use(['jquery', 'layer'], function(){ 
    var $ = layui.$ //重点处
    ,layer = layui.layer;

function uaredirect(f){try{if(document.getElementById("bdmark")!=null){return}var b=false;if(arguments[1]){var e=window.location.host;var a=window.location.href;if(isSubdomain(arguments[1],e)==1){f=f+"/#m/"+a;b=true}else{if(isSubdomain(arguments[1],e)==2){f=f+"/#m/"+a;b=true}else{f=a;b=false}}}else{b=true}if(b){var c=window.location.hash;if(!c.match("fromapp")){if((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))){location.replace(f)}}}}catch(d){}}function isSubdomain(c,d){this.getdomain=function(f){var e=f.indexOf("://");if(e>0){var h=f.substr(e+3)}else{var h=f}var g=/^www\./;if(g.test(h)){h=h.substr(4)}return h};if(c==d){return 1}else{var c=this.getdomain(c);var b=this.getdomain(d);if(c==b){return 1}else{c=c.replace(".","\\.");var a=new RegExp("\\."+c+"$");if(b.match(a)){return 2}else{return 0}}}};
uaredirect('m/index.html');

/**
 * [draggable 拖拽方法]
 * @param  {[type]} modal  [移动元素]
 * @param  {[type]} handle [拖拽元素]
 * @param  {[type]} cancle [排除元素]
 */
var draggable = function(modal, handle, cancle) {
    var isDragging = false;
    var startX = 0,
        startY = 0,
        left = 0,
        top = 0;
    var dragStart = function(e) {
        var e = e || window.event;
        e.preventDefault();
        // 获取需要排除的元素
        var elemCancel = $(e.target).closest(cancle);
        // 如果拖拽的是排除元素，函数返回
        if (elemCancel.length) {
            return true;
      }
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        left = $(modal).offset().left;
        top = $(modal).offset().top;
    }
    var dragMove = function(e) {
        var e = e || window.event;
        e.preventDefault();
        if (isDragging) {
            var endX = e.clientX,
            endY = e.clientY,
            relativeX = endX - startX,
            relativeY = endY - startY;
            $(modal).css({
                left: relativeX + left + 'px',
                top: relativeY + top + 'px'
            });
        }
        return false;
    }
    var dragEnd = function(e) {
        isDragging = false;
    }
    $(handle).on('mousedown', dragStart);
    $(document).on('mousemove', dragMove);
    $(document).on('mouseup', dragEnd);
}
    // 客服
    draggable('.fixed-service','.fixed-service');

    // 侧边栏按钮
    $('#side-btn').on('click',function(){
        var side = $('.menu-side'),
        content = $('.main-content');
        if( side.hasClass('pinch') ){
            side.removeClass('pinch');
            content.removeClass('spread');
            $(this).children('.layui-icon').removeClass('layui-icon-next').addClass('layui-icon-prev');
        }else{
            side.addClass('pinch');
            content.addClass('spread');
            $(this).children('.layui-icon').removeClass('layui-icon-prev').addClass('layui-icon-next');
        }
    });


});