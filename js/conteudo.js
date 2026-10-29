/* =====================================================================
   CONTEÚDO DO SITE — este é o ÚNICO arquivo que você precisa editar
   no dia a dia. Edite direto pelo GitHub (ícone de lápis), salve
   ("Commit changes") e em ~1 minuto o site atualiza.

   Regras simples:
   - Todo texto fica entre aspas: "assim".
   - Cada item termina com vírgula, inclusive o último (pode).
   - Para apagar um item, apague do { até o } correspondente.
   - Listas vazias  [ ]  mostram a mensagem "Em breve" no site.
   ===================================================================== */

const SITE = {

  /* --- Aviso de proposta ------------------------------------------
     true  = mostra a faixa "Proposta de comunicação" no topo
     false = esconde a faixa (quando o Núcleo estiver formalizado) */
  modoProposta: true,

  /* --- Contato e inscrição (faixa azul da seção "Participe") ---- */
  contato: {
    email: "nucleodetermografia@gmail.com",            // e-mail geral do site
    inscricao: "https://wa.me/qr/4VEF56B4U67PG1",       // link do QR code de inscrição
    duracao: "45 min a 1h",
    laboratorio: "Laboratório LAPIS — Programa de Engenharia Biomédica (PEB/COPPE/UFRJ)",
    sala: "Sala 110 NTIEB — Bloco 3 — Cidade Universitária, Rio de Janeiro",
    whatsapp: [
      { nome: "Márcia", numero: "(21) 98894-8210" },
      { nome: "Rachel", numero: "(21) 98081-3639" },
    ],
    emails: ["mmasc@peb.ufrj.br", "rachelingrid@peb.ufrj.br"],
  },

  /* --- Fotos do campus no topo do site (animação) -----------------
     Coloque as fotos na pasta img/campus/ e escreva os nomes aqui.
     Sem fotos, o topo mostra uma animação de "mapa térmico". */
  fotosCampus: [
    // "img/campus/ct-ufrj.jpg",
    // "img/campus/ntieb-fachada.jpg",
  ],

  /* --- Vídeos (YouTube) -------------------------------------------
     Cole o link inteiro do YouTube. As miniaturas giram sozinhas. */
  videos: [
    { titulo: "What is Infrared? — Teledyne FLIR", link: "https://www.youtube.com/watch?v=PCH0EzpAP34" },
    { titulo: "How Do Thermal Cameras Work? — Teledyne FLIR", link: "https://www.youtube.com/watch?v=dgQMw4406PI" },
    { titulo: "Industrial Thermography: Practical Applications", link: "https://www.youtube.com/watch?v=rlJw-98DQrI" },
    { titulo: "Veja como é feita uma termografia — Manutenção Predial", link: "https://www.youtube.com/watch?v=JMCvTpIAnCg" },
    { titulo: "Termografia", link: "https://www.youtube.com/watch?v=Kbq3C7Kf9nE" },
    { titulo: "Termografia", link: "https://youtu.be/Mhu9qSqZ2ao" },
    { titulo: "Aula #01 — O que é Termografia? — Escola de Termografia", link: "https://www.youtube.com/watch?v=W6sQLMPlUDM" },
    { titulo: "Aplicações da câmera termográfica — IPT", link: "https://www.youtube.com/watch?v=DK0_rhMwghE" },
  ],

  /* --- Canais recomendados (aparecem como links abaixo dos vídeos) - */
  canais: [
    { nome: "Infrared Training Center", link: "https://www.youtube.com/infraredtraining" },
  ],

  /* --- Artigos comentados ------------------------------------------
     Só publique com DOI ou link conferido. */
  artigos: [
    // {
    //   titulo: "Título do artigo",
    //   autores: "Sobrenome A, Sobrenome B",
    //   revista: "Nome da revista",
    //   ano: "2026",
    //   link: "https://doi.org/...",
    //   comentario: "Em linguagem simples: o que o estudo fez, o que encontrou e por que importa.",
    //   tema: "Medicina",   // Medicina, Engenharia, Metrologia, Veterinária...
    // },
  ],

  /* --- Espaço do pesquisador -------------------------------------- */
  pesquisas: [
    {
      titulo: "Termografia infravermelha como ferramenta de estudo do envelhecimento fisiológico",
      pesquisador: "Márcia Ramos da Silva do Nascimento",
      nivel: "Doutorado — PEB/COPPE/UFRJ",
      resumo: "Acompanha, ao longo de dois anos, como o calor da pele e a força das mãos mudam com a idade, usando câmera térmica, teste de força manual e balança de composição corporal.",
      status: "Coleta em andamento",
      link: "",
    },
    {
      titulo: "ProPOM — Proxy Periorbital Medial",
      pesquisador: "Rachel Ingrid Pereira da Rocha Jannuzzi",
      nivel: "Mestrado — PEB/COPPE/UFRJ",
      resumo: "Desenvolve e valida uma cabine de isolamento térmico para medir a temperatura do canto interno do olho com menos interferência do ambiente (ar-condicionado, umidade e calor refletido).",
      status: "Validação metrológica",
      link: "https://rachelingrid.github.io/PROPOM/",
    },
  ],

  /* --- Equipe -------------------------------------------------------
     foto: coloque a imagem em img/equipe/ (quadrada, ~400x400 px).
     Se a foto não existir, aparecem as iniciais. */
  equipe: [
    {
      nome: "Prof. Dr. Carlos Julio Tierra Criollo",
      papel: "Chefe do laboratório",
      foto: "img/equipe/carlos-julio.jpg",
      mini: "Graduado em Engenharia Eletrônica pela Escuela Politécnica del Ejército (Quito, 1986), mestre (1993) e doutor (2001) em Engenharia Biomédica pela UFRJ. Foi professor associado do Departamento de Engenharia Elétrica da UFMG. É professor associado da COPPE/UFRJ, no Laboratório de Processamento de Imagens e Sinais (LAPIS).",
      links: [
        { rotulo: "Lattes", url: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4708330H7" },
        { rotulo: "Perfil no PEB", url: "https://www.peb.ufrj.br/inicio/quem-somos/39-docentes-e-pesquisadores/82-carlos-julio-tierra-criollo" },
      ],
    },
    {
      nome: "Prof. Dr. Maurício Cagy",
      papel: "Professor orientador",
      foto: "img/equipe/mauricio-cagy.jpg",
      mini: "Engenheiro eletricista com ênfase em Eletrônica (UFRJ, 1997), mestre (1999) e doutor (2003) em Engenharia Biomédica pela UFRJ. Foi professor adjunto da UFF (2006–2012). É professor associado da UFRJ, com atuação em processamento de sinais biológicos: potenciais evocados, plano anestésico, monitorização e detecção objetiva de respostas.",
      links: [
        { rotulo: "Lattes", url: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4763604D6" },
        { rotulo: "Perfil no PEB", url: "https://www.peb.ufrj.br/quem-somos-interna/39-docentes-e-pesquisadores/87-mauricio-cagy" },
      ],
    },
    {
      nome: "Márcia Ramos da Silva do Nascimento",
      papel: "Doutoranda — PEB/COPPE/UFRJ",
      foto: "img/equipe/marcia-ramos.jpg",
      mini: "Doutoranda do Programa de Engenharia Biomédica da COPPE/UFRJ. Pesquisa a termografia infravermelha como ferramenta de estudo do envelhecimento fisiológico, associando imagens térmicas, força de preensão manual e composição corporal.",
      links: [
        { rotulo: "Currículo", url: "https://www.escavador.com/sobre/800663/marcia-ramos-da-silva-do-nascimento" },
      ],
    },
    {
      nome: "Rachel Ingrid Pereira da Rocha Jannuzzi",
      papel: "Mestranda — PEB/COPPE/UFRJ",
      foto: "img/equipe/rachel-ingrid.jpg",
      mini: "Fisioterapeuta intensivista com mais de 20 anos de atuação em UTI, incluindo a linha de frente da COVID-19. No mestrado, desenvolve protocolos e uma cabine de isolamento térmico para tornar reprodutível a termografia da região periorbital.",
      links: [
        { rotulo: "ORCID", url: "https://orcid.org/0000-0002-0408-6302" },
        { rotulo: "Currículo", url: "https://fisiorachelingrid.wixsite.com/rachelingrid" },
      ],
    },
  ],

  /* --- Eventos ------------------------------------------------------ */
  eventos: [
    // { data: "2026-11-20", titulo: "Nome do evento", local: "Cidade / online", link: "https://..." },
  ],

  /* --- Ciclo de visitas abertas ao público ------------------------- */
  visitas: [
    // { data: "2026-12-05", horario: "10h às 12h", vagas: "15 vagas", inscricao: "https://..." },
  ],

  /* --- Galeria de fotos (pasta img/fotos/) ------------------------ */
  fotos: [
    // { arquivo: "img/fotos/semana-peb-2026.jpg", legenda: "Semana do PEB 2026" },
  ],
};
