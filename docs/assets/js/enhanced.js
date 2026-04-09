/*!
============================================================
* LUCHIE BONATES - ENHANCED PORTFOLIO
============================================================
* Magnetic Cursor • Parallax • Glassmorphism
* Smooth Scroll • Counter Animation • Interactive Effects
============================================================
*/

// ========== SMOOTH SCROLL NATIVE ==========
document.documentElement.style.scrollBehavior = 'smooth';

// ========== SMOOTH SCROLL & ANCHOR NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
  // Interceptar todos os links de âncora (links que começam com #)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.href) {
      const target = link.getAttribute('href');
      
      // Ignorar links vazios ou apenas '#'
      if (!target || target === '#') return;
      
      const element = document.querySelector(target);
      if (element) {
        e.preventDefault();
        e.stopPropagation();
        
        // Tentar scrollIntoView primeiro
        try {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch(err) {
          // Fallback se smooth scroll não funcionar
          element.scrollIntoView(true);
        }
        
        // Atualizar URL sem recarregar página
        window.history.pushState(null, null, target);
        
        return false;
      }
    }
  });
  
  // Fix Bootstrap Scroll Spy - Melhor detecção de seção ativa
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header[id], .header');
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset;
    
    // Navbar shadow on scroll
    if (scrollPos > 50) {
      navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    }
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});

// ========== MAGNETIC CURSOR ==========
const cursor = document.createElement('div');
const cursorTrail = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 30px;
  height: 30px;
  border: 2px solid #DEB887;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  opacity: 0.7;
  transition: all 0.1s ease;
  box-shadow: inset 0 0 10px rgba(222, 184, 135, 0.5);
`;

cursorTrail.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: #DEB887;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  opacity: 0;
`;

document.body.appendChild(cursor);
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let isOverButton = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  
  // Smooth trail
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  cursorTrail.style.opacity = '0.5';
});

// Magnetic effect on buttons
const buttons = document.querySelectorAll('button, a.btn, .filter-btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    isOverButton = true;
    cursor.style.width = '50px';
    cursor.style.height = '50px';
    cursor.style.borderColor = '#FF8882';
    cursor.style.boxShadow = 'inset 0 0 20px rgba(255, 141, 130, 0.8), 0 0 20px rgba(255, 141, 130, 0.4)';
  });
  
  btn.addEventListener('mouseleave', () => {
    isOverButton = false;
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.borderColor = '#DEB887';
    cursor.style.boxShadow = 'inset 0 0 10px rgba(222, 184, 135, 0.5)';
  });
});

// Hide cursor on mobile
if (window.matchMedia('(max-width: 768px)').matches) {
  cursor.style.display = 'none';
  cursorTrail.style.display = 'none';
}

// ========== SMOOTH SCROLL NATIVE ==========
document.documentElement.style.scrollBehavior = 'smooth';

// ========== PARALLAX EFFECT ==========
const parallaxElements = document.querySelectorAll('[data-parallax]');

if (parallaxElements.length > 0) {
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const scrollPos = window.pageYOffset;
      const elementPos = el.offsetTop;
      const distance = scrollPos - elementPos;
      const speed = el.getAttribute('data-parallax') || 0.5;
      
      el.style.transform = `translateY(${distance * speed}px)`;
    });
  });
}

// Add parallax to header image
const headerImg = document.querySelector('.img-holder');
if (headerImg) {
  headerImg.setAttribute('data-parallax', '0.3');
}

// ========== COUNTER ANIMATION ENHANCED ==========
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const countUp = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
            counter.classList.add('counted');
            clearInterval(countUp);
          } else {
            counter.innerText = Math.floor(current);
          }
        }, 16);
        
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ========== SKILL PROGRESS ANIMATION ==========
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.progress-bar');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        bar.classList.add('animated');
        
        setTimeout(() => {
          bar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
          bar.style.width = width;
        }, 100);
        
        observer.unobserve(bar);
      }
    });
  }, observerOptions);
  
  skillBars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateSkillBars);

// ========== ENHANCED PORTFOLIO FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
        item.style.animation = 'fadeInScale 0.5s ease-out';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ========== SCROLL SNAP SECTIONS ==========
document.documentElement.style.scrollBehavior = 'smooth';
const sections = document.querySelectorAll('section, header');
sections.forEach(section => {
  section.style.scrollSnapAlign = 'start';
});

// ========== ENHANCED LOADER ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      loader.style.transition = 'opacity 0.6s ease-out';
    }, 800);
  }
});

// ========== TYPEWRITER EFFECT ENHANCED ==========
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Typed !== 'undefined') {
    new Typed('#typed', {
      strings: [
        'Desenvolvedora Front-End',
        'Game Developer',
        'Programadora Unity',
        'Especialista em Godot',
        'Criadora de Experiências'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 300,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: '|',
      onStringTyped: function() {
        // Adiciona efeito quando termina de digitar
        const typedElement = document.querySelector('.typed-cursor');
        if (typedElement) {
          typedElement.style.animation = 'blink 0.7s infinite';
        }
      }
    });
  }
});

// ========== SCROLL TO TOP ENHANCED ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== MOUSE GLOW EFFECT ==========
const glowElement = document.createElement('div');
glowElement.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 140, 130, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  filter: blur(40px);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

document.body.appendChild(glowElement);

document.addEventListener('mousemove', (e) => {
  if (!window.matchMedia('(max-width: 768px)').matches) {
    glowElement.style.left = (e.clientX - 150) + 'px';
    glowElement.style.top = (e.clientY - 150) + 'px';
    glowElement.style.opacity = '0.5';
  }
});

document.addEventListener('mouseout', () => {
  glowElement.style.opacity = '0';
});

// ========== AOS INITIALIZATION ENHANCED ==========
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    delay: 0,
    mirror: false,
    throttleDelay: 99,
  });
  
  // Refresh AOS after images load
  window.addEventListener('load', () => {
    AOS.refresh();
  });
}

// ========== THEME TOGGLE ENHANCED ==========
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.classList.remove(currentTheme + '-theme');
    body.classList.add(newTheme + '-theme');
    localStorage.setItem('theme', newTheme);
    
    // Smooth transition
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  });
}

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const animatedElements = document.querySelectorAll('[data-aos]');
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  animationObserver.observe(el);
});

// ========== LAZY LOADING IMAGES ENHANCED ==========
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imgObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imgObserver.observe(img);
  });
}

// ========== ACADEMIC JOURNEY ANIMATIONS ==========
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(item);
});

// Discipline tags hover animation
const disciplineTags = document.querySelectorAll('.discipline-tag');
disciplineTags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
  });
  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Linux section special animation
const linuxSection = document.querySelector('.linux-section');
if (linuxSection) {
  const linuxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInScale 0.6s ease forwards';
      }
    });
  }, { threshold: 0.3 });
  
  linuxObserver.observe(linuxSection);
}

// ========== CONSOLE MESSAGE ==========
console.log('%c🚀 PORTFOLIO ULTRA-MODERNO CARREGADO!', 'color: #FF8882; font-size: 14px; font-weight: bold;');
console.log('%cCom Magnetic Cursor • Parallax • Glassmorphism • Smooth Scroll', 'color: #DEB887; font-size: 12px;');
console.log('%c🎓 Jornada Acadêmica • CIESA • Linux Mint', 'color: #FF8882; font-size: 12px;');
