const fetch = require('node-fetch')

module.exports = async function (context, myTimer) {
    
    let result = await fetch('https://cataas.com/cat').then(res => res.blob()) 
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};