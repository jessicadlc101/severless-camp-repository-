var multipart = require('parse-multipart'); 
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);

    var body = req.body

    var parts = multipart.Parse(body, boundary);

    var result = await analyzeImage(imageData);
    context.res = {
	body: {
		    result
	  }
    
    };
    console.log(result)
    context.done(); 
    
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect'; 
    
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     
    
    })
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  
        body: img,  
      
        headers: {
            'Content-Type': 'application-octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    }) 
let emotionData = await resp.json() 
return emotionData
}
