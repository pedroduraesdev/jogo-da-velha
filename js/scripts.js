// Esconde a div "game" quando a página é carregada
window.onload = function () {
  document.getElementById("game").style.display = "none";
};

// ocultando a div right
const rightDiv = document.getElementById("right");
rightDiv.style.display = "none";

function Jogador(nome, forma) {
  this.nome = nome;
  this.forma = forma;
}

var jogador1, jogador2;

//Jogador da rodada
var jogadorAtual;

var formas = ["X", "O"];
var index = null;

// pontos dos jogadores
var pontosJogador1 = 0;
var pontosJogador2 = 0;
var ganhador = false;

/*
    0 1 2
    3 4 5
    6 7 8
*/
var tabuleiro = Array(9).fill(null);

initGame = function () {
  ganhador = false;
  var nomeJogador1 = document.getElementById("jogador1").value;
  var nomeJogador2 = document.getElementById("jogador2").value;

  // verifica se o valor de nomeJogador1 é vazio ou nulo
  if (!nomeJogador1) {
    swal({
      title: "Erro!",
      text: "Por favor, insira o nome do jogador 1.",
      icon: "error",
    });
    return;
  }

  // verifica se o valor de nomeJogador2 é vazio ou nulo
  if (!nomeJogador2) {
    swal({
      title: "Erro!",
      text: "Por favor, insira o nome do jogador 2.",
      icon: "error",
    });
    return;
  }

  jogador1 = new Jogador(nomeJogador1, 0); //X
  jogador2 = new Jogador(nomeJogador2, 1); //O

  jogadorAtual = jogador1;
  setLabelJogadorAtual();

  // exibe a div "game" após a inicialização do jogo
  document.getElementById("game").style.display = "block";

  // exibindo a div right
  rightDiv.style.display = "block";

  // seleciona a div com a classe "box"
  const form = document.querySelector(".box");

  // oculta a div box
  form.style.display = "none";

  nomejogador1placar();
  nomejogador2placar();
  placarjogador1();
  placarjogador2();
};

zerarTabuleiro = function () {
  // Define o tabuleiro para um array vazio
  tabuleiro = new Array(9).fill(null);
  ganhador = false;

  // Define o jogador atual para o novo jogo
  setLabelJogadorAtual();

  // limpa todo o tabuleiro
  setAllCeils();
};

setAllCeils = function () {
  obj = document.getElementsByClassName("td-table1");
  for (var i = 0; i < obj.length; i++) {
    obj.item(i).innerHTML = "&nbsp;";
  }
};

/*Seta o nome do jogador da rodada na página HTML*/
setLabelJogadorAtual = function () {
  document.getElementById("jogadorAtual").innerHTML =
    "Agora é sua vez:  " + jogadorAtual.nome;
};

/*Seta o nome do jogador 1 na página HTML*/
nomejogador1placar = function () {
  document.getElementById("jg1").innerHTML =
   jogador1.nome;
};

/*Seta o nome do jogador 2 na página HTML*/
nomejogador2placar = function () {
  document.getElementById("jg2").innerHTML =
   jogador2.nome;
};

/*Seta os pontos do jogador 1 na página HTML*/
placarjogador1 = function () {
  document.getElementById("pontosjg1").innerHTML =
  pontosJogador1;
};

/*Seta os pontos do jogador 1 na página HTML*/
placarjogador2 = function () {
  document.getElementById("pontosjg2").innerHTML =
   pontosJogador2;
};

function zerarPlacar() {
  pontosJogador1 = 0;
  pontosJogador2 = 0;
  placarjogador1();
  placarjogador2();
}

/*Verifica se o tabuleiro está completamente preenchido*/
tabuleiroIsFilled = function () {
  var preenchidos = 0;
  for (var i = 0; i < tabuleiro.length; i++)
    if (tabuleiro[i] != undefined) preenchidos++;
  return preenchidos == tabuleiro.length;
};

avisojogador1 = function () {
  ganhador = true;
  {
    swal({
      title: "Vencedor!",
      text: "Parabéns " + jogador1.nome,
      icon: "success",
    }).then((value) => {
      swal({
        title: "Desejam jogar novamente?",
        icon: "info",
        buttons: {
          rematch: {
            text: "Jogar novamente",
            value: "rematch",
          },
          reset: {
            text: "Reset",
            value: "reset",
          },
        },
        dangerMode: true,
      }).then((value) => {
        if (value === "rematch") {
          zerarTabuleiro();
        } else if (value === "reset") {
          (function () {
            window.location.reload();
          })();
        }
      });
      jogadorAtual = jogador1;
      pontosJogador1++;
      placarjogador1();
    });
  }
};

