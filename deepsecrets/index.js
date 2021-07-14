const querystring = require('querystring'); 
const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.ENDPOINT,
    key: process.env.KEY,
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {kind: "Hash", paths: ["/secrets"]}
  };
  const config = require("../config");
  const CosmosClient = require("@azure/cosmos").CosmosClient;
  
  async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;
  
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
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

       const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll(); 

        const { resources: createdItem } = await container.items.query(querySpec).fetchAll();

        return items
  }
  module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    
    let newMessage = { 
        "message" : queryObject.Body 
    }
    let items = await createDocument(newMessage); 
    
    const responseMessage = `Thanks 😊! Stored your secret "${queryObject.Body}". 😯 Someone confessed that: ${JSON.stringify(items[0].message)}`

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}