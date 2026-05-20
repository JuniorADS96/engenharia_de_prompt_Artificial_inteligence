/*
=================================================
SCRIPT.JS - PROJETO COPA DO MUNDO 2026

Controla:
- JSON das seleções
- ordem alfabética
- pesquisa
- filtro por continente
- bandeiras
- favoritos
- tema claro/escuro
- tabela de grupos abre/fecha
=================================================
*/

let selecoes = [];

let favoritos = JSON.parse(localStorage.getItem("favoritosCopa2026")) || [];

const continentes = {
  "Brasil": "América do Sul",
  "Argentina": "América do Sul",
  "Uruguai": "América do Sul",
  "Colômbia": "América do Sul",
  "Equador": "América do Sul",
  "Paraguai": "América do Sul",

  "México": "América do Norte/Central",
  "Estados Unidos": "América do Norte/Central",
  "Canadá": "América do Norte/Central",
  "Panamá": "América do Norte/Central",
  "Haiti": "América do Norte/Central",
  "Curaçao": "América do Norte/Central",

  "França": "Europa",
  "Portugal": "Europa",
  "Espanha": "Europa",
  "Alemanha": "Europa",
  "Inglaterra": "Europa",
  "Holanda": "Europa",
  "Bélgica": "Europa",
  "Croácia": "Europa",
  "Suíça": "Europa",
  "Noruega": "Europa",
  "Suécia": "Europa",
  "Turquia": "Europa",
  "Áustria": "Europa",
  "Escócia": "Europa",
  "República Tcheca": "Europa",
  "Bósnia e Herzegovina": "Europa",

  "Marrocos": "África",
  "Senegal": "África",
  "Gana": "África",
  "Argélia": "África",
  "Egito": "África",
  "Tunísia": "África",
  "África do Sul": "África",
  "Costa do Marfim": "África",
  "Cabo Verde": "África",
  "República Democrática do Congo": "África",

  "Japão": "Ásia",
  "Coreia do Sul": "Ásia",
  "Irã": "Ásia",
  "Arábia Saudita": "Ásia",
  "Qatar": "Ásia",
  "Jordânia": "Ásia",
  "Iraque": "Ásia",
  "Uzbequistão": "Ásia",

  "Austrália": "Oceania",
  "Nova Zelândia": "Oceania"
};

const imagensBandeiras = {
  "Brasil": "https://flagcdn.com/w160/br.png",
  "Argentina": "https://flagcdn.com/w160/ar.png",
  "França": "https://flagcdn.com/w160/fr.png",
  "Portugal": "https://flagcdn.com/w160/pt.png",
  "Espanha": "https://flagcdn.com/w160/es.png",
  "Alemanha": "https://flagcdn.com/w160/de.png",
  "Inglaterra": "https://flagcdn.com/w160/gb-eng.png",
  "Uruguai": "https://flagcdn.com/w160/uy.png",
  "México": "https://flagcdn.com/w160/mx.png",
  "Estados Unidos": "https://flagcdn.com/w160/us.png",
  "Canadá": "https://flagcdn.com/w160/ca.png",
  "Japão": "https://flagcdn.com/w160/jp.png",
  "Coreia do Sul": "https://flagcdn.com/w160/kr.png",
  "Marrocos": "https://flagcdn.com/w160/ma.png",
  "Senegal": "https://flagcdn.com/w160/sn.png",
  "Bélgica": "https://flagcdn.com/w160/be.png",
  "Holanda": "https://flagcdn.com/w160/nl.png",
  "Croácia": "https://flagcdn.com/w160/hr.png",
  "Suíça": "https://flagcdn.com/w160/ch.png",
  "Austrália": "https://flagcdn.com/w160/au.png",
  "Colômbia": "https://flagcdn.com/w160/co.png",
  "Equador": "https://flagcdn.com/w160/ec.png",
  "Paraguai": "https://flagcdn.com/w160/py.png",
  "Irã": "https://flagcdn.com/w160/ir.png",
  "Arábia Saudita": "https://flagcdn.com/w160/sa.png",
  "Qatar": "https://flagcdn.com/w160/qa.png",
  "Tunísia": "https://flagcdn.com/w160/tn.png",
  "Egito": "https://flagcdn.com/w160/eg.png",
  "Gana": "https://flagcdn.com/w160/gh.png",
  "Argélia": "https://flagcdn.com/w160/dz.png",
  "Costa do Marfim": "https://flagcdn.com/w160/ci.png",
  "África do Sul": "https://flagcdn.com/w160/za.png",
  "Noruega": "https://flagcdn.com/w160/no.png",
  "Suécia": "https://flagcdn.com/w160/se.png",
  "Turquia": "https://flagcdn.com/w160/tr.png",
  "Áustria": "https://flagcdn.com/w160/at.png",
  "Escócia": "https://flagcdn.com/w160/gb-sct.png",
  "Nova Zelândia": "https://flagcdn.com/w160/nz.png",
  "Panamá": "https://flagcdn.com/w160/pa.png",
  "Haiti": "https://flagcdn.com/w160/ht.png",
  "Jordânia": "https://flagcdn.com/w160/jo.png",
  "Iraque": "https://flagcdn.com/w160/iq.png",
  "Uzbequistão": "https://flagcdn.com/w160/uz.png",
  "Cabo Verde": "https://flagcdn.com/w160/cv.png",
  "Curaçao": "https://flagcdn.com/w160/cw.png",
  "Bósnia e Herzegovina": "https://flagcdn.com/w160/ba.png",
  "República Tcheca": "https://flagcdn.com/w160/cz.png",
  "República Democrática do Congo": "https://flagcdn.com/w160/cd.png"
};

