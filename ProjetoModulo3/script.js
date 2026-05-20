// Cria um array vazio para armazenar as seleções
let selecoes = [];

// Espera a página terminar de carregar
document.addEventListener("DOMContentLoaded", carregarSelecoes);

// Função assíncrona para carregar o arquivo JSON
async function carregarSelecoes() {

  try {

    // Busca os dados do arquivo JSON
    const resposta = await fetch("selecoes_copa_2026.json");

    // Verifica se ocorreu erro no carregamento
    if (!resposta.ok) {
      throw new Error("Erro ao carregar JSON");
    }

    // Converte JSON em objeto JavaScript
    selecoes = await resposta.json();

    // Chama função que cria o menu
    criarMenu();

  } catch (erro) {

    // Mostra mensagem de erro na tela
    document.getElementById("app").innerHTML = `
      <h2>Erro ao carregar arquivo JSON</h2>

      <p>Verifique se o arquivo selecoes_copa_2026.json está na mesma pasta do index.html.</p>
    `;
  }
}


// Função para criar o menu lateral
function criarMenu() {

  // Seleciona elementos do HTML
  let app = document.getElementById("app");
  let lista = document.getElementById("listaPaises");

  // Mensagem inicial exibida na tela
  app.innerHTML = `
    <section id="detalhes">
      <h2>Selecione uma equipe na lateral esquerda</h2>
    </section>
  `;

  // Limpa a lista antes de adicionar novos elementos
  lista.innerHTML = "";

  // Percorre todas as seleções
  selecoes.forEach((selecao,index)=>{

    // Cria botão
    let botao = document.createElement("button");

    // Define nome do país no botão
    botao.textContent = selecao.pais;

    // Adiciona classe CSS
    botao.classList.add("botao-pais");

    // Adiciona evento de clique
    botao.addEventListener("click",()=>{

      // Mostra detalhes da seleção
      mostrarSelecao(index);

    });

    // Adiciona botão na lista
    lista.appendChild(botao);

  });

}


/* ATENÇÃO:
Este trecho parece ter erro porque "select"
não foi criado antes no código
*/

select.addEventListener("change",()=>{

  if(select.value !== ""){

    mostrarSelecao(select.value);

  }

});


// Mostra detalhes da seleção escolhida
function mostrarSelecao(index){

  // Pega a seleção escolhida
  let selecao = selecoes[index];

  // Cria cards dos jogadores
  let jogadoresHTML = selecao.jogadores.map(jogador => `

    <div class="card-jogador">

      <h3>${jogador.nome}</h3>

      <p><strong>Clube:</strong> ${jogador.time}</p>

      <p><strong>Idade:</strong> ${jogador.idade} anos</p>

      <p><strong>Cidade:</strong> ${jogador.cidade_nascimento}</p>

    </div>

  `).join("");

  // Mostra informações na tela
  document.getElementById("detalhes").innerHTML=`

    <div class="card-selecao">

      <!-- Botão voltar -->
      <button onclick="voltar()" class="botao-voltar">

      ← Voltar

      </button>

      <!-- Nome do país -->
      <h2>${selecao.pais}</h2>

      <!-- Técnico -->
      <p><strong>Técnico:</strong> ${selecao.tecnico}</p>

      <!-- Área dos jogadores -->
      <div class="jogadores">

        ${jogadoresHTML}

      </div>

    </div>

  `;

}


// Volta para tela inicial
function voltar(){

  document.getElementById("detalhes").innerHTML=`

    <h2>Selecione uma equipe na lateral esquerda</h2>

  `;

}
