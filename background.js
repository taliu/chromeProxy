var config = {
    mode: "direct",
    rules: {
        proxyForHttp: {
            scheme: "http",
            host: "127.0.0.1",
            port: 8899
        }
    }
};

function getConfig(){
	return {
    mode: config.mode,
	host:config.rules.proxyForHttp.host,
	port: config.rules.proxyForHttp.port
	};
}

function connectByProxy(host,port){
  config.mode="fixed_servers";
  config.rules.proxyForHttp.host=host;
  config.rules.proxyForHttp.port=port;
  setConfig(config);
}

function connectDirect(){
 config.mode="direct";
 setConfig(config);
}

function setConfig(config){
	chrome.proxy.settings.set(
		{value: config},
		function(args) {
		console.log("代理配置成功:",args);
	});
}