avisojogador2 = function () {
  ganhador = true;
  {
    swal({
      title: "Vencedor!",
      text: "Parabéns " + jogador2.nome,
      icon: "success",
    }).then((value) => {
      swal({
        title: "Desejam jogar novamente?",
        icon: "info",
        buttons: {
          rematch: {
            text: "Jogar novamente",
            value: "rematch",
          },
          reset: {
            text: "Reset",
            value: "reset",
          },
        },
        dangerMode: true,
      }).then((value) => {
        if (value === "rematch") {
          zerarTabuleiro();
        } else if (value === "reset") {
          (function () {
            window.location.reload();
          })();
        }
      })
      jogadorAtual = jogador2;
      pontosJogador2++;
      placarjogador2();
    });
  }
};

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas linhas do tabuleiro, procurando um vencedor*/
allElementsInSomeLine = function () {
  for (var i = 0; i < 7; i += 3) {
    if (
      tabuleiro[i] == "X" &&
      tabuleiro[i + 1] == "X" &&
      tabuleiro[i + 2] == "X"
    )
      avisojogador1();
    if (
      tabuleiro[i] == "O" &&
      tabuleiro[i + 1] == "O" &&
      tabuleiro[i + 2] == "O"
    )
      avisojogador2();
  }
};

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas colunas do tabuleiro, procurando um vencedor*/
allElementsInSomeColumn = function () {
  for (var i = 0; i < 3; i++) {
    if (
      tabuleiro[i] == "X" &&
      tabuleiro[i + 3] == "X" &&
      tabuleiro[i + 6] == "X"
    )
      avisojogador1();
    if (
      tabuleiro[i] == "O" &&
      tabuleiro[i + 3] == "O" &&
      tabuleiro[i + 6] == "O"
    )
      avisojogador2();
  }
};

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas diagonais do tabuleiro, procurando um vencedor*/
allElementsInSomeDiagonal = function () {
  if (
    (tabuleiro[0] == "X" && tabuleiro[4] == "X" && tabuleiro[8] == "X") ||
    (tabuleiro[2] == "X" && tabuleiro[4] == "X" && tabuleiro[6] == "X")
  )
    avisojogador1();
  else if (
    (tabuleiro[0] == "O" && tabuleiro[4] == "O" && tabuleiro[8] == "O") ||
    (tabuleiro[2] == "O" && tabuleiro[4] == "O" && tabuleiro[6] == "O")
  )
    avisojogador2();
};

/*Preenche a célula da tabela HTML escolhida pelo usuário ao clicar, além de cuidar do jogador atual da rodada e chamar as funções
de verificação de algum ganhador */
setOnCeil = function (cel, pos) {
  if (tabuleiro[pos] == undefined) {
    cel.innerHTML = formas[jogadorAtual.forma];
    tabuleiro[pos] = formas[jogadorAtual.forma];

    //define o jogador da rodada
    jogadorAtual.forma == 0
      ? (jogadorAtual = jogador2)
      : (jogadorAtual = jogador1);
    setLabelJogadorAtual();
  } else
    swal({
      title: "Erro!",
      text: "Está casa já está marcada!",
      icon: "error",
    });
  allElementsInSomeLine();
  allElementsInSomeColumn();
  allElementsInSomeDiagonal();

  //Apresenta um alerta para o jogador sobre o empate.
  if (tabuleiroIsFilled() && !ganhador) {
    swal({
      title: "Deu velha!",
      text: "Ninguém venceu esta rodada!",
      icon: "warning",
    }).then((value) => {
      swal({
        title: "Desejam jogar novamente?",
        icon: "info",
        buttons: {
          rematch: {
            text: "Jogar novamente",
            value: "rematch",
          },
          reset: {
            text: "Reset",
            value: "reset",
          },
        },
        dangerMode: true,
      }).then((value) => {
        if (value === "rematch") {
          zerarTabuleiro();
        } else if (value === "reset") {
          (function () {
            window.location.reload();
          })();
        }
      });
      jogadorAtual = jogador1;
    });
  }
};
