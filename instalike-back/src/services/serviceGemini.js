import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarTituloComGemini(imageBuffer) {
  const prompt =
    "Qual o título do livro na imagem? (Apenas o título, sem informação a mais.)";

  try {
    const image = {
       inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpg",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}