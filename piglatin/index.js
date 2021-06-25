var piglatin = require("pig-latin"); 
var jokes = require("awesome-dev-jokes"); 



module.exports = async function (context, req) {
    var joke = jokes.getRandomJoke(); 
    var translated = piglatin (joke);
    var responseMessage = "joke: " + joke + "\ntranslated: " + translated;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}