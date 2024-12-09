import { getAllPosts, createNewPosts, updateNewPosts, deletePost } from "../models/postsModel.js";
import fs from "fs";
import gerarTituloComGemini from "../services/serviceGemini.js";

// Função para listar todos os posts
export async function listarAllPosts(req, res) {
  // Busca todos os posts do banco de dados
  const posts = await getAllPosts();

  // Envia uma resposta HTTP 200 com os posts no formato JSON
  res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNewPosts(req, res) {
  // Extrai o corpo da requisição (dados do novo post)
  const novoPost = req.body;

  try {
    // Tenta criar um novo post no banco de dados
    const postCriado = await createNewPosts(novoPost);

    // Envia uma resposta HTTP 200 com o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro durante a criação do post
    console.error("Erro ao criar post:", erro.message);  // Log do erro para análise

    // Envia uma resposta HTTP 500 com uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na criação do post" });
  }
}

// Função para fazer upload de imagem e criar um novo post
export async function uploadImg(req, res) {
  // Cria um objeto para representar o novo post (inicialmente sem titulo e autor)
  const novoPost = {
    livro: "",
    autor: "",
    imgUrl: req.file.originalname,
  };

  try {
    // Tenta criar um novo post no banco de dados (função pode ser renomeada para clareza)
    const postCriado = await createNewPosts(novoPost);

    // Constrói o novo nome do arquivo com o ID do post e extensão .png
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo temporário para o novo nome e local
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia uma resposta HTTP 200 com o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro durante o upload ou criação do post
    console.error("Erro ao fazer upload ou criar post:", erro.message);  // Log do erro

    // Envia uma resposta HTTP 500 com uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na criação do post" });
  }
}

// Função para atualizar um post existente
export async function atualizarNewPosts(req, res) {
  // Extrai o ID do post da URL da requisição
  const id = req.params.id;

  // Constrói a URL completa da imagem baseada na rota e ID
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    // Lê o conteúdo da imagem em buffer
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

    // Gera um titulo para a imagem usando o serviço Gemini
    const livro = await gerarTituloComGemini(imgBuffer);

    // Cria um objeto com os dados atualizados do post
    const post = {
      livro: livro,
      autor: req.body.autor, // Atualiza a propriedade autor do post
      imgUrl: urlImagem,
    };

    // Tenta atualizar o post no banco de dados
    const postCriado = await updateNewPosts(id, post);

    // Envia uma resposta HTTP 200 com o post atualizado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro durante a leitura, geração de descrição ou atualização do post
    console.error("Erro ao atualizar post:", erro.message);  // Log do erro

    // Envia uma resposta HTTP 500 com uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na atualização do post" });
  }
}

// Função para excluir um post existente
export async function deletarPost(req, res) {
  // Extrai o ID do post da URL da requisição
  const id = req.params.id;

  try {
    // Tenta excluir o post no banco de dados
    await deletePost(id);

    // Envia uma resposta HTTP 200 com uma mensagem de sucesso
    res.status(200).json({ "Mensagem": "Post excluído com sucesso" });
  } catch (erro) {
    // Captura qualquer erro durante a exclusão do post
    console.error("Erro ao excluir post:", erro.message);  // Log do erro

    // Envia uma resposta HTTP 500 com uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na exclusão do post" });
  }
}