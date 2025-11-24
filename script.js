// --- Botão "Deixar um recado" ---
const btnIrRecados = document.getElementById("btn-ir-recados");
const secaoRecados = document.getElementById("recados");

if (btnIrRecados && secaoRecados) {
  btnIrRecados.addEventListener("click", () => {
    secaoRecados.scrollIntoView({ behavior: "smooth" });
  });
}

// --- Sistema de likes ---
const btnLike = document.getElementById("btn-like");
const likeCountSpan = document.getElementById("like-count");
const likeIcon = document.getElementById("like-icon");

let likeCount = Number(localStorage.getItem("kakaLikes")) || 0;
likeCountSpan.textContent = likeCount;

if (btnLike && likeCountSpan && likeIcon) {
  btnLike.addEventListener("click", () => {
    likeCount++;
    likeCountSpan.textContent = likeCount;
    localStorage.setItem("kakaLikes", likeCount);

    likeIcon.style.transform = "scale(1.3)";
    setTimeout(() => {
      likeIcon.style.transform = "scale(1)";
    }, 150);
  });
}

// --- Mural de recados ---
const formRecado = document.getElementById("form-recado");
const listaRecados = document.getElementById("lista-recados");

// Carregar recados guardados
let recados = JSON.parse(localStorage.getItem("kakaRecados")) || [];

// Renderizar recados armazenados
function renderizarRecados() {
  listaRecados.innerHTML = "";
  recados.forEach((r) => {
    const recado = document.createElement("div");
    recado.className = "recado";

    const cabecalho = document.createElement("div");
    cabecalho.className = "recado-cabecalho";

    const spanNome = document.createElement("span");
    spanNome.className = "recado-nome";
    spanNome.textContent = r.nome;

    const spanHora = document.createElement("span");
    spanHora.className = "recado-hora";
    spanHora.textContent = r.hora;

    cabecalho.appendChild(spanNome);
    cabecalho.appendChild(spanHora);

    const pMensagem = document.createElement("p");
    pMensagem.textContent = r.mensagem;

    recado.appendChild(cabecalho);
    recado.appendChild(pMensagem);

    listaRecados.prepend(recado);
  });
}

// Chama a função pra mostrar os recados logo ao abrir a página
renderizarRecados();

// Enviar recado novo
if (formRecado && listaRecados) {
  formRecado.addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const mensagemTextarea = document.getElementById("mensagem");

    const nome = nomeInput.value.trim() || "Anônimo";
    const mensagem = mensagemTextarea.value.trim();

    if (!mensagem) {
      alert("Escreve alguma coisa pra Kaka 😅");
      return;
    }

    const agora = new Date();
    const hora = agora.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Criar recado
    const novoRecado = {
      nome,
      mensagem,
      hora,
    };

    // Adicionar no array
    recados.unshift(novoRecado);

    // Salvar no localStorage
    localStorage.setItem("kakaRecados", JSON.stringify(recados));

    // Renderizar novamente
    renderizarRecados();

    mensagemTextarea.value = "";
    mensagemTextarea.focus();
  });
}
