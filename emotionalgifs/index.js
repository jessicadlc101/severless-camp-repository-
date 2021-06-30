var multipart = require('parse-multipart');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);

    var body = req.body

    var parts = multipart.Parse(body, boundary);

    let base64data = Buffer.from(parts[0].data).toString('base64');
   
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: base64data
    };
}