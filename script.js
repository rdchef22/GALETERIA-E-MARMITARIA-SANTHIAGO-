let preco = 18;

const total = document.getElementById("total");
const selecionados = document.getElementById("selecionados");
const botoesTipo = document.querySelectorAll(".tipos button");
const ingredientes = document.querySelectorAll('input[type="checkbox"]');
const botaoPedir = document.getElementById("pedir");

function atualizarPedido() {
  const itens = [...document.querySelectorAll('input[type="checkbox"]:checked')]
    .map(item => item.value);

  if (itens.length === 0) {
    selecionados.textContent = "Nenhuma opção selecionada.";
  } else {
    selecionados.innerHTML = `
      <strong>Seu pedido:</strong><br>
      ${itens.map(item => `🍽️ ${item}`).join("<br>")}
    `;
  }

  total.textContent = `R$ ${preco.toFixed(2).replace(".", ",")}`;
}

botoesTipo.forEach(botao => {
  botao.addEventListener("click", () => {

    botoesTipo.forEach(item => {
      item.classList.remove("active");
    });

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

  if (itens.length === 0) {
    alert("Escolha pelo menos uma opção para montar seu pedido.");
    return;
  }

  alert(
    "Pedido montado com sucesso! 🍽️\n\n" +
    "Itens:\n" +
    itens.join("\n") +
    "\n\nTotal: R$ " +
    preco.toFixed(2).replace(".", ",")
  );
});

atualizarPedido();
