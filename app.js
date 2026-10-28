/* Monta o cardápio a partir do cardapio.js. Normalmente você não mexe aqui. */

(function () {
  "use strict";

  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function linkWhats(texto) {
    return "https://wa.me/" + NEGOCIO.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto != null) el.textContent = texto;
    return el;
  }

  /* ---------- cardápio ---------- */
  function montarCardapio() {
    const nav = document.getElementById("categorias");
    const main = document.getElementById("cardapio");

    CATEGORIAS.forEach(function (cat) {
      const a = criar("a", null, cat.titulo);
      a.href = "#" + cat.id;
      nav.appendChild(a);

      const secao = criar("section", "secao");
      secao.id = cat.id;
      secao.appendChild(criar("h2", "secao__titulo", cat.titulo));

      cat.itens.forEach(function (item) {
        const li = criar("article", "item");
        const texto = criar("div", "item__texto");

        const linha = criar("div", "item__nome-linha");
        linha.appendChild(criar("h3", "item__nome", item.nome));
        linha.appendChild(criar("span", "item__pontos"));
        linha.lastChild.setAttribute("aria-hidden", "true");
        linha.appendChild(
          criar("span", "item__preco", item.preco == null ? "Consulte" : brl.format(item.preco))
        );
        texto.appendChild(linha);

        if (item.descricao) texto.appendChild(criar("p", "item__descricao", item.descricao));

        if (!MODO_PREVIA) {
          const pedir = criar("a", "item__pedir", "Pedir");
          pedir.href = linkWhats("Olá! Quero pedir: 1x " + item.nome + " (" + cat.titulo + ")");
          pedir.target = "_blank";
          pedir.rel = "noopener";
          texto.appendChild(pedir);
        }

        li.appendChild(texto);

        if (item.foto) {
          const f = criar("div", "item__foto");
          const img = criar("img");
          img.src = item.foto;
          img.alt = item.nome;
          img.loading = "lazy";
          img.width = 128;
          img.height = 128;
          f.appendChild(img);
          li.appendChild(f);
        } else {
          li.appendChild(criar("div", "item__foto item__foto--vazia", "foto em breve"));
        }

        secao.appendChild(li);
      });

      main.appendChild(secao);
    });
  }

  /* ---------- aberto / fechado (horário de Fortaleza) ---------- */
  function agoraEmFortaleza() {
    const partes = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Fortaleza",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = function (t) { return partes.find(function (p) { return p.type === t; }).value; };
    const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      dia: dias[get("weekday")],
      min: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10),
    };
  }

  function paraMin(hhmm) {
    const p = hhmm.split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  const NOMES_DIA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  function atualizarStatus() {
    const el = document.getElementById("status");
    const txt = document.getElementById("status-texto");
    const agora = agoraEmFortaleza();

    const hoje = NEGOCIO.horarios.find(function (h) { return h.dia === agora.dia; });
    if (hoje && agora.min >= paraMin(hoje.abre) && agora.min < paraMin(hoje.fecha)) {
      el.className = "status aberto";
      txt.textContent = "Aberto agora, até as " + hoje.fecha.replace(":00", "h");
      return;
    }

    // próximo dia de funcionamento
    el.className = "status fechado";
    for (let i = 0; i < 7; i++) {
      const dia = (agora.dia + i) % 7;
      const h = NEGOCIO.horarios.find(function (x) { return x.dia === dia; });
      if (!h) continue;
      if (i === 0 && agora.min >= paraMin(h.abre)) continue; // já passou hoje
      const quando = i === 0 ? "hoje" : i === 1 ? "amanhã" : NOMES_DIA[dia];
      txt.textContent = "Fechado agora. Abre " + quando + " às " + h.abre.replace(":00", "h");
      return;
    }
    txt.textContent = "Fechado agora";
  }

  /* ---------- categoria ativa na navegação ---------- */
  function observarSecoes() {
    const links = Array.prototype.slice.call(document.querySelectorAll("#categorias a"));
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            const ativo = a.getAttribute("href") === "#" + e.target.id;
            if (ativo) {
              a.setAttribute("aria-current", "true");
              a.scrollIntoView({ block: "nearest", inline: "center" });
            } else {
              a.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll(".secao").forEach(function (s) { io.observe(s); });
  }

  /* ---------- resto da página ---------- */
  function montarResto() {
    document.getElementById("previa").hidden = !MODO_PREVIA;
    document.getElementById("pedir-fixo").href = linkWhats(
      "Olá! Vim pelo cardápio digital e gostaria de fazer um pedido."
    );

    if (NEGOCIO.instagram) {
      const a = criar("a", null, "@" + NEGOCIO.instagram);
      a.href = "https://instagram.com/" + NEGOCIO.instagram;
      a.target = "_blank";
      a.rel = "noopener";
      document.getElementById("rodape-links").appendChild(a);
    }
  }

  montarCardapio();
  montarResto();
  atualizarStatus();
  setInterval(atualizarStatus, 60000);
  observarSecoes();
})();
