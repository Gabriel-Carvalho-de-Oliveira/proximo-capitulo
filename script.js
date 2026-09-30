// Lista de matérias do site
const stories = [

  // Matéria sobre o futuro dos livros físicos
  {
    title:"Qual o futuro dos livros físicos? Das estantes até as telas, o papel ainda tem espaço",
    category:"Futuro",
    author:"Helena Nunes",
    date:"28 set. 2026",
    image:"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
    alt:"Pilha de livros antigos"
  },

  // Matéria sobre inteligência artificial nos livros
  {
    title:"IA nos Livros: o que muda quando ela na escrita?",
    category:"Futuro",
    author:"Davi Moraes",
    date:"27 set. 2026",
    image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    alt:"Livros organizados em uma biblioteca"
  },

  // Matéria sobre a próxima temporada de Apotecária
  {
    title:"O que esperar da próxima temporada de Apotecária com base nas light novels?",
    category:"Mangá",
    author:"Gabriel Carvalho",
    date:"26 set. 2026",
    image:"https://dw9to29mmj727.cloudfront.net/promo/2016/7091-Header_ApothecaryDiary_v2_2000x800-promo-KiUlTfo4bTXZUNCwAyJehw.jpg",
    alt:"Arte oficial de Maomao em The Apothecary Diaries"
  },

  // Matéria sobre Maomao
  {
    title:"Relembre: cinco vezes em que a Maomao só queria paz, mas ganhou outro caso",
    category:"Mangá",
    author:"Gabriel Carvalho",
    date:"25 set. 2026",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjIYg_UbN3XL2zZxDQsSDMHnd9zQ2OW4A3lVDOpW8jFn_ckVB0OO5HUeG9&s=10",
    alt:"Cena do anime The Apothecary Diaries"
  },

  // Resenha do livro As Esganadas
  {
    title:"As Esganadas: humor ácido ou entretenimento sóbrio?",
    category:"Resenhas",
    author:"Rafael Campos",
    date:"23 set. 2026",
    image:"https://martinsfontespaulista.vteximg.com.br/arquivos/ids/1450510-1000-1000/668615.jpg?v=638132702247400000",
    alt:"Capa do livro As Esganadas, de Jô Soares"
  },

  // Resenha do livro Dias Perfeitos
  {
    title:"Dias Perfeitos e os dias nada perfeitos que inspiraram sua criação",
    category:"Resenhas",
    author:"Nina Costa",
    date:"21 set. 2026",
    image:"https://static.wixstatic.com/media/62fbbf_ebaa87f49eb640f29815ef55b29d1c37~mv2.jpg/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/62fbbf_ebaa87f49eb640f2%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/62fbbf_ebaa87f49eb640f29815ef55b29d1c37~mv2.jpg",
    alt:"Capa do livro Dias Perfeitos, de Raphael Montes"
  },

  // Matéria sobre clubes de leitura
  {
    title:"Por que clubes de leitura voltaram a dar certo e como Clube da Luta mostra isso",
    category:"Futuro",
    author:"Davi Moraes",
    date:"19 set. 2026",
    image:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    alt:"Biblioteca com estantes altas"
  },

  // Matéria sobre leitores digitais
  {
    title:"O leitor digital ganha espaço: expandindo os horizontas da literatura",
    category:"Futuro",
    author:"Helena Nunes",
    date:"17 set. 2026",
    image:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    alt:"Mesa com livros e materiais de escrita"
  }

];

// Elementos da página
const grid = document.querySelector("#news-grid");
const search = document.querySelector("#search");
const filters = document.querySelectorAll(".filter-button");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const themeButton = document.querySelector("#theme-button");

// Categoria selecionada atualmente
let category = "Todos";

// Exibe as matérias na página
function renderStories() {

  // Pega o texto digitado na busca
  const term = search.value.trim().toLocaleLowerCase("pt-BR");

  // Filtra as matérias por categoria e pesquisa
  const visible = stories.filter(
    (story) =>
      (category === "Todos" || story.category === category) &&
      story.title.toLocaleLowerCase("pt-BR").includes(term)
  );

  // Cria os cards das matérias
  grid.innerHTML = visible.map((story) =>
    `<article class="news-card">
      <div class="cover-art">
        <img src="${story.image}" alt="${story.alt}">
      </div>
      <p class="card-category">${story.category}</p>
      <h3>${story.title}</h3>
      <p class="card-meta">${story.author} · ${story.date}</p>
    </article>`
  ).join("");

  // Mostra a quantidade de matérias encontradas
  count.textContent = `${visible.length} ${
    visible.length === 1
      ? "leitura encontrada"
      : "leituras encontradas"
  }`;

  // Mostra ou esconde a mensagem de nenhum resultado
  empty.hidden = visible.length !== 0;
}

// Atualiza o relógio do site
function updateClock() {

  // Formata a data e o horário
  const text = new Intl.DateTimeFormat("pt-BR", {
    weekday:"short",
    day:"2-digit",
    month:"short",
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
  }).format(new Date()).replaceAll(".", "");

  // Coloca o horário na página
  document.querySelector("#clock").textContent = text;
}

// Aplica o tema claro ou escuro
function applyTheme(theme) {

  // Verifica se o tema escolhido é escuro
  const dark = theme === "dark";

  // Define o tema no documento
  document.documentElement.dataset.theme = theme;

  // Atualiza informações de acessibilidade do botão
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute(
    "aria-label",
    dark ? "Ativar modo claro" : "Ativar modo noturno"
  );
}

// Controla os botões de filtro
filters.forEach((button) =>
  button.addEventListener("click", () => {

    // Atualiza a categoria selecionada
    category = button.dataset.category;

    // Atualiza o botão que está ativo
    filters.forEach((filter) => {
      const active = filter === button;

      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });

    // Atualiza as matérias exibidas
    renderStories();
  })
);

// Atualiza as matérias enquanto o usuário pesquisa
search.addEventListener("input", renderStories);

// Alterna entre o tema claro e escuro
themeButton.addEventListener("click", () => {

  // Escolhe o próximo tema
  const next =
    document.documentElement.dataset.theme === "dark"
      ? "light"
      : "dark";

  // Aplica o novo tema
  applyTheme(next);

  // Salva o tema escolhido no navegador
  localStorage.setItem("proximo-capitulo-theme", next);
});

// Controla o formulário da newsletter
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {

  // Impede o formulário de recarregar a página
  event.preventDefault();

  // Pega o e-mail digitado
  const email = event.currentTarget.elements.email.value.trim();

  // Verifica se o e-mail possui um formato válido
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Mostra a mensagem de resultado
  document.querySelector("#form-message").textContent =
    valid
      ? "Pronto! A próxima lista de leituras chega no seu e-mail."
      : "Digite um e-mail válido para entrar na lista.";

  // Limpa o campo caso o e-mail seja válido
  if (valid) event.currentTarget.reset();
});

// Recupera o tema salvo anteriormente
const saved = localStorage.getItem("proximo-capitulo-theme");

// Aplica o tema salvo ou o tema preferido pelo sistema
applyTheme(
  saved ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light")
);

// Inicia o relógio
updateClock();

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Exibe as matérias ao carregar a página
renderStories();