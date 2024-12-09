import { MongoClient } from "mongodb";

export default async function conectaBD(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao MongoDB...");
        await mongoClient.connect();
        console.log("MongoDB conectado!");

        return mongoClient;
    } catch (error) {
        console.error("Falha ao conectar ao MongoDB:", error);
        process.exit();
    }
} 