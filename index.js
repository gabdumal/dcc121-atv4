// Estado
const embarcacaoEstado = {
  margem: "esq",
  carga: "",
};

// Captura os elementos do DOM
const embarcacao = document.querySelector("#embarcacao");
const fazendeiro = embarcacao.firstElementChild.firstElementChild;
const margemEsq = document.querySelector("#margemEsq");
const margemDir = document.querySelector("#margemDir");

// Ouvintes
fazendeiro.addEventListener("click", clickListenerFazendeiro);
function clickListenerFazendeiro() {
  // Troca de margem
  embarcacaoEstado.margem === "esq"
    ? (embarcacaoEstado.margem = "dir")
    : (embarcacaoEstado.margem = "esq");

  console.log(embarcacaoEstado);
  console.log(fazendeiro);
  //   console.log(embarcacao);
  //   console.log(margemEsq);
  //   console.log(margemDir);
}
