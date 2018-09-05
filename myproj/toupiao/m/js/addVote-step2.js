/*
 * 用到common.js函数 ewmLayer和linkLayer
*/
$(function(){
    /* 获取选中 
     * @params ele --checkbox复选框
     * @return [Element obj || false] --有选中返回选中的checkbox，没有则返回false
    */
    function getChecked(ele){
        var item_checked = $(ele); // jquery or zepto
        if( item_checked.length > 0 ){
            return item_checked;
        }else{
            return false;
        }
    }

    /* 编辑分类弹窗函数 */
    function editType() {
        /* jshint -W117 */
        layer.open({
            type: 1,
            title: '',
            anim: 'up',
            className: 'prop-box ',
            content: '<h2 class="prop-tit">编辑分类</h2>'+
            '<div class="prop-cont prop-add-vote2">'+
                '<table class="prop-table add-vote2-table">'+
                '<thead><tr>'+
                '<th>分类组</th>'+
                '<th>排序</th>'+
                '<th></th>'+
                '</tr></thead>'+
                '<tbody>'+
                '<tr>'+
                '<td>警察</td>'+
                '<td>1</td>'+
                '<td><span class="del">删除<span></td>'+
                '</tr>'+
                '<tr>'+
                '<td>交警</td>'+
                '<td>2</td>'+
                '<td><span class="del">删除<span></td>'+
                '</tr>'+
                '<tr>'+
                '<td>火警</td>'+
                '<td>3</td>'+
                '<td><span class="del">删除<span></td>'+
                '</tr>'+
                '</tbody>'+
                '</table>'+
                '<div class="add-type">'+
                '<span><i class="iconfont icon-add1"></i>&nbsp;新增分类组</span>'+
                '</div>'+
            '</div>'+
            '<div class="add-type-form">'+
            '<input type="text" placeholder="请输入分类标题"/>'+
            '<div class="btn-wrap"><button class="btn cal">取消</button><button class="btn sure">确定</button></div>'+
            '</div>'+
            '</div>'+
            '<div class="prop-btn"><span class="btn-l">取消</span><span class="btn-r btn-yes">保存</span></div>',
            success: function(elem){
                var btnYes = $(elem).find('.btn-l');
                btnYes.on('click',function(){
                    layer.closeAll(); 
                });
                // 添加项
                var addType = $(elem).find('.add-type');
                var table = $(elem).find('.add-vote2-table');
                var inform = $(elem).find('.add-type-form');
                function addItem() {
                    var trLen = table.children('tbody').children('tr').length;
                    var inpt = inform.children('input');
                    var num = ++trLen;
                    var html = '<tr>'+
                    '<td>'+ inpt.val() +'</td>'+
                    '<td>'+ num +'</td>'+
                    '<td><span class="del">删除<span></td>'+
                    '</tr>';
                    table.children('tbody').append(html);
                }
                addType.on('click', function(){
                    inform.children('input').val('');
                    inform.show();
                    $(this).hide();
                });
                // 添加项 --取消
                var cal = $(elem).find('.cal');
                cal.on('click', function(){
                    inform.children('input').val('');
                    inform.hide();
                    addType.show();
                });
                // 添加项 --确定
                var sure = $(elem).find('.sure');
                sure.on('click', function(){
                    addItem();
                    inform.hide();
                    addType.show();
                });
                // 删除项
                $(elem).on('click', '.prop-add-vote2 .del', function(){
                    var tr = $(this).parent('td').parent('tr');
                    tr.remove();
                });
            }
        });
    }

    // 全选和全不选
    /* $('#check-all').click(function() {
        if(this.checked){
            $('[name=achecks]').prop('checked', true);
        }else{
            $('[name=achecks]').prop('checked',false);
        }
    }); */


    // 操作选项
    var tools = $('.toolbar-wrap .toolbar-cont').children('.tool');
    tools.each(function(index){
        var $that = $(this);
        /* 克隆操作子选项元素 */
        function cloneOpre(){
            // 获取操作元素的位置
            var posX = $that.offset().left,
                posY = $that.offset().top + $that.offset().height,
                wid  = $that.width();
            var oper = $that.children('.operator'); // 获取操作子选项元素
            var opreClone = oper.clone();
            opreClone.attr('id','oper' + index);
            opreClone.css({ // 定位克隆的操作子选项元素
                display: 'block',
                width: wid,
                position: 'absolute',
                top: posY,
                left: posX
            });
            return opreClone;
        }
        $(this).on('click', function(e){
            e.stopPropagation();
            var outOpre = $('body').find('#oper' + index);
            if(outOpre.length === 0){
                $('body').append(cloneOpre());
            }else if(outOpre.length > 0 && outOpre.css('display') == 'none'){
                // 先移除再重新添加到body，避免滑动以后点击出现的弹层位置不正确
                // 另：左右滑动选项时，弹层是不会跟随动的
                outOpre.remove();
                $('body').append(cloneOpre());
            }else{
                outOpre.remove();
            }
        });
        // 点击区域之外的地方关闭弹出层
        $(document).on('click',function(e){
            var _con = $('body').find('#oper' + index);
            var f = e.target == _con;
            if( !f && _con.has(e.target).length === 0){
                _con.hide();
            }
        });
    });
    
    // 点击编辑分类弹窗
    $('.btn-edit-type').on('click', function(){
        var checked = getChecked('[name=achecks]:checked');
        if( checked ){ // 需要选中项目才行
            editType();
        }else{
            alert('请选择分类!'); // jshint ignore:line
        }
    });

    // 删除选中dom节点
    $('body').on('click', '.opre-del', function(){
        var checked = getChecked('[name=achecks]:checked');
        if( checked ){
            checked.parents('li').remove();
        }else{
            alert('请选择!'); // jshint ignore:line
        }
    });

    // 点击删除直接删除dom节点
    $('.item-list').on('click', '.vt-delete', function(){
        $(this).parents('li').remove();
    });

    // 链接
    $('.opre-link').on('click', function(){
        var checked = getChecked('[name=achecks]:checked');
        if( checked ){
            linkLayer(); // from common.js
        }else{
            alert('请选择!'); // jshint ignore:line
        }
    });

    // 二维码
    $('.opre-ewm').on('click', function(){
        var checked = getChecked('[name=achecks]:checked');
        if( checked ){
            ewmLayer(); // from common.js
        }else{
            alert('请选择!'); // jshint ignore:line
        }
    });

    // 添加选项
    $('#add-item').on('click', function() {
        addVoteItem();
    });

    function addVoteItem() {
        var  ul = $('.item-list');
        var liLen = ul.children('li').length,
        num = ++liLen; // 列表项目的编号（复选框id）是从1开始的，所以这里先++
        var nowTime = formatDate(Date.now());
        var tpl = '<li>'+
        '<div class="table-box">'+
            '<div class="cont">'+
                '<div class="item-l">'+
                    '<span>'+
                        '<input type="checkbox" name="achecks" id="id-'+ num +'" class="vt-checkbox" /><label for="id-'+ num +'"></label>'+
                    '</span>'+
                '</div>'+
                '<div class="item-r clearfix">'+
                    '<div class="thumb">'+
                        '<img src="images/upload.jpg" alt="">'+
                    '</div>'+
                    '<div class="info">'+
                        '<div class="info-item clearfix">'+
                            '<div class="fl title">标题</div>'+
                            '<div class="fr num">编号'+ num +'</div>'+
                        '</div>'+
                        '<div class="info-item clearfix">'+
                            '<div class="fl">副标题</div>'+
                            '<div class="fr">【分类组】</div>'+
                        '</div>'+
                        '<div class="info-item clearfix">'+
                            '<div class="fl">'+ nowTime +'</div>'+
                            '<div class="fr total">0票</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '</div>'+
            '<div class="flex-box opre">'+
                '<a href="addVote-step2-edit.html"><i class="iconfont icon-edit"></i>编辑</a>'+
                '<a class="vt-delete"><i class="iconfont icon-delete"></i>删除</a>'+
            '</div>'+
        '</li>';
        ul.append(tpl);
    }
    /* 格式化时间 */
    function formatDate(time){
        var date = new Date(time);
        var year = date.getFullYear(),
            month = date.getMonth() + 1, // 月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes();
            // sec = date.getSeconds();
        var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
            return '0'+index;
        }); // 开个长度为10的数组 格式为 00 01 02 03
    
        var newTime = year + '-' +
                    (preArr[month]||month) + '-' +
                    (preArr[day]||day) + ' ' +
                    (preArr[hour]||hour) + ':' +
                    (preArr[min]||min);
        return newTime;
    }

});