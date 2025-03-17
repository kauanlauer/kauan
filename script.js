 // Manipulação do formulário usando Web3Forms
 const contactForm = document.getElementById('contactForm');
  
 if (contactForm) {
   contactForm.addEventListener('submit', function(e) {
     e.preventDefault(); // Impede o envio padrão do formulário
     
     const formSubmit = this.querySelector('.form-submit');
     const formStatus = this.querySelector('.form-status');
     const successMessage = this.querySelector('.success-message');
     const errorMessage = this.querySelector('.error-message');
     const originalText = formSubmit.innerHTML;
     
     // Esconde mensagens de status anteriores
     formStatus.style.display = 'none';
     successMessage.style.display = 'none';
     errorMessage.style.display = 'none';
     
     // Altera o botão para indicar que está enviando
     formSubmit.innerHTML = '<span class="button-text">Enviando...</span>';
     formSubmit.disabled = true;
     
     // Prepara os dados do formulário
     const formData = new FormData(contactForm);
     
     // Envia os dados para o Web3Forms
     fetch('https://api.web3forms.com/submit', {
       method: 'POST',
       body: formData
     })
     .then(response => response.json())
     .then(data => {
       // Mostra o status do formulário
       formStatus.style.display = 'block';
       
       if(data.success) {
         // Mensagem enviada com sucesso
         successMessage.style.display = 'block';
         contactForm.reset(); // Limpa o formulário
       } else {
         // Erro ao enviar a mensagem
         errorMessage.style.display = 'block';
       }
       
       // Restaura o botão depois de 3 segundos
       setTimeout(() => {
         formSubmit.innerHTML = originalText;
         formSubmit.disabled = false;
       }, 3000);
     })
     .catch(error => {
       // Erro na requisição
       formStatus.style.display = 'block';
       errorMessage.style.display = 'block';
       
       // Restaura o botão depois de 3 segundos
       setTimeout(() => {
         formSubmit.innerHTML = originalText;
         formSubmit.disabled = false;
       }, 3000);
     });
   });
}

    // Definir o ano atual no copyright
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    const animateCursor = () => {
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;
      
      follower.style.left = posX + 'px';
      follower.style.top = posY + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Elementos clicáveis com efeito hover no cursor
    const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-item');
    
    hoverables.forEach(hoverable => {
      hoverable.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        follower.classList.add('follower-hover');
      });
      
      hoverable.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('follower-hover');
      });
    });
    
    // Animação de carregamento da página
    window.addEventListener('load', () => {
      const loadingOverlay = document.querySelector('.loading-overlay');
      
      setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        
        setTimeout(() => {
          loadingOverlay.style.display = 'none';
          document.body.classList.add('loaded');
        }, 500);
      }, 1500);
    });
    
    // Navegação mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
    
    // Vídeo do projeto
    const videoPlayButton = document.querySelector('.video-play-button');
    const projectVideo = document.querySelector('.project-video');
    
    if (videoPlayButton && projectVideo) {
      videoPlayButton.addEventListener('click', () => {
        projectVideo.play();
        videoPlayButton.style.display = 'none';
        projectVideo.setAttribute('controls', 'true');
      });
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Botão voltar ao topo
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Animação de elementos no scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
    

    // Adicione este código ao seu arquivo script.js

function initMagneticCursor() {
  // Elementos já existentes
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  // Adicionar um terceiro elemento para efeitos especiais
  const cursorSpecial = document.createElement('div');
  cursorSpecial.classList.add('cursor-special');
  document.body.appendChild(cursorSpecial);
  
  // Estilização do elemento especial
  cursorSpecial.style.position = 'fixed';
  cursorSpecial.style.width = '100px';
  cursorSpecial.style.height = '100px';
  cursorSpecial.style.borderRadius = '50%';
  cursorSpecial.style.transform = 'translate(-50%, -50%) scale(0.5)';
  cursorSpecial.style.backgroundColor = 'rgba(124, 58, 237, 0.03)';
  cursorSpecial.style.border = '1px solid rgba(124, 58, 237, 0.1)';
  cursorSpecial.style.zIndex = '9998';
  cursorSpecial.style.pointerEvents = 'none';
  cursorSpecial.style.opacity = '0';
  cursorSpecial.style.transition = 'transform 0.3s, opacity 0.3s, width 0.3s, height 0.3s';
  
  // Variáveis para animação
  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;
  let specialPosX = 0;
  let specialPosY = 0;
  let isMouseMoving = false;
  let mouseMoveTimeout;
  let cursorMode = 'default'; // 'default', 'hover', 'magnetic'
  let activeMagneticElement = null;
  
  // Função para detectar movimento do mouse
  function detectMouseMovement() {
    isMouseMoving = true;
    clearTimeout(mouseMoveTimeout);
    
    mouseMoveTimeout = setTimeout(() => {
      isMouseMoving = false;
    }, 300);
  }
  
  // Atualização da posição do cursor
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    detectMouseMovement();
  });
  
  // Elementos que podem ter efeito de magnetismo
  const magneticElements = document.querySelectorAll(
    '.button, .project-link, .social-link, .logo-icon, .skill-item, .nav-link'
  );
  
  // Adicionar comportamento de magnetismo aos elementos
  magneticElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorMode = 'magnetic';
      activeMagneticElement = element;
      
      // Aumentar o follower e mudar a cor
      follower.style.width = '25px';
      follower.style.height = '25px';
      follower.style.mixBlendMode = 'lighten';
      follower.style.backgroundColor = 'rgba(124, 58, 237, 0.2)';
      
      // Mostrar o elemento especial
      cursorSpecial.style.opacity = '1';
      cursorSpecial.style.width = '80px';
      cursorSpecial.style.height = '80px';
      cursorSpecial.style.border = '1px solid rgba(124, 58, 237, 0.3)';
      
      // Adicionar animação pulsante
      follower.style.animation = 'cursor-pulse 1.5s infinite alternate';
      const keyframes = `
        @keyframes cursor-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.4; }
        }
      `;
      
      // Adicionar keyframes se não existirem
      if (!document.querySelector('#cursor-animations')) {
        const style = document.createElement('style');
        style.id = 'cursor-animations';
        style.innerHTML = keyframes;
        document.head.appendChild(style);
      }
    });
    
    element.addEventListener('mouseleave', () => {
      cursorMode = 'default';
      activeMagneticElement = null;
      
      // Resetar o follower
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.mixBlendMode = 'normal';
      follower.style.backgroundColor = 'transparent';
      follower.style.animation = '';
      
      // Ocultar o elemento especial
      cursorSpecial.style.opacity = '0';
      cursorSpecial.style.width = '100px';
      cursorSpecial.style.height = '100px';
    });
  });
  
  // Função para calcular efeito de magnetismo
  function applyMagneticEffect() {
    if (cursorMode === 'magnetic' && activeMagneticElement) {
      const rect = activeMagneticElement.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      
      // Calcular distância entre o cursor e o centro do elemento
      const distanceX = mouseX - elementX;
      const distanceY = mouseY - elementY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Fator de atração - quanto menor, mais forte o magnetismo
      const attractionFactor = Math.min(distance * 0.12, 15);
      
      // Ajustar cursor para "puxar" em direção ao elemento
      if (distance < 200) {
        const pullX = distanceX / attractionFactor;
        const pullY = distanceY / attractionFactor;
        
        posX = mouseX - pullX;
        posY = mouseY - pullY;
        
        // Efeito especial ao redor do elemento
        specialPosX += (elementX - specialPosX) * 0.2;
        specialPosY += (elementY - specialPosY) * 0.2;
        cursorSpecial.style.left = specialPosX + 'px';
        cursorSpecial.style.top = specialPosY + 'px';
      } else {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;
        
        specialPosX += (mouseX - specialPosX) * 0.1;
        specialPosY += (mouseY - specialPosY) * 0.1;
        cursorSpecial.style.left = specialPosX + 'px';
        cursorSpecial.style.top = specialPosY + 'px';
      }
      
      // Aplicar efeito sutil ao próprio elemento
      if (distance < 100) {
        const moveX = distanceX * 0.05;
        const moveY = distanceY * 0.05;
        activeMagneticElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    } else {
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;
      
      specialPosX += (mouseX - specialPosX) * 0.1;
      specialPosY += (mouseY - specialPosY) * 0.1;
      cursorSpecial.style.left = specialPosX + 'px';
      cursorSpecial.style.top = specialPosY + 'px';
      
      // Resetar transformação dos elementos
      magneticElements.forEach(element => {
        if (element !== activeMagneticElement) {
          element.style.transform = '';
        }
      });
    }
    
    // Movimentação básica do follower
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    
    // Efeito de atraso/inércia para o cursor principal
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Efeitos adicionais baseados no movimento
    if (isMouseMoving) {
      const velocity = Math.sqrt(
        (mouseX - posX) * (mouseX - posX) + 
        (mouseY - posY) * (mouseY - posY)
      );
      
      if (velocity > 5) {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        follower.style.width = '30px';
        follower.style.height = '30px';
      } else {
        cursor.style.width = '';
        cursor.style.height = '';
        if (cursorMode === 'default') {
          follower.style.width = '40px';
          follower.style.height = '40px';
        }
      }
    } else {
      cursor.style.width = '';
      cursor.style.height = '';
      if (cursorMode === 'default') {
        follower.style.width = '40px';
        follower.style.height = '40px';
      }
    }
    
    requestAnimationFrame(applyMagneticEffect);
  }
  
  // Iniciar o loop de animação
  applyMagneticEffect();
  
  // Lidar com o cursor saindo da janela
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
    cursorSpecial.style.opacity = '0';
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
  
  // Resetar o cursor quando clicado
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

// Inicializar o cursor magnético
document.addEventListener('DOMContentLoaded', initMagneticCursor);



// Adicione este script antes do fechamento do body em index.html
// Primeiro, adicione a div do canvas no HTML
// <div class="webgl-background"></div>

// Importar Three.js de CDN
document.addEventListener('DOMContentLoaded', function() {
  // Criar elemento de script para Three.js
  const threeScript = document.createElement('script');
  threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  document.head.appendChild(threeScript);

  threeScript.onload = initWebGLBackground;

  function initWebGLBackground() {
    const container = document.querySelector('.webgl-background');
    if (!container) return;

    let camera, scene, renderer;
    let uniforms;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();

      // Criando um shader para o background
      const geometry = new THREE.PlaneBufferGeometry(2, 2);

      uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2() },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_color1: { type: 'v3', value: new THREE.Vector3(0.1, 0.1, 0.1) }, // Dark bg
        u_color2: { type: 'v3', value: new THREE.Vector3(0.5, 0.2, 0.7) }, // Purple
        u_color3: { type: 'v3', value: new THREE.Vector3(0.1, 0.5, 0.3) }  // Green
      };

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform vec3 u_color3;

          void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            vec2 uv = st;
            
            // Distorção baseada no mouse
            float distX = uv.x - u_mouse.x;
            float distY = uv.y - u_mouse.y;
            float dist = sqrt(distX * distX + distY * distY);
            
            // Gradiente animado
            float angle = atan(distY, distX) + u_time * 0.1;
            float strength = sin(angle * 5.0) * 0.5 + 0.5;
            
            // Mix dos três cores
            vec3 color = mix(u_color1, u_color2, st.x + sin(u_time * 0.2) * 0.2);
            color = mix(color, u_color3, 
                      smoothstep(0.3, 0.7, 
                                 st.y + cos(u_time * 0.1 + st.x * 5.0) * 0.15));
            
            // Efeito vinheta
            float vignette = 1.0 - smoothstep(0.5, 1.5, dist * 2.0);
            color = mix(color * 0.8, color, vignette);
            
            // Adicionar um pouco de noise
            float noise = fract(sin(dot(st, vec2(12.9898, 78.233)) * u_time * 0.001) * 43758.5453);
            color += noise * 0.03;
            
            gl_FragColor = vec4(color, 0.97); // Levemente transparente
          }
        `
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Configurar renderer
      renderer = new THREE.WebGLRenderer({alpha: true});
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      onWindowResize();
      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('mousemove', onMouseMove, false);
    }

    function onWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      windowHalfX = width / 2;
      windowHalfY = height / 2;
      
      renderer.setSize(width, height);
      uniforms.u_resolution.value.x = width;
      uniforms.u_resolution.value.y = height;
    }

    function onMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
      
      uniforms.u_mouse.value.x = mouseX * 0.5 + 0.5; // Normalizado para 0-1
      uniforms.u_mouse.value.y = 1.0 - (mouseY * 0.5 + 0.5); // Invertido para coordenadas GL
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      uniforms.u_time.value += 0.05;
      renderer.render(scene, camera);
    }
  }
});

// Adicione este código ao seu script.js

function initParallaxEffects() {
  // Verificar se temos suporte para IntersectionObserver
  if ('IntersectionObserver' in window) {
    // Configurar observador para elementos com parallax
    const parallaxObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
        } else {
          // Opcional: remover classe quando estiver fora da viewport
          // entry.target.classList.remove('in-viewport');
        }
      });
    }, {
      threshold: 0.1 // 10% do elemento visível
    });
    
    // Elementos que terão efeito de parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
      parallaxObserver.observe(element);
    });
  }

  // Efeito de parallax baseado em mouse para hero section
  const heroSection = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.image-wrapper');
  const heroGradient = document.querySelector('.hero-gradient');
  const noise = document.querySelector('.noise');
  
  if (heroSection && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Movimento sutil da imagem (3D effect)
      if (heroImage) {
        heroImage.style.transform = `perspective(1000px) 
                                     rotateY(${(x - 0.5) * 10}deg) 
                                     rotateX(${(y - 0.5) * -10}deg)
                                     translateZ(10px)`;
      }
      
      // Movimento do conteúdo
      if (heroContent) {
        heroContent.style.transform = `translateX(${(x - 0.5) * -15}px) 
                                       translateY(${(y - 0.5) * -10}px)`;
      }
      
      // Movimento do gradiente de fundo
      if (heroGradient) {
        heroGradient.style.transform = `translateX(${(x - 0.5) * -25}px) 
                                         translateY(${(y - 0.5) * -25}px)`;
      }
      
      // Movimento da textura de ruído
      if (noise) {
        noise.style.transform = `translateX(${(x - 0.5) * 10}px) 
                                  translateY(${(y - 0.5) * 10}px)`;
      }
    });
  }

  // Parallax no scroll para as seções
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const distance = sectionTop - scrollY;
      
      // Parallax para elementos dentro da seção
      const title = section.querySelector('.section-title');
      const subtitle = section.querySelector('.section-subtitle');
      const content = section.querySelector('.section > .container > *:not(.section-header)');
      
      if (title && window.innerWidth > 768) {
        title.style.transform = `translateY(${distance * 0.05}px)`;
      }
      
      if (subtitle && window.innerWidth > 768) {
        subtitle.style.transform = `translateY(${distance * 0.08}px)`;
      }
      
      if (content && window.innerWidth > 768) {
        content.style.transform = `translateY(${distance * 0.03}px)`;
      }
    });
    
    // Efeito parallax para cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      const speed = 1 + (index % 3) * 0.1; // Velocidades diferentes para cada card
      card.style.transform = `translateY(${scrollY * 0.01 * speed}px)`;
    });
  });
}

// Adicionar classe para os elementos que precisarão de parallax
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar classe para elementos com parallax
  const elementsForParallax = [
    '.hero-name', 
    '.hero-occupation', 
    '.hero-description',
    '.hero-cta',
    '.image-wrapper',
    '.about-image',
    '.about-text',
    '.skills-category',
    '.project-card',
    '.tcc-content',
    '.contact-form',
    '.contact-info'
  ];
  
  elementsForParallax.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.classList.add('parallax-element'));
  });

  // Iniciar efeitos de parallax
  initParallaxEffects();
});


// Atualização avançada do cursor magnético para substituir a função existente
// Substitua a função initMagneticCursor no seu script.js por esta versão melhorada

function initAdvancedMagneticCursor() {
  // Elementos base do cursor
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  // Verificar se existem
  if (!cursor || !follower) return;
  
  // Criar elemento para efeitos especiais
  const cursorSpecial = document.createElement('div');
  cursorSpecial.classList.add('cursor-special');
  document.body.appendChild(cursorSpecial);
  
  // Estilização do elemento especial
  cursorSpecial.style.cssText = `
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    background-color: rgba(124, 58, 237, 0.03);
    border: 1px solid rgba(124, 58, 237, 0.1);
    z-index: 9998;
    pointer-events: none;
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), 
                opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), 
                width 0.3s cubic-bezier(0.22, 1, 0.36, 1), 
                height 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  `;
  
  // Criar partículas para efeitos especiais
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('cursor-particles');
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9997;
    overflow: hidden;
  `;
  document.body.appendChild(particlesContainer);
  
  // Variáveis para animação
  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;
  let specialPosX = 0;
  let specialPosY = 0;
  let isMouseMoving = false;
  let mouseMoveTimeout;
  let cursorMode = 'default'; // 'default', 'hover', 'magnetic'
  let activeMagneticElement = null;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let mouseSpeed = 0;
  let lastUpdateTime = Date.now();
  
  // Função para criar partículas
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('cursor-particle');
    
    // Estilo da partícula
    const size = Math.random() * 10 + 5;
    const angle = Math.random() * 360;
    const speed = Math.random() * 60 + 20;
    const opacity = Math.random() * 0.5 + 0.3;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: rgba(124, 58, 237, ${opacity});
      border-radius: 50%;
      top: ${y}px;
      left: ${x}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;
    
    particlesContainer.appendChild(particle);
    
    // Animar a partícula
    const xMove = Math.cos(angle * Math.PI / 180) * speed;
    const yMove = Math.sin(angle * Math.PI / 180) * speed;
    
    let progress = 0;
    const duration = Math.random() * 1000 + 500;
    const startTime = Date.now();
    
    function animateParticle() {
      const currentTime = Date.now();
      progress = (currentTime - startTime) / duration;
      
      if (progress >= 1) {
        particle.remove();
        return;
      }
      
      // Movimento da partícula
      const currentX = x + xMove * progress;
      const currentY = y + yMove * progress;
      
      // Fade out
      const currentOpacity = opacity * (1 - progress);
      const currentSize = size * (1 - progress * 0.5);
      
      particle.style.left = `${currentX}px`;
      particle.style.top = `${currentY}px`;
      particle.style.opacity = currentOpacity;
      particle.style.width = `${currentSize}px`;
      particle.style.height = `${currentSize}px`;
      
      requestAnimationFrame(animateParticle);
    }
    
    requestAnimationFrame(animateParticle);
  }
  
  // Função para detectar e calcular velocidade do mouse
  function detectMouseMovement(event) {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTime;
    
    // Calcular distância entre posições do mouse
    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Calcular velocidade (pixels por segundo)
    mouseSpeed = distance / (deltaTime / 1000);
    
    // Atualizar posições e tempo
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    lastUpdateTime = currentTime;
    
    // Marcar movimento do mouse e limpar timeout
    isMouseMoving = true;
    clearTimeout(mouseMoveTimeout);
    
    // Criar partículas baseadas na velocidade do mouse
    if (mouseSpeed > 150 && Math.random() > 0.7) {
      createParticle(event.clientX, event.clientY);
    }
    
    // Reset após pausa no movimento
    mouseMoveTimeout = setTimeout(() => {
      isMouseMoving = false;
      mouseSpeed = 0;
    }, 100);
  }
  
  // Atualização da posição do cursor
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    detectMouseMovement(e);
    
    // Atualizar posição do cursor principal imediatamente
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  // Elementos que terão o efeito de magnetismo
  const magneticElements = document.querySelectorAll(
    '.button, .project-link, .social-link, .logo-icon, .skill-item, .nav-link, .project-tech-showcase, .tech-item, .footer-link'
  );
  
  // Adicionar comportamento magnético aos elementos
  magneticElements.forEach(element => {
    // Hover
    element.addEventListener('mouseenter', () => {
      cursorMode = 'magnetic';
      activeMagneticElement = element;
      
      // Adicionar classe ao elemento para efeitos visuais
      element.classList.add('magnetic-hover');
      
      // Aumentar o follower e mudar estilo
      follower.style.width = '28px';
      follower.style.height = '28px';
      follower.style.mixBlendMode = 'lighten';
      follower.style.backgroundColor = 'rgba(124, 58, 237, 0.2)';
      follower.style.borderColor = 'rgba(124, 58, 237, 0.6)';
      
      // Mostrar elemento de efeito especial
      cursorSpecial.style.opacity = '1';
      cursorSpecial.style.width = '80px';
      cursorSpecial.style.height = '80px';
      cursorSpecial.style.border = '1px solid rgba(124, 58, 237, 0.3)';
      
      // Adicionar animação de pulso
      const styleTag = document.createElement('style');
      styleTag.id = 'cursor-animations';
      styleTag.textContent = `
        @keyframes cursor-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.4; }
        }
      `;
      if (!document.querySelector('#cursor-animations')) {
        document.head.appendChild(styleTag);
      }
      
      follower.style.animation = 'cursor-pulse 1.5s infinite alternate';
      
      // Criar partículas ao hover
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(
            element.getBoundingClientRect().left + element.offsetWidth / 2, 
            element.getBoundingClientRect().top + element.offsetHeight / 2
          );
        }, i * 50);
      }
    });
    
    element.addEventListener('mouseleave', () => {
      cursorMode = 'default';
      activeMagneticElement = null;
      
      // Remover classe do elemento
      element.classList.remove('magnetic-hover');
      element.style.transform = '';
      
      // Resetar o follower
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.mixBlendMode = 'normal';
      follower.style.backgroundColor = 'transparent';
      follower.style.borderColor = 'rgba(124, 58, 237, 0.5)';
      follower.style.animation = '';
      
      // Ocultar elemento especial
      cursorSpecial.style.opacity = '0';
      cursorSpecial.style.width = '100px';
      cursorSpecial.style.height = '100px';
    });
    
    // Adicionar efeito de clique
    element.addEventListener('mousedown', () => {
      if (cursorMode === 'magnetic') {
        follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
        element.style.transform = 'scale(0.95)';
        
        // Criar várias partículas no clique
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            createParticle(
              element.getBoundingClientRect().left + Math.random() * element.offsetWidth, 
              element.getBoundingClientRect().top + Math.random() * element.offsetHeight
            );
          }, i * 20);
        }
      }
    });
    
    element.addEventListener('mouseup', () => {
      if (cursorMode === 'magnetic') {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Resetar a escala, mas manter o efeito magnético
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - elementX;
        const distanceY = mouseY - elementY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        const attractionFactor = Math.min(distance * 0.12, 15);
        const moveX = distanceX * 0.08;
        const moveY = distanceY * 0.08;
        
        if (distance < 100) {
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      }
    });
  });
  
  // Função para calcular o efeito de magnetismo
  function applyMagneticEffect() {
    if (cursorMode === 'magnetic' && activeMagneticElement) {
      const rect = activeMagneticElement.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      
      // Distância entre cursor e centro do elemento
      const distanceX = mouseX - elementX;
      const distanceY = mouseY - elementY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Fator de atração - quanto menor, mais forte o magnetismo
      const attractionFactor = Math.min(distance * 0.12, 15);
      
      // Movimento magnético do cursor
      if (distance < 200) {
        const pullX = distanceX / attractionFactor;
        const pullY = distanceY / attractionFactor;
        
        posX = mouseX - pullX;
        posY = mouseY - pullY;
        
        // Efeito especial ao redor do elemento
        specialPosX += (elementX - specialPosX) * 0.2;
        specialPosY += (elementY - specialPosY) * 0.2;
        cursorSpecial.style.left = specialPosX + 'px';
        cursorSpecial.style.top = specialPosY + 'px';
        
        // Efeito no elemento ativo
        if (distance < 100) {
          const moveX = distanceX * 0.08;
          const moveY = distanceY * 0.08;
          activeMagneticElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      } else {
        // Comportamento normal quando está longe de elementos magnéticos
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;
        
        specialPosX += (mouseX - specialPosX) * 0.1;
        specialPosY += (mouseY - specialPosY) * 0.1;
        cursorSpecial.style.left = specialPosX + 'px';
        cursorSpecial.style.top = specialPosY + 'px';
      }
    } else {
      // Comportamento padrão do cursor
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;
      
      specialPosX += (mouseX - specialPosX) * 0.1;
      specialPosY += (mouseY - specialPosY) * 0.1;
      cursorSpecial.style.left = specialPosX + 'px';
      cursorSpecial.style.top = specialPosY + 'px';
      
      // Resetar transformação dos elementos sem hover
      magneticElements.forEach(element => {
        if (element !== activeMagneticElement && element.classList.contains('magnetic-hover')) {
          element.style.transform = '';
          element.classList.remove('magnetic-hover');
        }
      });
    }
    
    // Aplicar a posição ao cursor follower
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    
    // Efeitos baseados na velocidade do mouse
    if (isMouseMoving) {
      // Efeito de esticar o cursor na direção do movimento
      const stretchFactor = Math.min(mouseSpeed / 600, 0.3);
      
      // Calcular ângulo do movimento
      const angle = Math.atan2(mouseY - posY, mouseX - posX);
      
      // Aplicar esticamento baseado no ângulo e velocidade
      if (mouseSpeed > 100) {
        cursor.style.width = `${12 + stretchFactor * 30}px`;
        cursor.style.height = `${12 - stretchFactor * 6}px`;
        cursor.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        
        follower.style.width = `${40 + stretchFactor * 20}px`;
        follower.style.height = `${40 - stretchFactor * 10}px`;
        follower.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      } else {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.transform = 'translate(-50%, -50%)';
        
        if (cursorMode === 'default') {
          follower.style.width = '40px';
          follower.style.height = '40px';
          follower.style.transform = 'translate(-50%, -50%)';
        }
      }
    } else {
      // Resetar para tamanho padrão quando parado
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.transform = 'translate(-50%, -50%)';
      
      if (cursorMode === 'default') {
        follower.style.width = '40px';
        follower.style.height = '40px';
        follower.style.transform = 'translate(-50%, -50%)';
      }
    }
    
    requestAnimationFrame(applyMagneticEffect);
  }
  
  // Iniciar loop de animação
  applyMagneticEffect();
  
  // Lidar com o cursor saindo da janela
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget == null || e.relatedTarget.nodeName === 'HTML') {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
      cursorSpecial.style.opacity = '0';
      particlesContainer.style.opacity = '0';
    }
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
    particlesContainer.style.opacity = '1';
  });
  
  // Efeito de clique global
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    if (cursorMode === 'default') {
      follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
    
    // Criar algumas partículas no clique
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createParticle(mouseX, mouseY);
      }, i * 30);
    }
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    
    if (cursorMode === 'default') {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });
}

