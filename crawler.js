var http=require('http')
var cheerio=require('cheerio')
var url='http://www.imooc.com/learn/348'

function filterChapters(html){
	var $=cheerio.load(html)
	var chapters=$('.chapter')
	var courseData=[]
	chapters.each(function(item){
		var chapter=$(this)
		var chapterTitle=chapter.find('strong').text()
		var videos=chapter.find('.vedio').children('li')
		var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		}
		videos.each(function(item){
			var video=$(this).find('.J-media-item')
			var videoTitle=video.text()
			var id=$(this).attr('href').split('video/')[1]
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})
		courseData.push(chapterData)
	})
	return courseData
	
}
function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle=item.chapterTitle
		var ved=item.videos.title
		console.log(ved+'\n')
		console.log(chapterTitle+'\n')
		item.videos.forEach(function(video){
			// var id=item.id,
			// var videoTitle=item.videoTitle
			console.log(' ['+ video.id +'] '+ video.title +'\n')
		})
	})
}

http.get(url,function(res){
	var  html=''
	res.on('data',function(data){
		html+=data
	})
	res.on('end',function(){
		var courseData=filterChapters(html)
		printCourseInfo(courseData)
	})
}).on('error',function(){
	console.log('获取课程数据出错！')
})