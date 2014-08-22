var page = chrome.extension.getBackgroundPage();
$(function(){
     var config=page.getConfig();
	if(config.mode=="direct"){
		$("#option").val(1);
		$("#proxySetting").hide();
	}else{
	   $("#option").val(2);
	   $("#proxySetting").show();
	   $("#host").val(config.host);
	   $("#port").val(config.port);
	}
})

$("#option").click(function(){
	if($(this).val()==2){
		$("#proxySetting").show();
	}else{
		$("#proxySetting").hide();
	}
});

$("#saveBtn").click(function(){
	if($("#option").val()==2){
		var host=$("#host").val();
		var ipR=/((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;//ip正则表达式
		var domainR=/([a-zA-Z0-9]{1,20}\.){2}[a-zA-Z0-9]{1,20}/;//域名正则表达式
		if(host=="localhost"||ipR.test(host)||domainR.test(host)){
			var port=$("#port").val();
			if(/\d{1,5}/.test(port)&&(+port)<65535){
				page.connectByProxy(host,Number(port));
			}else{
				alert("端口有误");
			}
		}else{
			alert("地址有误");
		}
	}else{
		page.connectDirect();
	}
	alert("设置生效");
});