document.addEventListener("DOMContentLoaded", carregarSelecoes);

async function carregarSelecoes() {
  try {
    const resposta = await fetch("selecoes_copa_2026.json");

    if (!resposta.ok) {
      throw new Error("Erro ao carregar o arquivo JSON.");
    }

    selecoes = await resposta.json();

    criarLista(selecoes);
    configurarPesquisa();
    configurarFiltroContinente();
    criarTabelaGrupos();

  } catch (erro) {
    console.error(erro);

    document.getElementById("detalhes").innerHTML = `
      <h2>Erro ao carregar as seleções</h2>
      <p>Verifique se o arquivo <strong>selecoes_copa_2026.json</strong> está na mesma pasta do index.html.</p>
    `;
  }
}

function criarLista(lista) {
  const listaPaises = document.getElementById("listaPaises");

  listaPaises.innerHTML = "";

  const listaOrdenada = [...lista].sort((a, b) =>
    a.pais.localeCompare(b.pais, "pt-BR")
  );

  listaOrdenada.forEach((selecao) => {
    const botao = document.createElement("button");
    botao.classList.add("botao-pais");

    const imagemBandeira = imagensBandeiras[selecao.pais] || "";
    const estrela = favoritos.includes(selecao.pais) ? "⭐" : "";

    botao.innerHTML = `
      <img src="${imagemBandeira}" alt="Bandeira de ${selecao.pais}" class="bandeira-menu">
      <span>${selecao.pais} ${estrela}</span>
    `;

    botao.addEventListener("click", () => {
      mostrarSelecao(selecao.pais);
    });

    listaPaises.appendChild(botao);
  });
}

function configurarPesquisa() {
  const campoPesquisa = document.getElementById("campoPesquisa");
  campoPesquisa.addEventListener("input", aplicarFiltros);
}

function configurarFiltroContinente() {
  const filtro = document.getElementById("filtroContinente");
  filtro.addEventListener("change", aplicarFiltros);
}

function aplicarFiltros() {
  const texto = document.getElementById("campoPesquisa").value.toLowerCase();
  const continenteSelecionado = document.getElementById("filtroContinente").value;

  const filtradas = selecoes.filter((selecao) => {
    const nomeCombina = selecao.pais.toLowerCase().includes(texto);
    const continenteDoPais = continentes[selecao.pais] || "Outros";

    const continenteCombina =
      continenteSelecionado === "todos" ||
      continenteDoPais === continenteSelecionado;

    return nomeCombina && continenteCombina;
  });

  criarLista(filtradas);
}

