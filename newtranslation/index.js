const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const url = "https://api.funtranslations.com/translate/groot.json"
    
    const textToTranslate = (req.query.text || (req.body && req.body.text));
    
    let result = await fetch(url, {
        method: 'post',
        body:    JSON.stringify({text: textToTranslate}),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json());
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result.contents.translated
    };
}