// Iniciar cursor magnético avançado
document.addEventListener('DOMContentLoaded', initAdvancedMagneticCursor);

// Adicione este código ao seu script.js para criar efeitos de texto de alta qualidade





document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--wave-x', `${x}px`);
    this.style.setProperty('--wave-y', `${y}px`);
    
    this.classList.remove('wave');
    void this.offsetWidth; // Force reflow
    this.classList.add('wave');
  });
});


// Adicione este script para criar um efeito de scroll suave premium

function initPremiumSmoothScroll() {
  // Verificar se a Locomotive Scroll está disponível
  const loadLocomotiveScroll = () => {
    return new Promise((resolve, reject) => {
      // Carregar CSS
      const locomotiveCSS = document.createElement('link');
      locomotiveCSS.rel = 'stylesheet';
      locomotiveCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/locomotive-scroll/4.1.4/locomotive-scroll.min.css';
      document.head.appendChild(locomotiveCSS);
      
      // Carregar JS
      const locomotiveScript = document.createElement('script');
      locomotiveScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/locomotive-scroll/4.1.4/locomotive-scroll.min.js';
      locomotiveScript.onload = () => resolve(true);
      locomotiveScript.onerror = () => {
        console.warn('Não foi possível carregar Locomotive Scroll, usando fallback.');
        resolve(false);
      };
      document.head.appendChild(locomotiveScript);
    });
  };
  
  // Iniciar scroll suave premium
  loadLocomotiveScroll().then(locomotiveLoaded => {
    if (locomotiveLoaded && typeof LocomotiveScroll !== 'undefined') {
      // Inicializar Locomotive Scroll
      initLocomotiveScroll();
    } else {
      // Fallback para scroll suave nativo
      initNativeSmoothScroll();
    }
  });
  
  function initLocomotiveScroll() {
    // Preparar o DOM
    document.body.setAttribute('data-scroll-container', '');
    
    // Adicionar atributos de smooth scroll
    document.querySelectorAll('section, .hero, .footer').forEach(section => {
      section.setAttribute('data-scroll-section', '');
    });
    
    document.querySelectorAll('.hero-name, .hero-occupation, .hero-description, .hero-cta, .image-wrapper, .section-title, .section-subtitle, .project-card, .skills-category').forEach(el => {
      el.setAttribute('data-scroll', '');
      el.setAttribute('data-scroll-speed', ((Math.random() * 0.6) - 0.3).toFixed(2));
    });
    
    // Adicionar estilos para o corpo
    const bodyStyle = document.createElement('style');
    bodyStyle.textContent = `
      html.has-scroll-smooth {
        overflow: hidden;
      }
      
      html.has-scroll-dragging {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      .has-scroll-smooth body {
        overflow: hidden;
      }
    `;
    document.head.appendChild(bodyStyle);
    
    // Inicializar LocomotiveScroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 0.9,
      lerp: 0.1,
      smartphone: {
        smooth: false
      },
      tablet: {
        smooth: false
      }
    });
    
    // Atualizar o scroll quando o conteúdo for carregado
    window.addEventListener('load', () => {
      scroll.update();
    });
    
    // Atualizar em caso de redimensionamento
    window.addEventListener('resize', () => {
      scroll.update();
    });
    
    // Scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          scroll.scrollTo(targetElement);
        }
      });
    });
    
    // Efeito de parallax nas imagens quando scrollar
    document.querySelectorAll('.about-img, .project-img, .hero-image').forEach(img => {
      img.setAttribute('data-scroll', '');
      img.setAttribute('data-scroll-speed', '-0.5');
    });
    
    // Atualizações de progresso para efeitos visuais
    scroll.on('scroll', (args) => {
      // Calcular progresso do scroll (0 a 1)
      const scrollProgress = args.scroll.y / (document.body.scrollHeight - window.innerHeight);
      
      // Atualizar variável CSS para efeitos baseados no scroll
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
      
      // Aplicar efeitos baseados no scroll
      applyScrollEffects(scrollProgress, args.scroll.y);
    });
    
    // Revelar elementos à medida que são scrollados
    scroll.on('call', (value, way, obj) => {
      if (value === 'reveal' && way === 'enter') {
        obj.el.classList.add('revealed');
      }
    });
    
    // Marcar elementos para revelar
    document.querySelectorAll('.fade-in').forEach(el => {
      el.setAttribute('data-scroll', '');
      el.setAttribute('data-scroll-call', 'reveal');
    });
    
    // Expor o objeto scroll globalmente para debugging
    window.locomotiveScroll = scroll;
  }
  
  function initNativeSmoothScroll() {
    // Fallback para navegadores sem suporte ao LocomotiveScroll
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Adicionar evento de scroll para efeitos
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
      
      // Aplicar efeitos baseados no scroll
      applyScrollEffects(scrollPercent, scrollTop);
      
      // Revelar elementos conforme o scroll
      revealElementsOnScroll();
    });
    
    // Scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Chamar uma vez para configuração inicial
    revealElementsOnScroll();
  }
  
  // Função para revelar elementos conforme o scroll (versão nativa)
  function revealElementsOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('visible');
      }
    });
  }
  
  // Efeitos visuais baseados na posição do scroll
  function applyScrollEffects(scrollProgress, scrollY) {
    // Header - escurecer gradualmente conforme scroll desce
    const header = document.querySelector('.header');
    if (header) {
      const headerOpacity = Math.min(0.95, 0.8 + scrollProgress * 0.2);
      const headerBlur = Math.min(20, 10 + scrollProgress * 15);
      
      header.style.backgroundColor = `rgba(10, 10, 10, ${headerOpacity})`;
      header.style.backdropFilter = `blur(${headerBlur}px)`;
      
      // Esconder header quando scroll descer e mostrar quando subir
      if (scrollY > 200) {
        const currentScroll = window.scrollY;
        
        if (currentScroll > lastScrollTop) {
          // Scroll para baixo
          header.classList.add('hidden');
        } else {
          // Scroll para cima
          header.classList.remove('hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      } else {
        header.classList.remove('hidden');
      }
    }
    
    // Efeito parallax no hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
    }
    
    // Efeito de gradiente dinâmico baseado no scroll
    document.documentElement.style.setProperty(
      '--dynamic-gradient', 
      `linear-gradient(${135 + scrollProgress * 90}deg, 
                      rgba(124, 58, 237, ${0.8 - scrollProgress * 0.3}), 
                      rgba(16, 185, 129, ${0.8 - scrollProgress * 0.3}))`
    );
    
    // Ajustar a saturação e brilho baseado na profundidade do scroll
    document.documentElement.style.setProperty(
      '--dynamic-saturation',
      `${100 - scrollProgress * 20}%`
    );
    
    document.documentElement.style.setProperty(
      '--dynamic-brightness',
      `${100 - scrollProgress * 10}%`
    );
  }
  
  // Variável para detectar direção do scroll
  let lastScrollTop = 0;
}

