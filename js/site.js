/* Funcionamento do site. Não é preciso editar este arquivo:
   o conteúdo fica em js/conteudo.js */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const D = (typeof SITE !== "undefined" && SITE) || {};
  const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function vazio(lista, alvoId, vazioId) {
    const tem = Array.isArray(lista) && lista.length > 0;
    if (!tem && vazioId) $(vazioId).hidden = false;
    if (!tem && alvoId) $(alvoId).hidden = true;
    return tem;
  }
  function iniciais(nome) {
    const p = nome.replace(/^(Prof\.?\s*)?(Dr\.?|Dra\.?)\s*/i, "").split(/\s+/).filter((x) => x.length > 2);
    return ((p[0] || "")[0] + (p[p.length - 1] || "")[0]).toUpperCase();
  }
  function dataBox(iso) {
    const d = new Date(iso + "T12:00:00");
    if (isNaN(d)) return `<div class="data"><b>—</b></div>`;
    return `<div class="data"><b>${d.getDate()}</b><small>${MESES[d.getMonth()]} ${d.getFullYear()}</small></div>`;
  }
  function idYoutube(link) {
    const m = String(link).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(link) ? link : null);
  }

  /* Faixa de proposta */
  if (D.modoProposta) $("faixaProposta").hidden = false;

  /* Menu no celular */
  const btn = $("menuBtn"), menu = $("menu");
  btn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", aberto);
  });
  menu.addEventListener("click", (e) => { if (e.target.tagName === "A") { menu.classList.remove("aberto"); btn.setAttribute("aria-expanded", "false"); } });

  /* Contato: faixa de inscrição */
  const c = D.contato || {};
  const wa = (n) => "https://wa.me/55" + String(n).replace(/\D/g, "");
  const pin = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  const zaps = (c.whatsapp || []).map((w) => `<a href="${wa(w.numero)}" target="_blank" rel="noopener">${esc(w.numero)} <span>(${esc(w.nome)})</span></a>`).join("");
  const mails = (c.emails || []).concat(c.email ? [c.email] : []).map((m) => `<a href="mailto:${esc(m)}">${esc(m)}</a>`).join("");
  $("contatoBox").innerHTML = `
    <div class="insc-topo">
      ${c.inscricao ? `<a class="insc-qr" href="${esc(c.inscricao)}" target="_blank" rel="noopener" aria-label="Abrir inscrição pelo WhatsApp"><img src="img/qr-inscricao.svg" alt="QR code para inscrição pelo WhatsApp" width="150" height="150"></a>` : ""}
      <div class="insc-txt">
        <h3>Escaneie para inscrição rápida</h3>
        <p class="insc-sub">Participe na UFRJ${c.duracao ? ` (${esc(c.duracao)})` : ""}</p>
        <p class="insc-local">${pin}<span>${esc(c.laboratorio)}<br>${esc(c.sala)}</span></p>
        ${c.inscricao ? `<a class="btn btn-claro insc-btn" href="${esc(c.inscricao)}" target="_blank" rel="noopener">Está no celular? Toque para se inscrever</a>` : ""}
      </div>
    </div>
    <div class="insc-base">
      ${zaps ? `<div><b class="zap">WhatsApp</b><div class="insc-lista">${zaps}</div></div>` : ""}
      ${mails ? `<div><b>E-mails</b><div class="insc-lista">${mails}</div></div>` : ""}
    </div>`;
  const local = `${esc(c.laboratorio)}<br>${esc(c.sala)}`;
  $("enderecoContato").innerHTML = local;
  $("rodapeContato").innerHTML = [c.email && `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`, ...(c.whatsapp || []).map((w) => `WhatsApp ${esc(w.numero)} (${esc(w.nome)})`)].filter(Boolean).join("<br>");
  $("ano").textContent = new Date().getFullYear();

  /* Fotos do campus no topo */
  const fotos = (D.fotosCampus || []).filter(Boolean);
  if (fotos.length) {
    const box = $("heroFotos");
    box.classList.add("tem-fotos");
    box.innerHTML = fotos.map((f) => `<img src="${esc(f)}" alt="" loading="lazy">`).join("");
    const imgs = box.querySelectorAll("img");
    let i = 0;
    imgs[0].classList.add("ativa");
    if (imgs.length > 1 && !reduzMovimento) setInterval(() => {
      imgs[i].classList.remove("ativa");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("ativa");
    }, 7000);
  }

  /* Faixa que gira sozinha (usada por vídeos e fotos) */
  function girar(car, trilho, html, vel) {
    const n = (html.match(/class="(video|foto)/g) || []).length || 1;
    trilho.innerHTML = html.repeat(Math.max(2, Math.ceil(8 / n)) * 2);
    let x = 0, pausa = false, larg = 0;
    const medir = () => { larg = trilho.scrollWidth / 2; };
    medir(); window.addEventListener("resize", medir); window.addEventListener("load", medir);
    ["mouseenter", "focusin", "touchstart"].forEach((ev) => car.addEventListener(ev, () => (pausa = true), { passive: true }));
    ["mouseleave", "focusout", "touchend"].forEach((ev) => car.addEventListener(ev, () => (pausa = false), { passive: true }));
    if (reduzMovimento) { car.style.overflowX = "auto"; return; }
    (function passo() {
      if (!pausa && larg) { x -= vel; if (-x >= larg) x = 0; trilho.style.transform = `translateX(${x}px)`; }
      requestAnimationFrame(passo);
    })();
  }

  /* Vídeos: miniaturas girando */
  const videos = (D.videos || []).map((v) => ({ ...v, id: idYoutube(v.link) })).filter((v) => v.id);
  if (vazio(videos, "carrossel", "videosVazio")) {
    const card = (v) => `<button class="video" data-id="${v.id}" aria-label="Assistir: ${esc(v.titulo)}">
        <div class="video-mini"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy"></div>
        <span>${esc(v.titulo)}</span></button>`;
    const trilho = $("trilho");
    // repete os itens para o giro ser contínuo
    const base = videos.map(card).join("");
    const reps = Math.max(2, Math.ceil(8 / videos.length));
    trilho.innerHTML = base.repeat(reps * 2);
    let x = 0, pausa = false, larg = 0;
    const medir = () => { larg = trilho.scrollWidth / 2; };
    medir(); window.addEventListener("resize", medir);
    const car = $("carrossel");
    car.addEventListener("mouseenter", () => (pausa = true));
    car.addEventListener("mouseleave", () => (pausa = false));
    car.addEventListener("focusin", () => (pausa = true));
    car.addEventListener("focusout", () => (pausa = false));
    if (!reduzMovimento) {
      (function giro() {
        if (!pausa && larg) { x -= 0.4; if (-x >= larg) x = 0; trilho.style.transform = `translateX(${x}px)`; }
        requestAnimationFrame(giro);
      })();
    } else { car.style.overflowX = "auto"; }
    trilho.addEventListener("click", (e) => {
      const b = e.target.closest(".video");
      if (b) abrirVideo(b.dataset.id);
    });
  }
  const canais = D.canais || [];
  if (canais.length) $("canais").innerHTML = "Canais recomendados: " + canais.map((k) => `<a href="${esc(k.link)}" target="_blank" rel="noopener">${esc(k.nome)}</a>`).join(" · ");
  const modal = $("modal");
  function abrirVideo(id) {
    $("modalVideo").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Vídeo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    modal.hidden = false;
    modal.querySelector(".modal-fechar").focus();
  }
  function fecharVideo() { modal.hidden = true; $("modalVideo").innerHTML = ""; }
  modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-fechar")) fecharVideo(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) fecharVideo(); });

  /* Artigos */
  const artigos = D.artigos || [];
  if (vazio(artigos, "listaArtigos", "artigosVazio")) {
    $("listaArtigos").innerHTML = artigos.map((a) => `<article class="artigo">
        <div><div class="artigo-ano">${esc(a.ano)}</div><span class="artigo-tema">${esc(a.tema)}</span></div>
        <div><h3>${esc(a.titulo)}</h3>
          <p class="ref">${esc(a.autores)}${a.revista ? " · <em>" + esc(a.revista) + "</em>" : ""}</p>
          <p class="coment">${esc(a.comentario)}</p>
          ${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Ler o artigo original →</a>` : ""}</div>
      </article>`).join("");
  }

  /* Espaço do pesquisador */
  $("listaPesquisas").innerHTML = (D.pesquisas || []).map((p) => `<article class="pesq">
      ${p.status ? `<span class="status">${esc(p.status)}</span>` : ""}
      <h3>${esc(p.titulo)}</h3>
      <p class="quem">${esc(p.pesquisador)} · ${esc(p.nivel)}</p>
      <p>${esc(p.resumo)}</p>
      ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Ver resultados e dados →</a>` : ""}
    </article>`).join("");

  /* Equipe */
  $("listaEquipe").innerHTML = (D.equipe || []).map((m) => `<article class="membro">
      <div class="membro-foto" data-ini="${iniciais(m.nome)}">${m.foto ? `<img src="${esc(m.foto)}" alt="Foto de ${esc(m.nome)}" loading="lazy">` : iniciais(m.nome)}</div>
      <div class="membro-corpo">
        <h3>${esc(m.nome)}</h3>
        <p class="papel">${esc(m.papel)}</p>
        <p class="mini">${esc(m.mini)}</p>
        <div class="membro-links">${(m.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.rotulo)}</a>`).join("")}</div>
      </div></article>`).join("");
  // sem foto no arquivo -> mostra iniciais
  document.querySelectorAll(".membro-foto img").forEach((img) => {
    img.addEventListener("error", () => { const box = img.parentElement; box.textContent = box.dataset.ini; });
  });

  /* Eventos e visitas */
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const futuros = (l) => (l || []).filter((x) => new Date(x.data + "T23:59:00") >= hoje).sort((a, b) => a.data.localeCompare(b.data));
  const eventos = futuros(D.eventos);
  if (vazio(eventos, "listaEventos", "eventosVazio")) {
    $("listaEventos").innerHTML = eventos.map((e) => `<li>${dataBox(e.data)}<div>
        <h4>${e.link ? `<a href="${esc(e.link)}" target="_blank" rel="noopener">${esc(e.titulo)}</a>` : esc(e.titulo)}</h4>
        <p>${esc(e.local)}</p></div></li>`).join("");
  }
  const visitas = futuros(D.visitas);
  if (vazio(visitas, "listaVisitas", "visitasVazio")) {
    $("listaVisitas").innerHTML = visitas.map((v) => `<li>${dataBox(v.data)}<div>
        <h4>Visita aberta · ${esc(v.horario)}</h4>
        <p>${esc(v.vagas)}${v.inscricao ? ` · <a href="${esc(v.inscricao)}" target="_blank" rel="noopener">Inscreva-se</a>` : ""}</p></div></li>`).join("");
  }

  /* Carrosséis de mídia (fotos e vídeos curtos) */
  function montarMidias(lista, carId, trilhoId, vazioId) {
    const itens = (lista || []).filter((f) => f.arquivo || f.video);
    if (!vazio(itens, carId, vazioId)) return;
    const item = (f, i) => f.video
      ? `<button class="foto foto-video" data-i="${i}" aria-label="Assistir: ${esc(f.legenda)}"><video src="${esc(f.video)}" poster="${esc(f.capa || "")}" muted loop playsinline preload="none"></video><span>${esc(f.legenda)}</span></button>`
      : `<button class="foto" data-i="${i}" aria-label="Ampliar: ${esc(f.legenda)}"><img src="${esc(f.arquivo)}" alt="${esc(f.legenda)}" loading="lazy"><span>${esc(f.legenda)}</span></button>`;
    const trilho = $(trilhoId);
    girar($(carId), trilho, itens.map(item).join(""), 0.35);
    trilho.addEventListener("click", (e) => {
      const b = e.target.closest(".foto"); if (!b) return;
      const f = itens[b.dataset.i];
      $("modalVideo").innerHTML = f.video
        ? `<video src="${esc(f.video)}" controls autoplay playsinline></video>`
        : `<img src="${esc(f.arquivo)}" alt="${esc(f.legenda)}">`;
      modal.classList.toggle("modal-foto", !f.video);
      modal.hidden = false; modal.querySelector(".modal-fechar").focus();
    });
    // vídeos da faixa tocam sem som só quando visíveis
    if ("IntersectionObserver" in window && !reduzMovimento) {
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { const v = en.target; en.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: 0.4 });
      trilho.querySelectorAll("video").forEach((v) => { v.preload = "metadata"; io.observe(v); });
    }
  }
  montarMidias(D.midiasColeta, "carrosselColeta", "trilhoColeta", null);
  if (!(D.midiasColeta || []).length) { $("tituloColeta").hidden = true; $("notaColeta").hidden = true; }
  montarMidias(D.fotos, "carrosselFotos", "galeria", "fotosVazio");
})();
