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

  const margem = document.querySelector("#margem" + embarcacaoEstado.margem);
  margem.firstElementChild.appendChild(embarcacao);

  verificaVitoria();
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
  for (const espaco of espacos) {
    espaco.remove();
  }
  let margemAux = 0;
  for (const margem of margens) {
    for (let aux = 0; aux < 4; aux++) {
      const espaco = document.createElement("div");
      espaco.classList.add("espaco");
      if (margemAux === 0) {
        if (aux > 0) {
          espaco.appendChild(produtos[aux - 1]);
        } else {
          espaco.appendChild(embarcacao);
        }
      }
      margem.appendChild(espaco);
    }
    margemAux++;
  }

  // Estado
  embarcacaoEstado.margem = "Esq";
  embarcacaoEstado.carga = "";
  produtosEstado.Esq = ["🐺", "🐏", "🥬"];
  produtosEstado.Barco = [];
  produtosEstado.Dir = [];
}
