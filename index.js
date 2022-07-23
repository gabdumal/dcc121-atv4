// Estado
const embarcacaoEstado = {
  margem: "esq",
  carga: "",
};

// Captura os elementos do DOM
const embarcacao = document.querySelector("#embarcacao");
const margemEsq = document.querySelector("#margemEsq");
const margemDir = document.querySelector("#margemDir");

// Ouvintes
embarcacao.addEventListener("click", clickListenerEmbarcacao);
function clickListenerEmbarcacao() {
  console.log(embarcacao);
  console.log(margemEsq);
  console.log(margemDir);
}
