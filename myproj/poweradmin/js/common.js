function getData(e,a){this.request=e.request||"GET",this.url=e.url,this.token=e.token,this.async=e.async||!0,this.contentType=e.contentType||"application/x-www-form-urlencoded; charset=UTF-8",this.data=e.data||null;var n=this;$.ajax({type:n.request,url:n.url,async:async,contentType:n.contentType,data:n.data,beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+n.token)},success:function(e){200===e.code||201===e.code?$.isFunction(a)?a(e):console.log("callbackfn is not a function"):401===e.code?ajaxError401():500===e.code?(ajaxError("发送请求的数据有误或者服务器未能正确处理"),console.log("500",e)):console.log(e)},error:function(e,a,n){switch(e.status){case 401:ajaxError401();break;case 403:ajaxError("禁止访问");break;case 404:ajaxError("请求的资源未找到");break;case 500:ajaxError("服务器出错")}console.log(e.status),console.log(a+"\n",n)}})}var apiRoot="http://58.56.187.66:9013",TOKEN=localStorage.getItem("token"),firstNodeId=0;function authToken(){$.ajax({type:"GET",url:apiRoot+"/api/web/user/top",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+TOKEN)},success:function(e){},error:function(e,a,n){if(401===e.status)return alert("验证失败,请重新登录"),!(window.location.href="login.html");console.log(a+"\n",n)}})}function getCookie(e){var a,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(a=document.cookie.match(n))?unescape(a[2]):null}function delCookie(e){var a=new Date;a.setTime(a.getTime()-36e5);var n=getCookie(e);null!=n&&(document.cookie=e+"="+n+";expires="+a.toGMTString()+";path=/")}function loadScritp(e){var a=document.createElement("script");a.type="text/javascript",a.src=e,document.getElementsByTagName("head")[0].appendChild(a)}function loadCss(e){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.href=e,document.getElementsByTagName("head")[0].appendChild(a)}function ajaxError401(){layui.use("layer",function(){var n=layui.layer;n.open({type:1,id:"ajaxErr401dialog",skin:"layer-dialog",title:"信息提示",btn:"确认",closeBtn:0,content:'<div class="dialog-content"><div style="padding: 20px;">验证失败，请重新登录</div></div>',yes:function(e,a){window.location.href="login.html",n.close(e),localStorage.getItem("menuLock")&&localStorage.removeItem("menuLock")}})})}function ajaxError(e){layui.use("layer",function(){var n=layui.layer;n.open({type:1,id:"ajaxErrdialog",skin:"layer-dialog",title:"信息提示",btn:"确认",closeBtn:0,content:'<div class="dialog-content"><div style="padding: 20px;"><p>'+e+"</p></div></div>",yes:function(e,a){n.close(e)}})})}function showLoading(){$(".main-content").append('<div id="loadingBox" class="loading-box"><div class="content-loading"><div class="loading">Loading</div></div></div>')}function hideLoading(){$(".main-content").find("#loadingBox").remove()}function loadTree(s){$("#menuTree").append('<div id="loadingBox" class="loading-box"><div class="content-loading"><div class="loading">Loading</div></div></div>'),getData({url:apiRoot+"/api/web/user/gettree",token:TOKEN,async:!1},function(e){$("#menuTree").find("#loadingBox").remove();var a=e.data;firstNodeId=a[0].id;var n=function e(a){for(var n="",s=0,o=a.length;s<o;s++){var t=0===a[s].children.length?"":'<i class="iconfont icon-expand icon-arr-menu"></i>';n+='<li><a data-menuId="'+a[s].id+'" data-pId="'+a[s].pId+'">'+a[s].name+t+"</a>",a[s].children&&(n+="<ul>",n+=e(a[s].children),n+="</ul>"),n+="</li>"}return n}(a);$("#tree-menu-wrap #tree-ul").html(n),s&&s(firstNodeId)})}function tableLoadingShow(e){e.css("display","flex")}function tableLoadingHide(e){e.css("display","none")}$(function(){localStorage.getItem("user_name")&&$(".top-right .user").find("span").text("hello，"+localStorage.getItem("user_name")),$("#quit").on("click",function(){delCookie("QCuserName"),delCookie("QCpassword"),localStorage.removeItem("token"),localStorage.removeItem("user_name"),localStorage.removeItem("menuLock"),window.location.href="login.html"}),$("#accordion").find("li").each(function(){var e=$(this).data("menuid"),a=$(this).data("pid");if("undefined"!=typeof menuId&&(menuId==e&&$(this).addClass("cur"),a&&menuId==e)){var n=$(this).parent(".submenu").parent("li"),s=(n.data("menuid"),$(this).children("a").text()),o=n.children(".nav_link").find(".nav-text").text();n.addClass("cur"),$("#menuBread ul").html("<li>"+o+"</li><li>"+s+"</li>")}});var e=localStorage.getItem("menuLock");function n(){$("#listenInput").focus(),$("#listenInput").val(1),$("#listenInput").blur()}e&&1==e&&($(".navLeft").removeClass("pinch"),$(".main-content").removeClass("spreadMd").addClass("spreadXs"),$("#lockMenu").addClass("locked"),$("#lockMenu").children(".iconfont").addClass("icon-lock").removeClass("icon-lock-open"),setTimeout(n,300)),$(".navLeft").hover(function(){$("#lockMenu").hasClass("locked")||$(this).removeClass("pinch")},function(){$("#lockMenu").hasClass("locked")||($(this).addClass("pinch"),$("#accordion li").children(".submenu").hide())}),$("#lockMenu").on("click",function(){n();var e=$(".main-content");$(this).hasClass("locked")?(localStorage.setItem("menuLock",0),$(this).removeClass("locked"),$(this).children(".iconfont").removeClass("icon-lock").addClass("icon-lock-open"),e.addClass("spread"),$("#menuTree").hasClass("colls")?e.addClass("spread").removeClass("spreadXs spreadMd"):e.addClass("spreadMd").removeClass("spread spreadXs")):(localStorage.setItem("menuLock",1),$(".navLeft").removeClass("pinch"),e.removeClass("spread"),$(this).addClass("locked"),$(this).children(".iconfont").addClass("icon-lock").removeClass("icon-lock-open"),$("#menuTree").hasClass("colls")?e.removeClass("spread spreadXs spreadMd"):e.addClass("spreadXs").removeClass("spread spreadMd"))}),$("#menuTog").on("click",function(){n();var e=$("#menuTree"),a=$(".main-content");e.hasClass("colls")?(e.removeClass("colls"),$(this).removeClass("fixleft"),$(".navLeft").hasClass("pinch")?a.addClass("spreadMd").removeClass("spread spreadXs"):a.addClass("spreadXs").removeClass("spread spreadMd")):(e.addClass("colls"),$(this).addClass("fixleft"),$(".navLeft").hasClass("pinch")?a.addClass("spread").removeClass("spreadMd spreadXs"):a.removeClass("spread spreadXs spreadMd"))});var a=function(e,a){this.el=e||{},this.multiple=a||!1,this.el.find(".nav_link").on("click",{el:this.el,multiple:this.multiple},this.dropdown)};a.prototype.dropdown=function(e){var a;e.data.el;$this=$(this),$next=$this.next(),$(".wrapper").hasClass("fold")?((a=$this).toggleClass("active").parents("li").siblings("li").find(".nav_link").removeClass("active"),a.hasClass("active")?($("#submenu2 ul").hide(),$('#submenu2 ul[data-navkey="'+a.data("navkey")+'"]').show()):$("#submenu2 ul").hide()):($(".submenu").stop().slideUp("fast"),$next.stop().slideToggle(),$this.toggleClass("iconCur").parent("li").siblings("li").find(".nav_link").removeClass("iconCur"));var n=$this.parent().index();$this.parent().toggleClass(n)};new a($("#accordion"),!1);0<$("#menuTree").length&&$("#menuTree").on("click","ul>li a",function(){$(this).children(".icon-arr-menu").toggleClass("exspand");$(this).next().toggle()})});