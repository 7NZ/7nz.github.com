var themeConfig={colors:{chartBg:"transparent",axisLineC:"#ebeef0",xAxisLabelC:"#99a8bf",yAxisLabelC:"#4a4b56",legendC:"#333",legendC2:"#646487"}};$(".maxDemandAnalysis .tc-select").on("change",function(){var e={},a="";switch(Number($(this).val())){case 0:e={lastmonth:"上月",month:"本月"};break;case 1:e={yesterday:"昨日",day:"今日"}}for(var t in e)a+='<label class="radio-im"><input class="tc-radio" data-val="'+t+'" type="radio" name="datetype" data-value="lastmonth"><span class="radioInput"></span><span class="">'+e[t]+"</span></label>";$(".radio-im-var").empty().append(a).find(".radio-im:first-child .tc-radio").trigger("click")});var dateList=[],dateList2=[],valueList=[],valueList2=[],valueList3=[],valueList4=[],data=[["00:00",116],["00:30",129],["01:00",135],["01:30",186],["02:00",173],["02:30",85],["03:00",73],["02:30",68],["03:00",92],["03:30",130],["04:00",245],["04:30",139],["05:00",115],["05:30",111],["06:00",309],["06:30",206],["07:00",137],["07:30",128],["08:00",185],["08:30",294],["09:00",271],["09:30",106],["10:00",84],["10:30",93],["11:00",85],["11:30",73],["12:00",83],["12:30",125],["13:00",107],["13:30",182],["14:00",164],["14:30",122],["15:00",106],["15:30",107],["16:00",66],["16:30",91],["17:00",92],["17:30",113],["18:00",107],["18:30",131],["19:00",111],["19:30",64],["20:00",69],["20:30",88],["21:00",177],["21:30",183],["22:00",111],["22:30",157],["23:00",55],["23:30",60]],data2=[["00:00",106],["00:30",120],["01:00",125],["01:30",116],["02:00",173],["02:30",95],["03:00",83],["02:30",78],["03:00",82],["03:30",120],["04:00",245],["04:30",131],["05:00",125],["05:30",101],["06:00",209],["06:30",106],["07:00",157],["07:30",168],["08:00",185],["08:30",194],["09:00",171],["09:30",106],["10:00",94],["10:30",93],["11:00",75],["11:30",83],["12:00",93],["12:30",105],["13:00",117],["13:30",112],["14:00",144],["14:30",172],["15:00",156],["15:30",137],["16:00",96],["16:30",81],["17:00",82],["17:30",103],["18:00",117],["18:30",121],["19:00",191],["19:30",84],["20:00",89],["20:30",98],["21:00",107],["21:30",121],["22:00",141],["22:30",157],["23:00",75],["23:30",80]],maxDemandAnalysis1=(dateList=data.map(function(e){return e[0]}),valueList=data.map(function(e){return e[1]}),valueList2=data2.map(function(e){return e[1]}),valueList3=data2.map(function(e){return e[1]*Math.ceil(2*Math.random())}),echarts.init(document.getElementById("maxDemandAnalysis1"))),option={backgroundColor:themeConfig.colors.chartBg,color:["#f87761","#02ffed"],title:{text:"最大需量（kw）",fontSize:16,left:30,top:17,textStyle:{color:"#fff"}},grid:{top:"20%",bottom:"5%",left:"3%",right:"3%",containLabel:!0},legend:{align:"right",top:17,right:80,textStyle:{color:themeConfig.colors.legendC},data:["最大需求量","参考值"]},tooltip:{trigger:"axis",padding:0,axisPointer:{type:"cross",label:{backgroundColor:themeConfig.colors.legendC}},formatter:function(e){for(var a='<div class="chartTooltip"><div class="trang blue"></div>',t=0;t<e.length;t++)a+=e[t].seriesName+"："+e[t].value+"A<br/>";return a+="</div>"}},xAxis:[{axisLabel:{color:themeConfig.colors.xAxisLabelC},axisLine:{lineStyle:{color:themeConfig.colors.axisLineC}},data:dateList}],yAxis:[{nameTextStyle:{color:themeConfig.colors.legendC},axisLine:{show:!1,lineStyle:{color:themeConfig.colors.axisLineC}},axisLabel:{color:themeConfig.colors.yAxisLabelC},splitLine:{show:!0,lineStyle:{color:themeConfig.colors.axisLineC}}}],series:[{name:"最大需求量",type:"line",symbolSize:8,itemStyle:{color:"#f4552b"},lineStyle:{color:"#f4552b",width:3},data:valueList},{name:"参考值",type:"line",symbolSize:8,itemStyle:{color:"#07d4b7"},lineStyle:{color:"#07d4b7",width:3},data:valueList2}]};maxDemandAnalysis1.setOption(option);var maxDemandAnalysis2=echarts.init(document.getElementById("maxDemandAnalysis2")),option2={backgroundColor:themeConfig.colors.chartBg,color:["#f87761","#02ffed"],title:{text:"最大需量时间分布",fontSize:16,left:30,top:17,textStyle:{color:"#fff"}},grid:{top:"20%",bottom:"5%",left:"3%",right:"3%",containLabel:!0},legend:{align:"right",top:17,right:80,textStyle:{color:themeConfig.colors.legendC},data:["最大需量发生时间"]},tooltip:{trigger:"axis",padding:0,axisPointer:{type:"cross",label:{backgroundColor:themeConfig.colors.legendC}},formatter:function(e){for(var a='<div class="chartTooltip"><div class="trang blue"></div>',t=0;t<e.length;t++){var i=0,o=0;60<(i=parseInt(e[t].value))&&(o=parseInt(i/60),i=parseInt(i%60)),o<10&&(o="0"+o),i<10&&(i="0"+i),a+='<p class="val">'+o+":"+i+"</p>"+e[t].axisValue}return a+="</div>"}},xAxis:[{axisLabel:{color:themeConfig.colors.xAxisLabelC},axisLine:{lineStyle:{color:themeConfig.colors.axisLineC}},data:dateList}],yAxis:[{name:"",type:"value",nameTextStyle:{color:themeConfig.colors.legendC},max:1440,axisLine:{show:!1,lineStyle:{color:themeConfig.colors.axisLineC}},axisLabel:{formatter:function(e){var a=0,t=0;return 60<(a=parseInt(e))&&((t=parseInt(a/60))<10&&(t="0"+t),(a=parseInt(a%60))<10&&(a="0"+a)),t+":"+a},color:themeConfig.colors.yAxisLabelC},splitLine:{show:!0,lineStyle:{color:themeConfig.colors.axisLineC}}}],series:[{name:"最大需量发生时间",type:"line",itemStyle:{color:"#4b8bf4"},lineStyle:{width:3},smooth:!0,symbolSize:8,areaStyle:{normal:{type:"default",color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#4b8bf4"},{offset:1,color:"rgba(0,0,0,.5)"}],!1)}},data:valueList2}]};function lineData(e){if(maxDemandAnalysis1.showLoading(),maxDemandAnalysis2.showLoading(),dateList=[],dateList2=[],valueList=[],valueList2=[],valueList3=[],valueList4=[],e){var a=$(".added").data("menuid");getData({request:"GET",url:apiRoot+("/api/web/maximum/"+e+"/"+a),token:TOKEN},function(e){for(var a=e.data.maxList,t=e.data.distributionList,i=a.length-1;0<=i;i--)dateList.push(a[i].coordinate),valueList.push(a[i].referenceValue),valueList2.push(a[i].value);for(i=t.length-1;0<=i;i--)dateList2.push(t[i].coordinate),valueList3.push(Number(60*t[i].value.split(":")[0])+Number(t[i].value.split(":")[1]));option.xAxis[0].data=dateList,option.series[0].data=valueList,option.series[1].data=valueList2,option2.xAxis[0].data=dateList2,option2.series[0].data=valueList3,maxDemandAnalysis1.setOption(option,!0),maxDemandAnalysis2.setOption(option2,!0),maxDemandAnalysis1.hideLoading(),maxDemandAnalysis2.hideLoading()})}}function chartsRsize(){maxDemandAnalysis1.resize(),maxDemandAnalysis2.resize()}maxDemandAnalysis2.setOption(option2),$("#menuTree").contextMenu({selector:"a",items:{firstCommand:{name:"选择",icon:"set",className:"contextmenu-set",callback:function(e,a,t){$(".added").removeClass("added"),$(this).addClass("added")}}}}),$("#btnQuery").on("click",function(){if(dateList=[],dateList2=[],valueList=[],valueList2=[],valueList3=[],valueList4=[],maxDemandAnalysis1.showLoading(),maxDemandAnalysis2.showLoading(),""!=$(".time-range").val())$(".added").data("menuid")}),$("body").on("change",'input[name="datetype"]',function(){var e=$("input[name='datetype']:checked").data("value");switch(ajaxStyle=e,$(".chart-nodata").remove(),e){case"lastmonth":case"month":$(".select-date").addClass("tchide");break;case"custom":$(".select-date").removeClass("tchide"),$(".time-range").val(""),layui.use(["laydate","layer"],function(){var e=layui.laydate;lay(".time-range").each(function(){e.render({elem:this,type:"datetime",format:"yyyy-MM-dd HH:mm",isInitValue:!0,range:!0,done:function(e){}})})}),ajaxStime="",ajaxEtime="",screenType=3}}),window.addEventListener("resize",function(){chartsRsize()}),$("#listenInput").on("blur change",function(){setTimeout(function(){chartsRsize()},300)});