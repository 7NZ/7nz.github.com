layui.use(["laydate","table","layer","form"],function(){var e=layui.laydate,t=layui.table;layui.form;lay(".time-range").each(function(){e.render({elem:this,type:"datetime",format:"yyyy-MM-dd HH:mm",isInitValue:!0,range:!0,done:function(e){console.log(e)}})}),$(".select-time").each(function(){var e=$(this).parent().next(".select-date");e.children(".time-range");$(this).on("change",function(){$(this).is(":checked")?e.removeClass("tchide"):e.addClass("tchide")})});t.render({id:"originalTable",elem:"#original",cols:[[{field:"id",title:"序号"},{field:"datetime",title:"时间日期"},{field:"device",title:"设备名称"},{field:"voltage",title:"电压"},{field:"electric",title:"电流"},{field:"powerFactor",title:"功率因数"},{field:"harmonic",title:"谐波"},{field:"temperature",title:"温度"}]],data:[{id:1,datetime:"2018-08-08",device:"XXX",voltage:"213",electric:"1234",powerFactor:"213",harmonic:"224413",temperature:"45"},{id:2,datetime:"2018-08-08",device:"XXX",voltage:"213",electric:"1234",powerFactor:"213",harmonic:"224413",temperature:"45"}],done:function(){}})});