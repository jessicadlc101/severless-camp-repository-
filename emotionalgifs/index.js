var multipart = require('parse-multipart'); 
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body
    var parts = multipart.Parse(body, boundary); 
    var image= parts[0].data

    var result = await analyzeImage(image);
    
    context.res = {
	    body: {result}
    }; 
}

async function analyzeImage(img){
    const subscriptionKey = process.env.FACEAPI_KEY1;
    const uriBase = process.env.FACEAPI_ENDPOINT + '/face/v1.0/detect'; 
    
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     
    
    })
    
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  
        body: img,  
      
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    }) 
    let emotionData = await resp.json(); 

    return emotionData;
}
