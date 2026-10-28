/* =====================================================================
   CARDÁPIO DO SERTÃO BURGERS — é AQUI que você mexe quando chegarem
   os nomes, preços e fotos. Não precisa mexer em mais nenhum arquivo.
   ===================================================================== */

const NEGOCIO = {
  nome: "Sertão Burgers",
  // WhatsApp com 55 (Brasil) + DDD + número, só números.
  // CONFIRMAR com o seu pai se o número tem o 9 na frente (85 9 8226-9650).
  whatsapp: "558582269650",
  instagram: "", // ex.: "sertaoburgers" (sem @). Deixe vazio pra esconder.
  // Dias: 0 = domingo, 1 = segunda ... 5 = sexta, 6 = sábado
  horarios: [
    { dia: 5, abre: "19:00", fecha: "23:00" },
    { dia: 6, abre: "19:00", fecha: "23:00" },
    { dia: 0, abre: "19:00", fecha: "23:00" },
  ],
};

// Troque para false quando o cardápio tiver os itens de verdade.
// (Enquanto for true, aparece o aviso "prévia" no topo.)
const MODO_PREVIA = true;

/* Cada categoria tem uma lista de itens.
   - nome:      nome do lanche
   - descricao: o que vai nele, curto
   - preco:     número (ex.: 28.5). Use null para "a consultar"
   - foto:      caminho da foto, ex.: "fotos/sertao-classico.jpg". Vazio = "foto em breve"
*/
const CATEGORIAS = [
  {
    id: "hamburgueres",
    titulo: "Hambúrgueres",
    itens: [
      { nome: "Nome do hambúrguer", descricao: "Descrição curta do que vai no lanche.", preco: 0, foto: "" },
      { nome: "Nome do hambúrguer", descricao: "Descrição curta do que vai no lanche.", preco: 0, foto: "" },
    ],
  },
  {
    id: "combos",
    titulo: "Combos",
    itens: [
      { nome: "Nome do combo", descricao: "Lanche + acompanhamento + bebida.", preco: 0, foto: "" },
    ],
  },
  {
    id: "porcoes",
    titulo: "Porções",
    itens: [
      { nome: "Nome da porção", descricao: "Tamanho e o que acompanha.", preco: 0, foto: "" },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    itens: [
      { nome: "Nome da bebida", descricao: "", preco: 0, foto: "" },
    ],
  },
  {
    id: "adicionais",
    titulo: "Adicionais",
    itens: [
      { nome: "Nome do adicional", descricao: "", preco: 0, foto: "" },
    ],
  },
];
