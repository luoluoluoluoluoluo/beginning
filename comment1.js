var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
'content': '一起期待下一期的课程',
'cid': 348
})

var options = {
hostname: 'www.imooc.com',
port: 80,
path: '/course/document',
method: 'post',
headers: {
'Accept':'application/json, text/javascript, */*; q=0.01',
'Accept-Encoding':'gzip, deflate',
'Accept-Language':'zh-CN,zh;q=0.8',
'Connection':'keep-alive',
'Content-Length': postData.length,
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
'Cookie':'imooc_uuid=2dea75f6-b69a-40c0-8003-f591fd1ba8b3; imooc_isnew_ct=1469328242; loginstate=1; apsid=I3ZjQxYzNhOTRkOGNjYjgwOWI1MWFjOTc5YTViMWEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjY1NTE5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyODExMDYwOTE2QHFxLmNvbQAAAAAAAAAAAAAAAAAAAGMyNTI3NDFlMjkxNGQyMzZiOTViMjE5OWU0M2JlMWU4ti2UV7YtlFc%3DOW; last_login_username=2811060916%40qq.com; IMCDNS=0; PHPSESSID=t2ta2s0ha8drp2o4a79bg9gnm3; jwplayer.qualityLabel=è¶æ¸; cvde=5796f0bf4a96e-28; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1469273206,1469328245,1469328346,1469509822; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1469539322; imooc_isnew=2',
'Host':'t.imooc.com',
'Origin':'http://t.imooc.com',
'Referer':'http://t.imooc.com/comment/348',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
'X-Requested-With':'XMLHttpRequest'
}
}

var req = http.request(options, function (res) {
console.log('Status:' + res.statusCode)
console.log('headers:' + JSON.stringify(res.headers))

res.on('data', function(chunk) {
console.log(Buffer.isBuffer(chunk))
console.log(typeof chunk)
});

res.on('end', function() {
console.log('评论完毕');
})
 })

req.on('error', function() {
console.log('Error: ' + e.message);
})

req.write(postData)
req.end()