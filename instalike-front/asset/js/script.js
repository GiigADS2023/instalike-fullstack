const form = document.getElementById("bookForm");
const submitBtn = document.getElementById("submitBtn");
const bookList = document.getElementById("bookList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data) {
      alert("Livro cadastrado com sucesso!");
      displayBooks();
    }
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
  }
});

async function displayBooks() {
  try {
    const response = await fetch("http://localhost:3000/posts");
    const books = await response.json();

    books.reverse();

    bookList.innerHTML = "";
    books.forEach((book) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Título:</strong> ${book.livro}<br>
        <strong>Autor:</strong> ${book.autor}<br>
        <img src="${book.imgUrl}" alt="Imagem do livro" style="width: 100px; height: 150px;">
        <button onclick="editBook('${book._id}', '${book.autor}')">Editar</button>
        <button onclick="deleteBook('${book._id}')">Excluir</button>
      `;
      bookList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
  }
}

async function editBook(id, currentAuthor) {
  const author = prompt("Informe o autor:", currentAuthor);
  if (author !== null) {
    try {
      const response = await fetch(`http://localhost:3000/upload/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ autor: author }),
      });
      const data = await response.json();
      if (data) {
        alert("Livro atualizado com sucesso!");
        displayBooks();
      }
    } catch (error) {
      console.error("Erro ao editar livro:", error);
    }
  }
}

async function deleteBook(id) {
  const confirmDelete = confirm("Tem certeza de que deseja excluir este livro?");
  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Livro excluído com sucesso!");
        displayBooks();
      } else {
        alert("Erro ao excluir livro!");
      }
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  }
}

// Carregar os livros ao carregar a página
window.onload = displayBooks;