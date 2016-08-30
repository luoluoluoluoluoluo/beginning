var fs=require('fs')

fs.readFile('logo.png',function(err,origin_image){
	console.log(Buffer.isBuffer(origin_image))

	fs.writeFile('logo_buffer.png',origin_image,function(err){
		if(err) console.log(err)
	})

	var base64Image=origin_image.toString('base64')

	console.log(base64Image)

	var decodedImage=new Buffer(base64Image,'base64')
	console.log(Buffer.compare(origin_image,decodedImage))

	fs.writeFile('logo_decoded.png',decodedImage,function(err){
		if(err) console.log(err)
	})
})