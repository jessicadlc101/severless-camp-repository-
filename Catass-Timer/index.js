const fetch = require('node-fetch');
const connectionString = process.env.catpicsconstring;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    } 
    const image = await fetch("https://cataas.com/cat")    
        .then(res => res.buffer());
        
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "catpics";
    const containerClient = blobServiceClient.getContainerClient(containerName); 
    const imageName = "cat_" + timeStamp + ".jpg";
    const blockBlobClient = containerClient.getBlockBlobClient(imageName); 
    const response = await blockBlobClient.upload(image, image.length)

    context.log('JavaScript timer trigger function ran!', timeStamp);   
};