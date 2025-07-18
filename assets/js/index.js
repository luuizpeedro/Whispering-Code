document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".navbar a");
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");

  // Menu mobile toggle
  menuIcon.onclick = () => {
    navbar.classList.toggle("active");
    // Altera o ícone para 'X' ou 'menu'
    const isMenuOpen = navbar.classList.contains("active");
    menuIcon.innerHTML = isMenuOpen
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>`;
  };

  // Ativação do link da navbar no scroll
  window.addEventListener("scroll", () => {
    let fromTop = window.scrollY + 150;

    navLinks.forEach((link) => {
      let section = document.querySelector(link.hash);
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Fecha o menu mobile ao rolar
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      menuIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>`;
    }
  });

  // Fecha o menu mobile ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        menuIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>`;
      }
    });
  });

  // ------------------- //
  // DARK/LIGHT MODE     //
  // ------------------- //
  const themeToggle = document.querySelector("#checkbox");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.body.setAttribute("data-theme", currentTheme);
    if (currentTheme === "light") {
      themeToggle.checked = true;
    }
  } else {
    // Verifica a preferência do sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      document.body.setAttribute("data-theme", "light");
      themeToggle.checked = true;
    }
  }

  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // ------------------- //
  // SCROLL REVEAL       //
  // ------------------- //
  const revealElements = document.querySelectorAll(".reveal");
  const skillItems = document.querySelectorAll(".skill-item");
  const radarPolygon = document.querySelector(".radar-polygon");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Animação das barras de progresso
          if (entry.target.classList.contains("skill-item")) {
            const progress = entry.target.querySelector(".progress");
            const width = entry.target.getAttribute("data-progress");
            progress.style.width = width + "%";
          }

          // Animação do gráfico de radar
          if (entry.target.id === "radar-chart") {
            radarPolygon.setAttribute(
              "points",
              "50,10 88.3,35 75,85 25,85 11.7,35"
            );
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
  skillItems.forEach((el) => revealObserver.observe(el));
  if (document.querySelector("#radar-chart")) {
    // Inicializa o polígono "fechado"
    radarPolygon.setAttribute("points", "50,50 50,50 50,50 50,50 50,50");
    revealObserver.observe(document.querySelector("#radar-chart"));
  }

  // ------------------- //
  // FILTRO DE PROJETOS  //
  // ------------------- //
  const filterContainer = document.querySelector(".projects-filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      // Remove a classe 'active' de todos os botões
      filterContainer.querySelector(".active").classList.remove("active");
      // Adiciona a classe 'active' ao botão clicado
      e.target.classList.add("active");

      const filterValue = e.target.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (card.dataset.category === filterValue || filterValue === "all") {
          card.classList.remove("hide");
          card.style.display = "flex";
        } else {
          card.classList.add("hide");
          card.style.display = "none";
        }
      });
    }
  });

  // ------------------- //
  // VALIDAÇÃO FORMULÁRIO//
  // ------------------- //
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Reset errors
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.style.display = "none"));
    document
      .querySelectorAll(".contact-form input, .contact-form textarea")
      .forEach((el) => (el.style.borderColor = "var(--color-accent)"));

    // Validate Name
    if (name.value.trim() === "") {
      document.getElementById("name-error").style.display = "block";
      name.style.borderColor = "#ff6b6b";
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById("email-error").style.display = "block";
      email.style.borderColor = "#ff6b6b";
      isValid = false;
    }

    // Validate Message
    if (message.value.trim() === "") {
      document.getElementById("message-error").style.display = "block";
      message.style.borderColor = "#ff6b6b";
      isValid = false;
    }

    if (isValid) {
      // Aqui você pode adicionar a lógica para enviar o formulário (ex: via Fetch API)
      alert("Formulário enviado com sucesso! (Esta é uma demonstração)");
      contactForm.reset();
    }
  });

  // ------------------- //
  // ANO DO FOOTER       //
  // ------------------- //
  document.getElementById("year").textContent = new Date().getFullYear();

  // ------------------- //
  // CANVAS DE PARTÍCULAS//
  // ------------------- //
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray;

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();

  let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 120) * (canvas.width / 120),
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Interação com o mouse
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 5;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 5;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 5;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 5;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      let color = "rgba(83, 114, 240, 0.8)";
      particlesArray.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }
  }

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance =
          (particlesArray[a].x - particlesArray[b].x) *
            (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) *
            (particlesArray[a].y - particlesArray[b].y);
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - distance / 20000;
          ctx.strokeStyle = `rgba(83, 114, 240, ${opacityValue})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  window.addEventListener("resize", () => {
    setCanvasSize();
    mouse.radius = (canvas.height / 120) * (canvas.width / 120);
    init();
  });

  init();
  animate();
});
