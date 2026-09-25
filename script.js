let preco = 18;

const total = document.getElementById("total");
const selecionados = document.getElementById("selecionados");
const botoesTipo = document.querySelectorAll(".tipos button");
const ingredientes = document.querySelectorAll('input[type="checkbox"]');
const botaoPedir = document.getElementById("pedir");

function atualizarPedido() {
  const itens = [...document.querySelectorAll('input[type="checkbox"]:checked')]
    .map(item => item.value);

  selecionados.innerHTML = itens.length
    ? "<strong>Seu pedido:</strong><br>" +
      itens.map(item => "🍽️ " + item).join("<br>")
    : "Nenhuma opção selecionada.";

  total.textContent = "R$ " + preco.toFixed(2).replace(".", ",");
}

botoesTipo.forEach(botao => {
  botao.addEventListener("click", () => {
    botoesTipo.forEach(b => b.classList.remove("active"));
    botao.classList.add("active");
    preco = Number(botao.dataset.preco);
    atualizarPedido();
  });
});

ingredientes.forEach(item => {
  item.addEventListener("change", atualizarPedido);
});

botaoPedir.addEventListener("click", () => {
  const itens = [...document.querySelectorAll('input[type="checkbox"]:checked')]
    .map(item => item.value);

  if (!itens.length) {
    alert("Escolha pelo menos uma opção.");
    return;
  }

  const tipoBotao = document.querySelector(".tipos button.active");
  const tipo = tipoBotao ? tipoBotao.innerText.replace(/\n/g, " ") : "Marmita";

  const mensagem =
    "🍽️ PEDIDO - GALETERIA E MARMITARIA SANTHIAGO\n\n" +
    "🥡 Tipo: " + tipo + "\n\n" +
    "🍴 Itens:\n" +
    itens.map(item => "• " + item).join("\n") +
    "\n\n💰 Total: R$ " + preco.toFixed(2).replace(".", ",");

  window.location.href =
    "https://wa.me/5585998577729?text=" +
    encodeURIComponent(mensagem);
});

atualizarPedido();
