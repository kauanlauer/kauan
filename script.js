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