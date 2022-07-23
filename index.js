// Estado
const embarcacaoEstado = {
  margem: "Esq",
  carga: "",
};

// Captura os elementos do DOM
const embarcacao = document.querySelector("#embarcacao");
const fazendeiro = embarcacao.firstElementChild.firstElementChild;
const produtos = document.querySelectorAll(".produto");

// Ouvintes
fazendeiro.addEventListener("click", clickListenerFazendeiro);
function clickListenerFazendeiro() {
  // Troca de margem
  embarcacaoEstado.margem === "Esq"
    ? (embarcacaoEstado.margem = "Dir")
    : (embarcacaoEstado.margem = "Esq");

  const margem = document.querySelector("#margem" + embarcacaoEstado.margem);
  margem.firstElementChild.appendChild(embarcacao);
}

for (const produto of produtos) {
  produto.addEventListener("click", clickListenerProduto);
}
function clickListenerProduto(event) {
  const produto = event.target;
  const valorProduto = produto.textContent;
  // Insere produto na embarcação
  if (embarcacaoEstado.carga === "") {
    embarcacaoEstado.carga = valorProduto;

    const espacoProduto = produto.parentElement;
    const carga = document.querySelector("#carga");
    carga.appendChild(produto);

    // Leva espaço vazio para o final da margem
    espacoProduto.parentElement.appendChild(espacoProduto);
  } // Remove produto da embarcação
  else if (embarcacaoEstado.carga === valorProduto) {
    console.log(embarcacaoEstado);
  }
}