function mostrarSelecao(nomePais) {
  const selecao = selecoes.find(item => item.pais === nomePais);

  if (!selecao) {
    return;
  }

  const imagemBandeira = imagensBandeiras[selecao.pais] || "";

  const textoFavorito = favoritos.includes(selecao.pais)
    ? "Remover dos favoritos"
    : "Favoritar seleção ⭐";

  const jogadoresHTML = selecao.jogadores.map((jogador) => `
    <article class="card-jogador">
      <h3>${jogador.nome}</h3>
      <p><strong>Clube:</strong> ${jogador.time}</p>
      <p><strong>Idade:</strong> ${jogador.idade} anos</p>
      <p><strong>Cidade de nascimento:</strong> ${jogador.cidade_nascimento}</p>
    </article>
  `).join("");

  document.getElementById("detalhes").innerHTML = `
    <div class="card-selecao">

      <button class="botao-voltar" onclick="voltarInicio()">
        ← Voltar
      </button>

      <button class="botao-favorito" onclick="alternarFavorito('${selecao.pais}')">
        ${textoFavorito}
      </button>

      <img src="${imagemBandeira}" alt="Bandeira de ${selecao.pais}" class="imagem-bandeira">

      <h2>${selecao.pais}</h2>

      <p><strong>Técnico:</strong> ${selecao.tecnico}</p>

      <p><strong>Continente:</strong> ${continentes[selecao.pais] || "Não informado"}</p>

      <div class="jogadores">
        ${jogadoresHTML}
      </div>

    </div>
  `;
}

function voltarInicio() {
  document.getElementById("detalhes").innerHTML = `
    <h2>Selecione uma equipe na lateral esquerda</h2>
    <p>Clique em uma seleção para visualizar bandeira, técnico e jogadores.</p>
  `;
}

function alternarFavorito(nomePais) {
  if (favoritos.includes(nomePais)) {
    favoritos = favoritos.filter(pais => pais !== nomePais);
  } else {
    favoritos.push(nomePais);
  }

  localStorage.setItem("favoritosCopa2026", JSON.stringify(favoritos));

  aplicarFiltros();
  mostrarSelecao(nomePais);
}

function alternarTema() {
  document.body.classList.toggle("tema-claro");
}

function rolarParaConteudo() {
  document.getElementById("detalhes").scrollIntoView({
    behavior: "smooth"
  });
}

function criarTabelaGrupos() {
  const area = document.getElementById("tabelaGrupos");

  let html = `
    <h2>Tabela de Grupos</h2>
    <p>Grupos organizados para demonstração do projeto.</p>
    <div class="grupos">
  `;

  const letras = "ABCDEFGHIJKL";

  for (let i = 0; i < 12; i++) {
    const grupo = selecoes.slice(i * 4, i * 4 + 4);

    html += `
      <div class="grupo">
        <h3>Grupo ${letras[i]}</h3>
    `;

    grupo.forEach((selecao) => {
      const imagemBandeira = imagensBandeiras[selecao.pais] || "";

      html += `
        <p>
          <img src="${imagemBandeira}" alt="Bandeira de ${selecao.pais}" class="bandeira-menu">
          ${selecao.pais}
        </p>
      `;
    });

    html += `
      </div>
    `;
  }

  html += `</div>`;

  area.innerHTML = html;
}

function alternarTabelaGrupos() {
  const tabela = document.getElementById("tabelaGrupos");
  const botao = document.getElementById("botaoGrupos");

  if (tabela.classList.contains("tabela-escondida")) {
    tabela.classList.remove("tabela-escondida");
    tabela.classList.add("tabela-visivel");
    botao.innerText = "Recolher tabela de grupos";
  } else {
    tabela.classList.remove("tabela-visivel");
    tabela.classList.add("tabela-escondida");
    botao.innerText = "Ver tabela de grupos";
  }
}
