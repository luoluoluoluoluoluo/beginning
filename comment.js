var http=require('http')
var querystring=require('querystring')

var postData=querystring.stringify({
	'content':'老师辛苦了',
	'cid':348
})

var options={
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'post',
	headers:{		
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=b01fcc6c-4f8d-4266-b8a9-3d1bdb7145d6; imooc_isnew_ct=1464403217; PHPSESSID=si2r89l1h6jh3qk3d5rkod35s6; loginstate=1; apsid=JjNTUwMDEzZmEwNTBjODM2MmVkMTE1Yjk2OGI4MDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzQzMTk2OQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2MzU3MTQyNzRAcXEuY29tAAAAAAAAAAAAAAAAAAAAADlkYTVjYTc1ZjVhY2FmMGM5YmJmM2ZiN2ExYTExMjJhR7GaV0exmlc%3DNW; last_login_username=635714274%40qq.com; jwplayer.volume=100; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1469232612,1469441095,1469839361; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1470056440; imooc_isnew=2; cvde=5792b5e0d97b4-371',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log('Status:'+res.statusCode)
	console.log('headers:'+JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunck)
	})

	res.on('end',function(){
		console.log('评论完毕！')
	})
})

req.on('error',function(e){
	console.log('error:'+e.message)
})

req.write(postData)
req.end()