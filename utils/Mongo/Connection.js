import { MongoClient } from 'mongodb'


// Create a new MongoClient
let uriConnect = undefined
let client = undefined;
let db = undefined;

export const connect = async function(uri){
  try{
      client = new MongoClient(uri);
      await client.connect();
      return {isConnected: true, connection: client, msg: "Database Connected!!!"}
  }catch(e){
      return {isConnected: false, connection: null, msg: "Error In Connection!!!"}
  }
}

export const createDB = async (name) => {
  try {
    client.db(name).command({ping: 1})
    db = client.db(name)
    return {success: true}
  }catch (e) {
    return {error: e}
  }
}

export const getDB = () => {
  return db;
}

export const getConnection = async () => {
  return client
}

export const getConnectionsData = async () => {
  const connections = require('../../public/connections.json')
  return connections
}