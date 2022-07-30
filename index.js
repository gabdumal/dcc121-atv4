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
const recomecar = document.querySelector("#recomecar");

// Ouvintes
fazendeiro.addEventListener("click", clickListenerFazendeiro);
for (const produto of produtos) {
  produto.addEventListener("click", clickListenerProduto);
}
recomecar.addEventListener("click", clickListenerRecomecar);

function clickListenerFazendeiro() {
  // Troca de margem
  embarcacaoEstado.margem === "Esq"
    ? (embarcacaoEstado.margem = "Dir")
    : (embarcacaoEstado.margem = "Esq");

  const ladoRio = document.querySelector("#rio" + embarcacaoEstado.margem);
  ladoRio.appendChild(embarcacao);

  verificaVitoria();
}

function clickListenerProduto(event) {
  const produto = event.target;
  const valorProduto = produto.textContent;
  const indice = produtosEstado[embarcacaoEstado.margem].indexOf(valorProduto);

  // Insere produto na embarcação
  if (embarcacaoEstado.carga === "" && indice !== -1) {
    insereProduto(produto, valorProduto);
  } // Remove produto da embarcação
  else if (embarcacaoEstado.carga === valorProduto) {
    removeProduto(produto, valorProduto);
  }
  verificaVitoria();
}

function clickListenerRecomecar() {
  // Estilo de fim de jogo
  const tabuleiro = document.querySelector("#tabuleiro");
  tabuleiro.classList.remove("fim");
  const mensagem = document.querySelector("#mensagem");
  mensagem.textContent = "";
  mensagem.classList.remove("vitoria");
  mensagem.classList.remove("derrota");
  mensagem.classList.add("invisivel");

  // Elementos do DOM
  const margens = document.querySelectorAll(".margem");
  const espacos = document.querySelectorAll(".espaco");
  const ladoRioEsq = document.querySelector("#rioEsq");
  for (const espaco of espacos) {
    espaco.remove();
  }
  let margemAux = 0;
  for (const margem of margens) {
    for (let aux = 0; aux < 3; aux++) {
      const espaco = document.createElement("div");
      espaco.classList.add("espaco");
      if (margemAux === 0) {
        espaco.appendChild(produtos[aux]);
      }
      margem.appendChild(espaco);
    }
    ladoRioEsq.appendChild(embarcacao);
    margemAux++;
  }

  // Estado
  embarcacaoEstado.margem = "Esq";
  embarcacaoEstado.carga = "";
  produtosEstado.Esq = ["🐺", "🐏", "🥬"];
  produtosEstado.Barco = [];
  produtosEstado.Dir = [];
}

function insereProduto(produto, valorProduto) {
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
}

function removeProduto(produto, valorProduto) {
  const margem = document.querySelector("#margem" + embarcacaoEstado.margem);
  const espacoProduto = margem.lastElementChild;

  espacoProduto.appendChild(produto);
  // Leva último espaço para a primeira posição
  margem.insertBefore(espacoProduto, margem.children[0]);

  // Atualiza estado
  embarcacaoEstado.carga = "";
  produtosEstado[embarcacaoEstado.margem].push(valorProduto);
  produtosEstado.Barco.pop();
}

function verificaVitoria() {
  const situacao = verificaVitoriaAux();
  if (situacao !== 0) {
    const tabuleiro = document.querySelector("#tabuleiro");
    tabuleiro.classList.add("fim");
    const mensagem = document.querySelector("#mensagem");
    if (situacao === 1) {
      mensagem.textContent = "Você venceu!";
      mensagem.classList.add("vitoria");
    } else {
      mensagem.textContent = "Fim de jogo!";
      mensagem.classList.add("derrota");
    }
    mensagem.classList.remove("invisivel");
  }
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
