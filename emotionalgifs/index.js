var multipart = require('parse-multipart');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);
  
    var body = req.body

<<<<<<< HEAD
    var parts = multipart.Parse(body, boundary); 

    var imageData = parts[0].data 

    var convertedResult = Buffer.from(imageData).toString('base64')
    
=======
    var body = req.body

    var parts = multipart.Parse(body, boundary);

    let base64data = Buffer.from(parts[0].data).toString('base64');
   
>>>>>>> 72c9172bbf2b9eeb6ee3468eaacc19de58b6f659
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: base64data
    };
}