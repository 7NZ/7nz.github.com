layui.use('layer', function(){ //独立版的layer无需执行这一句
  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
  //触发事件
  var active = {
    infoManage:function () {
        layer.open({
            type:1
            ,title:
            '<div class="module-head clearfix">'+
            '<div class="tit tit-info">'+
            '信息管理'+
            '</div>'+
            '<a class="layui-btn layui-btn-primary layui-btn-sm  btn-delete btn-unchecked" href="javascript:;"><i class="icon-del"></i>删除选中</a>'+
            '</div>'
            ,closeBtn: 1
            ,area: '1260px;'
            ,shade: 0.5
            ,id: 'LAY_layuipro2' 
            ,btn: ['取消', '去开发票']
            ,btnAlign: 'c'
            ,moveType: 1 
            ,content:'<div><table id="demo2" lay-filter="test"></table><div class="add-wrp"><span><i class="add">+</i>添加开票信息</span></div><div class="add-info-wrp"><div class="table-info"><span></span><input placeholder="请输入发票抬头，个人请写名字"><input placeholder="请输入纳税人识别号"><input placeholder="请输入联系人"><input placeholder="请输入联系电话"><input placeholder="请输入电子邮箱"><input placeholder="请输入邮寄地址"></div><div class="btn-wrp"><span class="btn back">取消</span><span class="btn sure">确定</span></div></div></div>'
            ,success:function (layero) {
                var unchecked = layero.find('.btn-unchecked');
                $('body').on('mousedown','.btn-unchecked',function () {
                    $('#LAY_layuipro2 .layui-table-main .layui-form-checked').parents('tr').hide();
                })
                layui.use('table', function(){
                    var table = layui.table;
                    table.render({
                        elem: '#demo2'

                        ,skin: 'line'
                        ,cols: [[
                        {type:'checkbox',width:'5%'}
                        ,{field: 'id', width:'20%', title: '发票抬头',}
                        ,{field: 'username', width:'15%', title: '纳税人识别号',}
                        ,{field: 'sex', width:'10%', title: '联系人', }
                        ,{field: 'city', width:'10%', title: '联系电话', } 
                        ,{field: 'sign', width:'15%', title: '电子邮箱', } 
                        ,{field: 'experience', width:'25%', title: '邮寄地址',} 
                        ]]
                        ,data:[{"id":'杭州谷奈木网络科技有限公司',"username":"9069795869794865","sex":"田宇轩","city":"15069785764","sign":"369019419@qq.com","experience":'浙江省杭州市西湖区文一西路大华西溪风情',"logins":24,"wealth":82830700,"classify":"作家","score":57},{"id":'杭州谷奈木网络科技有限公司',"username":"9069795869794865","sex":"田宇轩","city":"15069785764","sign":"369019419@qq.com","experience":'浙江省杭州市西湖区文一西路大华西溪风情',"logins":58,"wealth":64928690,"classify":"词人","score":27},{"id":'杭州谷奈木网络科技有限公司',"username":"9069795869794865","sex":"田宇轩","city":"15069785764","sign":"369019419@qq.com","experience":'浙江省杭州市西湖区文一西路大华西溪风情',"logins":77,"wealth":6298078,"classify":"酱油","score":31},{"id":'杭州谷奈木网络科技有限公司',"username":"9069795869794865","sex":"田宇轩","city":"15069785764","sign":"369019419@qq.com","experience":'浙江省杭州市西湖区文一西路大华西溪风情',"logins":157,"wealth":37117017,"classify":"诗人","score":68}]
                    });

                });
            }
        })
    }
    ,notice: function(){
      //示范一个公告层
      layer.open({
        type: 1
        ,title:
        '<div class="module-head clearfix">'+
        '<div class="tit tit-INV">'+
        '开发票'+
        '</div>'+
        '</div>'
        ,closeBtn: 1
        ,area: '1200px;'
        ,shade: 0.5
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['取消', '开发票']
        ,btnAlign: 'c'
        ,moveType: 1 
        ,content: 
        '<div class="pop-con">'+
        '<div class="tips"><i class="icon-tips"></i>提示：目前开具纸质发票仅支持邮寄顺丰到付，如需电子发票，可选择“发票类型”为电子发票</div>'+
        '<div class="">'+
        '<div class="pop-left">'+
        '<form class="layui-form" action="">'+
        '<div class="layui-form-item">'+
        '<h2>发票信息：</h2>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>发票抬头</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="个人请填写姓名" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>个人或企业</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请填写个人或企业" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>纳税人识别号</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请填写纳税人识别号，个人请留空" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>发票内容</label>'+
        '<div id="divselect" class="divselect divselect1 inputWidth ">'+
        '<cite>请选择</cite>'+
        '<ul>'+
        '<li><a href="javascript:;" selectid="1">技术服务费</a></li>'+
        '<li><a href="javascript:;" selectid="2">技术服务费1</a></li>'+
        '<li><a href="javascript:;" selectid="3">技术服务费2</a></li>'+
        '<li><a href="javascript:;" selectid="4">技术服务费3</a></li>'+
        '<li><a href="javascript:;" selectid="5">技术服务费4</a></li>'+
        '</ul>'+
        '</div>'+
        '<input name="" type="hidden" value="" id="inputselect"/>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>发票类型</label>'+
        '<div id="divselect" class="divselect divselect2 inputWidth ">'+
        '<cite>请选择</cite>'+
        '<ul>'+
        '<li><a href="javascript:;" selectid="1">电子发票</a></li>'+
        '<li><a href="javascript:;" selectid="2">纸张发票</a></li>'+
        '</ul>'+
        '</div>'+
        '<input name="" type="hidden" value="" id="inputselect"/>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<h2>邮寄信息：</h2>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red"></i>邮寄方式</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="若为电子发票，此项不填" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>联系人</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入联系人" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>联系电话</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="phone" lay-verify="phone" autocomplete="off" placeholder="请输入联系电话" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>邮寄地址</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="格式：xx省xx市xx区（县）xx街道xx小区" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label"><i class="red">*</i>电子邮箱</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<input type="text" name="email" lay-verify="email" autocomplete="off" placeholder="请输入邮箱" class="layui-input">'+
        '</div>'+
        '</div>'+
        '</form>'+
        '</div>'+
        '<div class="pop-right">'+
        '<form class="layui-form remark-info" action="">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label">备注信息</label>'+
        '<div class="layui-input-block inputWidth">'+
        '<div class="Re"><label>开户银行：</label><input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="" class="layui-input"></div>'+
        '<div class="Re"><label>开户账号：</label><input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="" class="layui-input"></div>'+
        '<div class="Re"><label>公司地址：</label><input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="" class="layui-input"></div>'+
        '</div>'+
        '</div>'+
        '</form>'+
        '<div class="grey-tips">请勾选需要开发票的消费记录</div>'+
        '<label class="Record-label" for=""><i class="red">*</i>消费记录</label>'+
        '<div class="Record-table">'+
        '<table id="demo" lay-filter="test"></table>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
        ,success: function(layero){
            var btn = layero.find('.layui-layer-btn');
            /* btn.find('.layui-layer-btn1').click(function(event){
                event.stopPropagation();
                layer.msg('提交');
                return false;
            }) */
            layui.use('form', function(){
            var form = layui.form;
                form.on('submit(formDemo)', function(data){
                    layer.msg(JSON.stringify(data.field));
                    return false;
                });
            });
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#demo'
                    ,height: 245
                    ,request:{}
                    ,skin: 'line'
                    ,cols: [[ 
                    {field: 'id', width:'30%', title: '交易内容',}
                    ,{field: 'username', width:'15%', title: '交易金额',}
                    ,{field: 'sex', width:'15%', title: '交易类型', }
                    ,{field: 'city', width:'30%', title: '城市', } 
                    ,{type:'checkbox',width:'10%'}
                    ]]
                    ,data:[{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-0","experience":255,"logins":24,"wealth":82830700,"classify":"作家","score":57},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-1","experience":884,"logins":58,"wealth":64928690,"classify":"词人","score":27},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-2","experience":650,"logins":77,"wealth":6298078,"classify":"酱油","score":31},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-3","experience":362,"logins":157,"wealth":37117017,"classify":"诗人","score":68},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-4","experience":807,"logins":51,"wealth":76263262,"classify":"作家","score":6},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-5","experience":173,"logins":68,"wealth":60344147,"classify":"作家","score":87},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-6","experience":982,"logins":37,"wealth":57768166,"classify":"作家","score":34},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-7","experience":727,"logins":150,"wealth":82030578,"classify":"作家","score":28},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-8","experience":951,"logins":133,"wealth":16503371,"classify":"词人","score":14},{"id":'流量套餐400万次购买',"username":"950￥","sex":"账号充值","city":"2018-06-07-12:00","sign":"签名-9","experience":484,"logins":25,"wealth":86801934,"classify":"词人","score":75}]
                });
            });
        }
    });
    }
};

    $('.layui-btn').on('click', function(){
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
});


