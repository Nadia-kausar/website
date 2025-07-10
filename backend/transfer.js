import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// ✅ Load environment variables
dotenv.config();

// ✅ Get values from .env
const localUri = process.env.LOCAL_MONGODB_URI;
const atlasUri = process.env.ATLAS_MONGODB_URI;
const localDbName = process.env.LOCAL_DB_NAME;
const atlasDbName = process.env.ATLAS_DB_NAME;

async function transferCollections() {
  try {
    // ✅ Confirm variables loaded
    if (!localUri || !atlasUri || !localDbName || !atlasDbName) {
      throw new Error("Missing environment variables. Check your .env file.");
    }

    console.log("🚚 Connecting to databases...");

    // ✅ Connect to local and atlas
    const localClient = new MongoClient(localUri);
    const atlasClient = new MongoClient(atlasUri);

    await localClient.connect();
    await atlasClient.connect();

    console.log("✅ Connected to local and Atlas DBs");

    // ✅ Get DB references
    const localDb = localClient.db(localDbName);
    const atlasDb = atlasClient.db(atlasDbName);

    // ✅ List all collections from local DB
    const collections = await localDb.listCollections().toArray();

    for (const col of collections) {
      const colName = col.name;
      console.log(`➡️ Transferring: ${colName}`);

      const docs = await localDb.collection(colName).find().toArray();

      if (docs.length > 0) {
        await atlasDb.collection(colName).insertMany(docs);
        console.log(`✅ ${docs.length} docs transferred to Atlas: ${colName}`);
      } else {
        console.log(`⚠️ ${colName} is empty, skipped.`);
      }
    }

    // ✅ Close connections
    await localClient.close();
    await atlasClient.close();

    console.log("🎉 Transfer complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Transfer failed:", err);
    process.exit(1);
  }
}

transferCollections();
