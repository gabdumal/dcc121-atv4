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
  console.log(produto);
}