// layui.use('form', function(){
//     var form = layui.form;
//     form.on('submit(formDemo)', function(data){
//         layer.msg(JSON.stringify(data.field));
//         return false;
//     });
// });
/* 下拉框 */
jQuery.divselect = function(divselectid,inputselectid) {
    var inputselect = $(inputselectid);
    $('body').on('click',divselectid+" cite",function () {
        var ul = $(divselectid+" ul");
        if(ul.css("display")=="none"){
            ul.slideDown("fast");
        }else{
            ul.slideUp("fast");
        }
    })
    $('body').on('click',divselectid+" ul li a",function () {
        var txt = $(this).text();
        $(divselectid+" cite").html(txt);
        var value = $(this).attr("selectid");
        inputselect.val(value);
        $(divselectid+" ul").hide();
    })
    $(document).click(function(e){
       var target = $(e.target);
       if(target.closest(divselectid).length != 0) return;
            // $(divselectid+" ul").hide();
        $(divselectid+" ul").stop().slideUp("fast");
    });
};
$.divselect(".divselect1","#inputselect");
$.divselect(".divselect2","#inputselect");

$('body').on('click','.add-wrp span',function () {
    $(this).parents('.add-wrp').hide().siblings('.add-info-wrp').show();
});
// 发票信息取消
$('body').on('click','.btn-wrp .back',function () {
    $(this).parents('.add-info-wrp').hide().siblings('.add-wrp').show();
    $('.table-info input').val('')
});
// 添加发票信息
$('body').on('click','.btn-wrp .sure',function () {
    var str = '<td data-field="0"><div class="layui-table-cell laytable-cell-1-0 laytable-cell-checkbox"><input type="checkbox" name="layTableCheckbox" lay-skin="primary"><div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon layui-icon-ok"></i></div></div></td>';
    $('.table-info input').each(function () {
        str+='<td><div class="layui-table-cell">'+$(this).val()+'</div></td>'
        console.log($(this).val());
    })
    $('.layui-table-main table tbody').append('<tr>'+str+'</tr>');
    $('.table-info input').val('')
})
