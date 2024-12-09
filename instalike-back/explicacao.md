Async: Indica que uma função pode levar tempo para ser concluída.

Await: Pausa a execução da função até que uma tarefa assíncrona termine.

Exemplo:
async function fazerCafe() {
  const cafePronto = await prepararCafe(); // Aguarda o café ser preparado
  return cafePronto;
}

Multer é um middleware para Node.js que facilita o upload de arquivos 
para aplicações web. Ele permite que você receba arquivos enviados 
através de formulários HTML e os armazene em um local específico no 
seu servidor.