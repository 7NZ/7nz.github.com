(function () {
    /* 获取选中 
     * @params _uploader --按钮外层id
     * @return url --文件接收服务端。
     * _multiple  --是否能同时上传多个
     * fileNum  --文件个数
    */
    var $WebUpload = function (_uploader, url, _multiple, fileNum) {  
        this._uploader = _uploader;  
        this.serverurl = url;  // 文件接收服务端。
        this.imageExtensions = 'gif,jpg,jpeg,bmp,png';  
        this.mimeTypes ='image/gif,image/jpg,image/jpeg,image/bmp,image/png';  
        // 缩略图大小  
        this.ratio = window.devicePixelRatio || 1,  
            this.thumbnailWidth = 160 * this.ratio;  
        this.thumbnailHeight = 120 * this.ratio;  
        this.fileSizeLimit = 10 * 1024 * 1024;  
        this.fileNumLimit = fileNum || 8;  // 1表示单图，不填表示多图
        this.fileSingleSizeLimit = 10 * 1024 * 1024;  
        // this.swfurl = BASE_URL + '/js/Uploader.swf'; 
        this.swfurl = 'static/js/webuploader/Uploader.swf';  
        this.custsuccess = null;  
        this.custerror = null;  
        this.fileCount = 0;  
        this.WebUploader;
        this.iSmultiple = _multiple ; // 是否可上传多个

    };
    $WebUpload.prototype = {  
        /** 
         * 初始化webUploader 
         */  
        init: function () {  
            var uploader = this.create();  
            this.bindEvent(uploader);  
            return uploader;  
        },  
  
        /** 
         * 创建webuploader对象 
         */  
        create: function () {
            var me = this;
            var webUploader = WebUploader.create({  
                pick: {
                    id: $('._picker', $(this._uploader))[0],
                    multiple: me.iSmultiple,
                }, 
                // 这里如果要一个页面多个实例，有bug  
                // https://github.com/fex-team/webuploader/issues/81#issuecomment-228499631  
                accept: {  
                    title: 'Images',  
                    extensions: this.imageExtensions,  
                    mimeTypes: this.mimeTypes  
                },  
                // swf文件路径  
                swf: this.swfurl,  
                disableGlobalDnd: true,  
                duplicate: false,//不允许上传同一个文件  
                auto: true,//自动上传  
                server: this.serverurl,  
                fileNumLimit: this.fileNumLimit,  
                fileSingleSizeLimit: this.fileSingleSizeLimit * 1024 * 1024    // 3 M  
            });
            return webUploader;  
        },  
  
        /** 
         * 绑定事件 
         */  
        bindEvent: function (bindedObj) {  
            var me = this;  
            bindedObj.on('fileQueued', function (file) {  
                var $li = $('<li id="' + $(me._uploader).attr("id") + "_" + file.id + '" class="file-item thumbnail">' +  
                        '<p class="imgWrap"><img id="thumb_' + $(me._uploader).attr("id") + "_" + file.id + '" src="http://img2.bdstatic.com/static/searchresult/img/loading_circle_40b82ef.gif"></p>' +  
                        '<div class="info">' + file.name + '</div>' +
                        '</li>'  
                    ),  
                    $img = $li.find('img');  
                var $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                // '<span class="rotateRight">向右旋转</span>' +
                // '<span class="rotateLeft">向左旋转</span>' +
                '</div>').appendTo( $li ),
                $wrap = $li.find( 'p.imgWrap' );
                var supportTransition = (function(){
                    var s = document.createElement('p').style,
                        r = 'transition' in s ||
                              'WebkitTransition' in s ||
                              'MozTransition' in s ||
                              'msTransition' in s ||
                              'OTransition' in s;
                    s = null;
                    return r;
                })();
                // $list为容器jQuery实例  
                $($('._queueList', $(me._uploader))[0]).append($li);  
                // 创建缩略图  
                // 如果为非图片文件，可以不用调用此方法。  
                // thumbnailWidth x thumbnailHeight 为 100 x 100  
                bindedObj.makeThumb(file, function (error, src) {  
                    if (error) {  
                        $img.replaceWith('<span>不能预览</span>');  
                        return;  
                    }  
                    $img.attr('src', src);  
                }, me.thumbnailWidth, me.thumbnailHeight);  
                me.fileCount++;  
                if (me.fileNumLimit == me.fileCount) {  
                    $($('._picker', $(me._uploader))[0]).css("display", "none");  
                }

                file.rotation = 0;
                // 按钮
                $btns.on( 'click', 'span', function() {
                    var index = $(this).index(),
                        deg;
                    switch ( index ) {
                        case 0:
                            // console.log(bindedObj.getFile(file.id));
                            bindedObj.removeFile( bindedObj.getFile(file.id), true ); // 删除
                            $li.remove();
                            return;
        
                        case 1:
                            file.rotation += 90;
                            break;
        
                        case 2:
                            file.rotation -= 90;
                            break;
                    }
                    if ( supportTransition ) {
                        deg = 'rotate(' + file.rotation + 'deg)';
                        $wrap.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        });
                    } else {
                        $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                    }
                });  
            });
            bindedObj.on('fileDequeued',function(){
                // console.log(bindedObj.getFiles()); // 文件删除但还在? https://segmentfault.com/q/1010000009707224
                if (me.fileNumLimit == 1) { // 单图时，删除文件后显示上传按钮
                    $($('._picker', $(me._uploader))[0]).css("display", "block");  
                }
            });
            // 文件上传过程中创建进度条实时显示。  
            bindedObj.on('uploadProgress', function (file, percentage) {  
                var $li = $('#' + $(me._uploader).attr("id") + "_" + file.id),  
                    $percent = $li.find('.progress span');  
  
                // 避免重复创建  
                if (!$percent.length) {  
                    $percent = $('<p class="progress"><span></span></p>')  
                        .appendTo($li)  
                        .find('span');  
                }  
  
                $percent.css('width', percentage * 100 + '%');  
            });  
            // 文件上传成功，给item添加成功class, 用样式标记上传成功。  
            bindedObj.on('uploadSuccess', function (file, response) {  
                $('#' + $(me._uploader).attr("id") + "_" + file.id).addClass('upload-state-done');  
                bindedObj.makeThumb(file, function (error, src) {  
                    $img = $('#thumb_' + $(me._uploader).attr("id") + "_" + file.id);  
                    if (error) {  
                        $img.replaceWith('<span>不能预览</span>');  
                        return;  
                    }  
                    $img.attr('src', src);  
                }, me.thumbnailWidth, me.thumbnailHeight);  
  
                if ('function' == typeof me.custsuccess) {  
                    me.custsuccess(file, response);  
                }  
            });  
  
            // 文件上传失败，显示上传出错。  
            bindedObj.on('uploadError', function (file, reason) {  
                var $li = $('#' + $(me._uploader).attr("id") + "_" + file.id),  
                    $error = $li.find('div.error');  
  
                // 避免重复创建  
                if (!$error.length) {  
                    $error = $('<div class="error"></div>').appendTo($li);  
                }  
  
                $error.text('上传失败,' + reason);  
            });  
  
            // 其他错误  
            bindedObj.on('error', function (type) {  
                console.log("webuploadertool error type:" + type);  
                var message = "";  
                if ("Q_EXCEED_NUM_LIMIT" == type) {  
                    message = "最多只允许上传" + me.fileNumLimit + "张图片";  
                } else if ("F_EXCEED_SIZE" == type) {  
                    message = "单张只允许上传" + me.fileSingleSizeLimit + "M以内的图片";  
                } else if ("Q_TYPE_DENIED" == type) {  
                    message = "只允许上传类型为" + me.imageExtensions + "的图片";  
                }  
                if ('function' == typeof me.custerror) {  
                    me.custerror(message);  
                }  
            });
  
            // 完成上传完了，成功或者失败  
            bindedObj.on('uploadComplete', function (file) {  
                $('#' + $(me._uploader).attr("id") + "_" + file.id).find('.progress').remove();  
            });  
        }  
    };  
    window.$WebUpload = $WebUpload;  
}());