import { ObjectId } from "mongodb";
import conectaBD from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectaBD(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function createNewPosts(novoPost) {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Insere um novo post na coleção
    return colecao.insertOne(novoPost);
}

export async function updateNewPosts(id, novoPost) {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Pega o ID e coloca em um objeto, fazendo com que o node entenda
    const objectID = ObjectId.createFromHexString(id);
    // Insere um novo post na coleção
    //_id - Identificador do id que está no banco MongoDB
    // $set - Mandando um conjunto de dados para atualizar no post
    return colecao.updateOne({ _id: new ObjectId(objectID) }, { $set: novoPost });
}

export async function deletePost(id) {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Pega o ID e coloca em um objeto, fazendo com que o node entenda
    const objectID = ObjectId.createFromHexString(id);
    // Insere um novo post na coleção
    return colecao.deleteOne({ _id: new ObjectId(objectID) });
}