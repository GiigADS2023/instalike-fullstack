import express from "express";
import multer from "multer";
import cors from "cors";
import { listarAllPosts, postarNewPosts, uploadImg, atualizarNewPosts, deletarPost } from "../controllers/postsControllers.js";

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, 
};


const storage = multer.diskStorage({
    // Define a configuração de armazenamento para o Multer.
    // Essa configuração especifica onde os arquivos serão salvos e como serão nomeados.

    // destination: Define o diretório de destino para os arquivos carregados.
    // Neste caso, todos os arquivos serão salvos na pasta 'uploads/'.
    destination: function (req, file, cb) {
        // A função de callback é chamada com dois argumentos:
        // - null: Indica que não houve erro.
        // - 'uploads/': O caminho completo para o diretório de destino.
        cb(null, 'uploads/');
    },

    // filename: Define o nome do arquivo que será salvo.
    // Por padrão, o nome original do arquivo será mantido.
    filename: function (req, file, cb) {
        // A função de callback é chamada com dois argumentos:
        // - null: Indica que não houve erro.
        // - file.originalname: O nome original do arquivo enviado.
        cb(null, file.originalname);
    }
});
    
const upload = multer({ dest: './uploads/', storage});

const routes = (app) => {
    // Habilita o parser JSON para lidar com requisições JSON
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota GET para obter todos os posts
    app.get("/posts", listarAllPosts);

    // Rota POST para criar um novo post
    app.post("/posts", postarNewPosts); // Chama a função para criar um novo post

   // Rota para upload de imagem (Assumindo uma única imagem chamada) 
    app.post("/upload", upload.single("imagem"), uploadImg); // Chama a função para upload de imagem

    // Rota PUT para atualizar um post existente
    app.put("/upload/:id", atualizarNewPosts);

    // Rota DELETE para excluir um post existente
    app.delete("/posts/:id", deletarPost);
};

export default routes;