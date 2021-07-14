const querystring = require('querystring'); 
const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.ENDPOINT,
    key: process.env.KEY,
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {kind: "Hash", paths: ["/secrets"]}
  };
  
  module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
   
    const queryObject = querystring.parse(req.body);

    let message = queryObject.Body;

    let document = {"message" : message}

    let items = await createDocument(document)
    
    const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[0].message)}`

  async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;
  
    const { database } = await client.databases.createIfNotExists({
      id: config.databaseId
    });
    
    console.log(`Created database:\n${database.id}\n`);
  
    const { container } = await client
      .database(databaseId)
      .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
      );
  
    console.log(`Created container:\n${container.id}\n`);
  }
  async function createDocument(newItem) { 
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });
    
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    await create(client, databaseId, containerId); 
    
    const querySpec = { 
        query: "SELECT top 1 * FROM c order by c._ts desc"
       }; 

    const { resources: items } = await container.items.query(querySpec).fetchAll(); 
    const {resource: createdItem} = await container.items.create(newItem);
      
    return items
  }
  
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}