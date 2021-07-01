var multipart = require('parse-multipart');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body 
    var parts = mutlipart.Parse(body, boundary); 
    var image = parts[0].data 

    var result = await analyzeImage(imageData)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result 
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
            'Content-type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': SUBSCRIPTIONKEY
        }

    })
    let emotionData = await resp.json(); 
    
    return emotionData;  
}