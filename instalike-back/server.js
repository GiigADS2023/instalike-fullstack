import express from "express";
import routes from "./src/routes/postsRoute.js";

const app = express();
// Abre a pasta uploads e acessa e servir serviços estáticos
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// function buscarPostsPorID(id) {
//     return posts.findIndex((post) => post.id === Number(id));
// }

// // req - requisição
// // res - resposta
// // O método req.params.id funciona no Express.js como uma forma de acessar os parâmetros enviados na URL que seguem um padrão definido na rota.
// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostsPorID(req.params.id); 
//     if (index === -1) {
//         res.status(404).json({ error: "Post não encontrado" });
//     } else {
//         res.status(200).json(posts[index]);
//     }
// });