// ========================================
// ANIMACIONES AL CARGAR
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initScrollEffects();
  initInteractiveElements();
  initLanguageBars();
  initThemeToggle();
});

// ========================================
// INICIALIZAR ANIMACIONES
// ========================================
function initAnimations() {
  // Animar elementos del sidebar con delay
  const sidebarBlocks = document.querySelectorAll('.sidebar-block');
  sidebarBlocks.forEach((block, index) => {
    block.style.setProperty('--delay', index);
  });

  // Animar secciones principales
  const sections = document.querySelectorAll('.cv-section');
  sections.forEach((section, index) => {
    section.style.setProperty('--delay', index);
  });

  // Animar foto de perfil
  animateProfilePhoto();
}

// ========================================
// ANIMACIÓN DE FOTO DE PERFIL
// ========================================
function animateProfilePhoto() {
  const photoFrame = document.querySelector('.photo-frame');
  const photoDeco = document.querySelector('.photo-deco');
  
  if (photoFrame && photoDeco) {
    setTimeout(() => {
      photoFrame.style.transform = 'scale(1)';
      photoFrame.style.opacity = '1';
    }, 300);

    // Rotación sutil del decorativo
    let rotation = 0;
    setInterval(() => {
      rotation += 0.5;
      photoDeco.style.transform = `rotate(${rotation}deg)`;
    }, 50);
  }
}

// ========================================
// EFECTOS DE SCROLL
// ========================================
function initScrollEffects() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animar timeline items cuando sean visibles
          if (entry.target.classList.contains('timeline-item')) {
            animateTimelineItem(entry.target);
          }
          
          // Animar tarjetas de educación
          if (entry.target.classList.contains('edu-card')) {
            animateEduCard(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observar elementos
  document.querySelectorAll('.timeline-item, .edu-card').forEach((el) => {
    observer.observe(el);
  });
}

// ========================================
// ANIMAR ITEMS DEL TIMELINE
// ========================================
function animateTimelineItem(item) {
  const content = item.querySelector('.timeline-content');
  const dot = item.querySelector('.timeline-dot');
  
  if (content) {
    content.style.animation = 'slideInRight 0.6s ease-out forwards';
  }
  
  if (dot) {
    dot.style.animation = 'pulse 0.6s ease-out';
  }
}

// ========================================
// ANIMAR TARJETAS DE EDUCACIÓN
// ========================================
function animateEduCard(card) {
  card.style.animation = 'fadeInUp 0.6s ease-out forwards';
}

// ========================================
// BARRAS DE IDIOMAS ANIMADAS
// ========================================
function initLanguageBars() {
  const langBars = document.querySelectorAll('.lang-fill');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percentage = bar.style.getPropertyValue('--pct');
          
          // Animar desde 0 hasta el porcentaje final
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = percentage;
          }, 100);
          
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  langBars.forEach((bar) => observer.observe(bar));
}

// ========================================
// ELEMENTOS INTERACTIVOS
// ========================================
function initInteractiveElements() {
  // Efecto hover en pills de habilidades
  const pills = document.querySelectorAll('.pill');
  pills.forEach((pill) => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Efecto en enlaces de contacto
  const contactLinks = document.querySelectorAll('.contact-list a');
  contactLinks.forEach((link) => {
    link.addEventListener('mouseenter', (e) => {
      const icon = e.target.previousElementSibling;
      if (icon && icon.classList.contains('contact-icon')) {
        icon.style.transform = 'scale(1.3) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    link.addEventListener('mouseleave', (e) => {
      const icon = e.target.previousElementSibling;
      if (icon && icon.classList.contains('contact-icon')) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Efecto parallax en blobs
  initParallaxBlobs();
}

// ========================================
// EFECTO PARALLAX EN BLOBS
// ========================================
function initParallaxBlobs() {
  const blobs = document.querySelectorAll('.blob');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      
      blob.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ========================================
// SMOOTH SCROLL (si se agregan anclas)
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// TOGGLE TEMA CLARO/OSCURO (OPCIONAL)
// ========================================
function initThemeToggle() {
  // Detectar preferencia del sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem('cv-theme');
  if (savedTheme) {
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  } else if (prefersDark) {
    document.body.classList.add('dark-theme');
  }
}

// ========================================
// ANIMACIONES CSS ADICIONALES
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(239, 131, 84, 0.7);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 0 10px rgba(239, 131, 84, 0);
    }
  }

  .timeline-content {
    opacity: 0;
  }

  .timeline-item.visible .timeline-content {
    opacity: 1;
  }

  .edu-card {
    opacity: 0;
    transform: translateY(20px);
  }

  .edu-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ========================================
// EFECTO DE ESCRITURA EN NOMBRE (OPCIONAL)
// ========================================
function typeWriterEffect() {
  const nameElement = document.querySelector('.name');
  if (!nameElement) return;
  
  const originalText = nameElement.innerHTML;
  nameElement.innerHTML = '';
  nameElement.style.opacity = '1';
  
  let i = 0;
  const speed = 100;
  
  function type() {
    if (i < originalText.length) {
      nameElement.innerHTML += originalText.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  // Descomentar para activar efecto de escritura
  // setTimeout(type, 500);
}

// ========================================
// CONTADOR ANIMADO PARA ESTADÍSTICAS
// ========================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ========================================
// IMPRIMIR CV
// ========================================
function printCV() {
  window.print();
}

// Agregar botón de impresión si se necesita
function addPrintButton() {
  const printBtn = document.createElement('button');
  printBtn.innerHTML = '🖨️ Imprimir CV';
  printBtn.className = 'print-btn';
  printBtn.onclick = printCV;
  
  printBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--color-accent);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  printBtn.addEventListener('mouseenter', () => {
    printBtn.style.transform = 'translateY(-3px)';
    printBtn.style.boxShadow = 'var(--shadow-lg)';
  });
  
  printBtn.addEventListener('mouseleave', () => {
    printBtn.style.transform = 'translateY(0)';
    printBtn.style.boxShadow = 'var(--shadow-md)';
  });
  
  // Descomentar para agregar botón de impresión
  // document.body.appendChild(printBtn);
}

// ========================================
// EASTER EGG: CLICK EN FOTO
// ========================================
const photoPlaceholder = document.querySelector('.photo-placeholder');
if (photoPlaceholder) {
  let clickCount = 0;
  photoPlaceholder.addEventListener('click', () => {
    clickCount++;
    photoPlaceholder.style.transform = `rotate(${clickCount * 360}deg) scale(${1 + clickCount * 0.1})`;
    photoPlaceholder.style.transition = 'transform 0.6s ease';
    
    if (clickCount >= 3) {
      photoPlaceholder.style.background = 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)';
      setTimeout(() => {
        photoPlaceholder.style.background = 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))';
        clickCount = 0;
      }, 2000);
    }
  });
}

// ========================================
// PERFORMANCE: LAZY LOADING DE ANIMACIONES
// ========================================
if ('IntersectionObserver' in window) {
  console.log('✨ Animaciones optimizadas cargadas');
} else {
  console.warn('⚠️ IntersectionObserver no soportado, usando animaciones básicas');
}

// ========================================
// LOG DE BIENVENIDA
// ========================================
console.log('%c👋 ¡Hola! Bienvenido al CV de Nicol Muñoz', 'color: #ef8354; font-size: 16px; font-weight: bold;');
console.log('%c💼 Ingeniera de Software | Full-Stack Developer', 'color: #2d3142; font-size: 14px;');
console.log('%c🚀 ¿Interesado en colaborar? nicolmunoz004@gmail.com', 'color: #666; font-size: 12px;');
