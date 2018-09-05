layui.use(['jquery', 'layer'], function(){
    var $ = layui.$,
    layer = layui.layer;

    $('.table-wrap').on('click','.btn-show-ewm',function(){
        openQrcode();
    });
    $('.table-wrap').on('click','.btn-show-link',function(){
        openLink();
    });
    function openQrcode(){
        layer.open({
            type:1
            ,title: '<div class="module-head btm-boder clearfix">'+
                    '<div class="tit tit-ewm"> 二维码</div>'+
                '</div>'
            ,area: '550px;'
            ,shade: 0.5
            ,closeBtn: 1
            ,id: 'LAY_layui_ewm'
            ,moveType: 1 
            ,content:
                '<div class="dialog-cont">'+
                    '<div class="img-box">'+
                        '<img src="static/images/dialog-ewm.jpg" alt="">'+
                    '</div>'+
                    '<div class="layui-btn-container dialog-ewm-size">'+
                        '<a class="layui-btn layui-btn-primary layui-btn-xs" href="#">240*240</a>'+
                        '<a class="layui-btn layui-btn-primary layui-btn-xs" href="#">300*300</a>'+
                        '<a class="layui-btn layui-btn-primary layui-btn-xs" href="#">500*500</a>'+
                        '<a class="layui-btn layui-btn-primary layui-btn-xs" href="#">800*800</a>'+
                    '</div>'+
                '</div>'+
                '<div class="dialog-btn-cont">'+
                    '<button class="dialog-btn btn-blue sure">确定</button>'+
                '</div>'
            ,success:function (layero) {
                var sure = layero.find('.sure');
                sure.click(function(){
                    layer.closeAll();
                });
            }
        });
    }
    function openLink(){
        layer.open({
            type:1
            ,title: '<div class="module-head btm-boder clearfix">'+
                    '<div class="tit tit-link">链接</div>'+
                '</div>'
            ,area: '550px;'
            ,shade: 0.5
            ,closeBtn: 1
            ,id: 'LAY_layui_link'
            ,moveType: 1 
            ,content:
                '<div class="dialog-cont">'+
                    '<div id="linkText" class="link-text">https://www.xxxxx.com/page/show/id/a3</div>'+
                '</div>'+
                '<div class="dialog-btn-cont">'+
                    '<button class="dialog-btn sure">确定</button>'+
                    '<button class="dialog-btn btn-blue btn-copy">复制链接</button>'+
                '</div>'
            ,success:function (layero) {
                var close = layero.find('.btn-copy');
                var sure = layero.find('.sure');
                // var txt = layero.find('.link-text');
                close.click(function(){
                    var linkText = document.getElementById('linkText');
                    var range = document.createRange(),
                    selection = window.getSelection();
                    range.selectNode(linkText);
                    selection.addRange(range);
                    try {
                        if(document.execCommand) {
                            // 复制选中的文字到剪贴板
                            document.execCommand("copy", "false", null);
                        }
                    } catch(e) {
                        // 不支持复制命令
                        alert('请按 Ctrl/Cmd+C 复制');
                    }
                });
                sure.click(function(){
                    layer.closeAll();
                });
            }
        });
    }
})