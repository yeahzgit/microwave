const configs = {
	LISTEN: 3450,//前端渲染监听端口
	REQUEST: 'http://localhost:3489',//api请求url
	PROXY_OPTIONS: {
		target: 'http://localhost:3489',
 		changeOrigin: true,
  	pathRewrite: {
    	'^/microwave/api': ''
  	}           
	}
} 

module.exports = configs;