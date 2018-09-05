$(function(){
    // 页数
    var page = 0;
    // 每页展示10个
    var size = 10;

    // dropload
    $('.vote-faq-wrap').dropload({
        scrollArea : window,
        domDown : {
            domClass   : 'load-more',
            domRefresh : '<span class="loading"></span>↑上拉查看更多',
            domLoad    : '<span class="loading toRotate"></span>加载中...',
            domNoData  : '<div class="dropload-noData">暂无数据</div>'
        },
        loadDownFn : function(me){
            /* 实际使用 */
            /* page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: 'http://ons.me/tools/dropload/json.php?page='+page+'&size='+size,
                dataType: 'json',
                success: function(data){
                    var arrLen = data.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result +=  '<li><a href="'+data[i].link+'">'+data[i].title+'</a></li>';
                        }
                    // 如果没有数据
                    }else{
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面，放到最后面
                        $('.news-list').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            }); */
            /* 实际使用 end */
            /* 本地数据 */
            $.ajax({
                type: 'GET',
                url: 'json/more.json',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.lists.length;
                    var result = '';
                    if(arrLen > 0){
                        for(var i = 0; i < arrLen; i++){
                            result +=  '<li><a href="'+data.lists[i].link+'">'+data.lists[i].title+'</a></li>';
                        }
                    // 如果没有数据
                    }else{
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面，放到最后面
                        $('.news-list').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
            /* 本地数据 end */
        },
        threshold : 50
    });
});