var http=require('http')
var cheerio=require('cheerio')
var baseUrl='http://www.imooc.com/learn/'
var videoIds=[348,259,197,134,75]

function filterChapters(html){
	var $=cheerio.load(html)
	var chapters=$('.chapter')
	var title=$('.hd .l').text()
	var number=parseInt($($('.meta-value strong')[3]).text().trim(),10)

	var courseData={
		title:title,
		number:number,
		videos:[]
	}

	courseData.title=title
	courseData.number=number
	chapters.each(function(item){
		var chapter=$(this)
		var chapterTitle=chapter.find('strong').text()
		var videos=chapter.find('.video').children('li')
		var chapterData={chapterTitle:chapterTitle,videos:[]}
		videos.each(function(item){
			var video=$(this).find('.studyvideo')
			var videoTitle=video.text()
			var videoid=video.attr('href').split('video/')[1]
			chapterData.videos.push({title:videoTitle,id:videoid})
		})
		courseData.videos.push(chapterData)
	})
	return courseData
}

function printCourseInfo(coursesData){
	console.log('printCourseInfo')
	coursesData.forEach(function(courseData){
		console.log(courseData.number+'人学过'+courseData.title)
	})
	coursesData.forEach(function(courseData){
		console.log('#####'+courseData.title+'\n')
		courseData.videos.forEach(function(item){
			console.log(item.chapterTitle+'\n')
			item.videos.forEach(function(video){
				console.log('['+video.id+'] '+video.title+'\n')
			})
		})
	})
}


function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url)
		http.get(url,function(res){
			var html=''
			res.on('data',function(data){
				html+=data
			})
			res.on('end',function(){
				resolve(html)
				console.log('爬取'+url+'成功')
			})
		}).on('error',function(e){
			reject(e)
			console.log('获取课程失败')
		})
	})
}

var fetchCourseArray=[]
videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl+id))
})

Promise
.all(fetchCourseArray)
.then(function(pages){
	var coursesData=[]
	pages.forEach(function(html){
		console.log('11111111')
		var courses=filterChapters(html)
		coursesData.push(courses)
	})
	coursesData.sort(function(a,b){
		return a.number<b.number
	})
	printCourseInfo(coursesData)
})