// Inicializar após o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar após um pequeno delay para permitir o carregamento básico
  setTimeout(initPremiumSmoothScroll, 500);
  
  // Adicionar CSS para efeitossui
  const scrollEffectsStyle = document.createElement('style');
  scrollEffectsStyle.textContent = `
    :root {
      --scroll-progress: 0;
      --dynamic-gradient: linear-gradient(135deg, rgba(124, 58, 237, 0.8), rgba(16, 185, 129, 0.8));
      --dynamic-saturation: 100%;
      --dynamic-brightness: 100%;
    }
    
    /* Efeito que muda gradualmente baseado no scroll */
    .gradient-text {
      background: var(--dynamic-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      filter: saturate(var(--dynamic-saturation)) brightness(var(--dynamic-brightness));
    }
    
    .scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), 
                  transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }
    
    .scroll-reveal.revealed, .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Efeito de rotação no badge do card ao scrollar */
    .project-status {
      transition: transform 0.3s ease;
    }
    
    .project-card:hover .project-status {
      transform: rotate(-2deg) scale(1.05);
    }
  `;
  document.head.appendChild(scrollEffectsStyle);
  
  // Adicionar classes para texto com gradiente dinâmico
  document.querySelectorAll('.section-title, .hero-name, .about-name').forEach(el => {
    el.classList.add('gradient-text');
  });
  
  // Adicionar classes para revelação no scroll
  document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skills-category, .contact-form, .about-image').forEach(el => {
    el.classList.add('scroll-reveal');
  });
});