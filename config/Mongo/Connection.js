import { MongoClient } from 'mongodb'


// Create a new MongoClient
var client = undefined;
let db = undefined;

export const connect = async function(uri){
  try{
      client = new MongoClient(uri);
      await client.connect();
      return {success: true, connection: client}
  }catch(e){
      return {success: false, connection: null, msg: "Error In Connection!!!"}
  }
}

export const testConnection = async (uri) => {
  try {
    await (new MongoClient(uri)).connect();
    return {success: true}
  }catch (e) {
    return {error: e}
  }
}

export const getDBList = async (uri) => {
  try {
    !client && (client = new MongoClient(uri)) && await client.connect()
    const dbs = await client.db("admin").admin().listDatabases()
    return {dbs}
  }catch (e) {
    return {error: e}
  }
}

export const createDB = async (name, uri) => {
  try {
    !client && (client = new MongoClient(uri)) && await client.connect()
    client.db(name).command({ping: 1})
    db = client.db(name)
    return {success: true}
  }catch (e) {
    return {error: e}
  }
}

export const getDB = async (uri, name) => {
  !client && (client = new MongoClient(uri)) && await client.connect()
  !db && (db = client.db(name))
  return db;
}

export const getConnection = async (uri) => {
  !client && (client = new MongoClient(uri)) && await client.connect()
  return client
}