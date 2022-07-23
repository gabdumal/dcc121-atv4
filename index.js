// Estado
const embarcacaoEstado = {
  margem: "Esq",
  carga: "",
};
const produtosEstado = {
  Esq: ["🐺", "🐏", "🥬"],
  Barco: [],
  Dir: [],
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

  verificaVitoria();
}

for (const produto of produtos) {
  produto.addEventListener("click", clickListenerProduto);
}
function clickListenerProduto(event) {
  const produto = event.target;
  const valorProduto = produto.textContent;

  // Insere produto na embarcação
  if (
    embarcacaoEstado.carga === "" &&
    "margem" + embarcacaoEstado.margem ===
      produto.parentElement.parentElement.id
  ) {
    // Atualiza estado
    embarcacaoEstado.carga = valorProduto;
    let indiceProduto =
      produtosEstado[embarcacaoEstado.margem].indexOf(valorProduto);
    if (indiceProduto !== -1) {
      produtosEstado[embarcacaoEstado.margem].splice(indiceProduto, 1);
    }
    produtosEstado.Barco.push(valorProduto);

    const espacoProduto = produto.parentElement;
    const carga = document.querySelector("#carga");

    carga.appendChild(produto);
    // Leva espaço vazio para o final da margem
    espacoProduto.parentElement.appendChild(espacoProduto);
  } // Remove produto da embarcação
  else if (embarcacaoEstado.carga === valorProduto) {
    const margem = document.querySelector("#margem" + embarcacaoEstado.margem);
    const espacoProduto = margem.lastElementChild;

    espacoProduto.appendChild(produto);
    // Leva último espaço para a segunda posição
    margem.insertBefore(espacoProduto, margem.children[1]);

    // Atualiza estado
    embarcacaoEstado.carga = "";
    produtosEstado[embarcacaoEstado.margem].push(valorProduto);
    produtosEstado.Barco.pop();
  }
  verificaVitoria();
}

function verificaVitoria() {
  const situacao = verificaVitoriaAux();
  if (situacao === -1) console.log("Derrota");
  else if (situacao === 1) console.log("Vitória");
}

function verificaVitoriaAux() {
  if (produtosEstado.Dir.length === 3) return 1;
  let margens = [[...produtosEstado.Esq], [...produtosEstado.Dir]];
  let aux = "Esq";
  for (const margem of margens) {
    if (aux != embarcacaoEstado.margem && margem.length === 2) {
      if (
        (margem.includes("🐺") && margem.includes("🐏")) ||
        (margem.includes("🥬") && margem.includes("🐏"))
      ) {
        return -1;
      }
    }
    aux = "Dir";
  }
  return 0;
}
