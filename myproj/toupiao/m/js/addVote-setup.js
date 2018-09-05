/**
 * 计算文件大小 https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications
 * @param {element} fileInput type="file"的input元素
 * @param {number} onlyNum  数字1
 */
function updateSize(fileInput, onlyNum){
    var nBytes = 0,
        oFiles = fileInput.files,
        nFiles = oFiles.length;
    for (var nFileId = 0; nFileId < nFiles; nFileId++) {
        nBytes += oFiles[nFileId].size;
    }
    if(onlyNum != null && onlyNum === 1){
        return nBytes;  // 如果第二参数是1，返回字节数
    }
    var sOutput = nBytes + ' bytes';
    // optional code for multiples approximation
    for (var aMultiples = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(3) + ' ' + aMultiples[nMultiple] + ' (' + nBytes + ' bytes)';
    }
    return sOutput;
}

/**
 * 图片上传(单张)  https://github.com/lin-xin/blog/issues/18
 * @param {element} input type='file'的input元素
 * @param {callback} callback 回调函数
 */
function imgUpload(input, callback) {
    var img = document.createElement('img'),
        Orientation = null;
    input.onchange = function () {
        /* jshint -W117 */
        var file = this.files[0],
            reader = new FileReader(),
            image = new Image();
        var imgTempArr = [];
        if(file){
            EXIF.getData(file, function() { // 需用到exif.js
                Orientation = EXIF.getTag(this, 'Orientation');
            });
            reader.onload = function (ev) {
                console.log(updateSize(input)); // 打印大小
                image.src = ev.target.result;
                image.onload = function () {
                    var imgWidth = this.width,
                        imgHeight = this.height;
                        
                    if(imgWidth > imgHeight && imgWidth > 750){
                        imgWidth = 750;
                        imgHeight = Math.ceil(750 * this.height / this.width);
                    }else if(imgWidth < imgHeight && imgHeight > 1334){
                        imgWidth = Math.ceil(1334 * this.width / this.height);
                        imgHeight = 1334;
                    }
                    
                    var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    if(Orientation && Orientation != 1){
                        switch(Orientation){
                            case 6:
                                canvas.width = imgHeight;
                                canvas.height = imgWidth;
                                ctx.rotate(Math.PI / 2);
                                ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight);
                                break;
                            case 3:
                                ctx.rotate(Math.PI);
                                ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight);
                                break;
                            case 8:
                                canvas.width = imgHeight;
                                canvas.height = imgWidth;
                                ctx.rotate(3 * Math.PI / 2);
                                ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight);
                                break;
                        }
                    }else{
                        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
                    }
                    img.src = canvas.toDataURL('image/jpeg', 1); // 图片的src设置为base64，这里可以将base64保存起来传入回调函数,用以提交
                    imgTempArr.push(img.src); // 将base64存入数组
                    if (typeof callback === 'function'){
                        callback(img,imgTempArr);
                    }else{
                        console.warn('callback is not a function');
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };
}

/**
 * 上传音乐
 * @param {element} input 
 * @param {callback} callback 
 */
function uploadAudio(input, callback){
    /* jshint -W117 */
    input.addEventListener('change',function(){
        var file = this.files[0];
        var reader = new FileReader();
        var maxSize = 2*1024; // 设置最大2M
        var reg = /(audio\/mp3|audio\/mpeg|audio\/ogg)/gi;
        if (file) {
            if (!reg.test(file.type)) {
                alert('不支持的文件类型!');
                return false;
            }
            reader.addEventListener('load', function (ev) {
                var res = ev.target.result;
                var fileSize = file.size /1024;
                if(fileSize > maxSize){
                    alert('文件不允许超过2M');
                    return false;
                }
                if (typeof callback === 'function'){
                    callback(res);
                }else{
                    console.warn('callback is not a function');
                }
            }, false);
            reader.readAsDataURL(file);
        }
    });
}

$(function(){
    /*
     * 下拉选项默认html结构
     * <div>
     * <div class="im-select ipt">
     *      <input type="text" name="">
     *      <span class="ipt-val">默认选项</span>
     *      <i class="iconfont icon-right1"></i>
     * </div>
     * <ul class="select-list">
     *      <li>默认选项</li>
     *      <li>选项1</li>
     *      <li>选项2</li>
     * </ul>
     * </div>
     */

    // 打开选项 普通文本
    $('.im-select').on('click', function(){
        var selectItem = $(this).siblings('.select-list');
        var html = '<div class="select-ui"><div class="ui-mask"></div><div class="select-cont anim-up">'+
        '<ul class="select-item">'+
        selectItem.html() +
        '</ul>'+
        '<div class="cancle">取消</div></div></div>';
       var select = $(this).siblings('.select-ui');
        if(select.length === 0) {
            $(this).parent().append(html);
            $(this).siblings('.select-ui').show();
        }else if(select.length > 0){
            $(this).siblings('.select-ui').show();
        }
    });
    // 选择选项 普通文本
    $('body').on('click','.select-item li', function(){
        var selectVal = $(this).text(); // 获取文本值
        var ipt = $(this).parents('.select-ui').siblings('.im-select').children('input');
        var iptTxt = $(this).parents('.select-ui').siblings('.im-select').children('.ipt-val');
        ipt.val(selectVal); // input 框赋值
        iptTxt.text(selectVal);
        $(this).parents('.select-ui').hide();
    });
    // 点击空白关闭选项弹层
    $('body').on('click','.select-ui .ui-mask', function(){
        $(this).parent().hide();
    });
    // 点击取消关闭选项弹层
    $('body').on('click','.select-ui .cancle', function(){
        $(this).parents('.select-ui').hide();
    });

    // 打开选项 其他（带有html标签）
    $('.el-select').on('click', function(){
        var selectItem = $(this).siblings('.select-list');
        var html = '<div class="select-ui"><div class="ui-mask"></div><div class="select-cont anim-up">'+
        '<ul class="select-item color-styles">'+
        selectItem.html() +
        '</ul>'+
        '<div class="cancle">取消</div></div></div>';
       var select = $(this).siblings('.select-ui');
        if(select.length === 0) {
            $(this).parent().append(html);
            $(this).siblings('.select-ui').show();
        }else if(select.length > 0){
            $(this).siblings('.select-ui').show();
        }
    });
    // 选择选项 其他（带有html标签）
    $('body').on('click','.select-item li', function(){
        var selectVal = $(this).children().data('val'); // 获取子元素data值
        var ipt = $(this).parents('.select-ui').siblings('.im-select').children('input');
        var iptTxt = $(this).parents('.select-ui').siblings('.el-select').children('.el-val');
        ipt.val(selectVal); // input 框赋值
        iptTxt.html($(this).html());
        $(this).parents('.select-ui').hide();
    });

    // 滑块选项切换
    $('.switch .switch-item').each(function(){
        var val = $(this).data('val');
        // input 没有设置默认值，点击后才赋值
        $(this).on('click',function(){
            $(this).siblings('input').val(val);
            // console.log($(this).siblings('input').val());
            $(this).addClass('on');
            $(this).siblings('.switch-item').removeClass('on');
        });
    });

    // 点击上传图片
    $('.ipt-img').on('click', 'input[type="file"]', function(){
        var imgBox = $(this).siblings('.img-preview-box');
        var upTxt = $(this).siblings('.upload-txt');
        imgUpload(this, function(img,arr){
            imgBox.html(''); // 先清空之前的图
            upTxt.html('');
            imgBox.append(img);
            console.log(arr); // jshint ignore:line
        });
    });


});