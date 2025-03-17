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
    