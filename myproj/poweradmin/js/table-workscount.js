var nodeId=0,ajaxStime="",ajaxEtime="";layui.use(["laydate","table","layer","form"],function(){var e=layui.laydate,t=layui.table;layui.form;lay(".time-range").each(function(){e.render({elem:this,type:"datetime",format:"yyyy-MM-dd HH:mm",isInitValue:!0,range:!0,done:function(e){console.log(e)}})}),$(".select-time").each(function(){var e=$(this).parent().next(".select-date");e.children(".time-range");$(this).on("change",function(){$(this).is(":checked")?e.removeClass("tchide"):e.addClass("tchide")})});t.render({id:"compareTable",elem:"#compare",cols:[[{field:"workshift",title:"班次"},{field:"deviceName",title:"设备名称"},{field:"total",title:"总用电量"},{field:"time1",title:"1:00"},{field:"time2",title:"2:00"},{field:"time3",title:"3:00"},{field:"time4",title:"4:00"},{field:"time5",title:"5:00"},{field:"time6",title:"6:00"},{field:"time7",title:"7:00"},{field:"time8",title:"8:00"},{field:"time9",title:"9:00"}]],data:[{workshift:"班次1",deviceName:"设备1",total:"45645"},{workshift:"班次2",deviceName:"设备2",total:"54646"}],done:function(){}}),t.render({id:"electricityTable",elem:"#electricity",cols:[[{field:"id",title:"序号"},{field:"one",title:"一级"},{field:"two",title:"二级"},{field:"electricNumber",title:"电表编号"},{field:"startTime",title:"起始时间"},{field:"startElectric",title:"抄表电量"},{field:"endTime",title:"结束时间"},{field:"endElectric",title:"抄表电量"},{field:"toadyElectric",title:"当天用电量"},{field:"monthElectric",title:"本月累计用电量"}]],data:[{id:1,one:"车间",two:"压力机",electricNumber:"007",startTime:"2018-08-08",startElectric:"45461",endTime:"2018-08-09",endElectric:"454261",toadyElectric:"45467261",monthElectric:"454657261"},{id:2,one:"车间",two:"压力机",electricNumber:"007",startTime:"2018-08-08",startElectric:"45461",endTime:"2018-08-09",endElectric:"454261",toadyElectric:"45467261",monthElectric:"454657261"}],done:function(){}})});