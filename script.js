/**
 * ============================================================================
 * JAVASCRIPT CONTROLLER - UJALA YADAV PORTFOLIO
 * High-performance, 60fps micro-interactions, responsive controls & animations
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DOM Elements & State
  // --------------------------------------------------------------------------
  const DOM = {
    html: document.documentElement,
    body: document.body,
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
    scrollProgressBar: document.getElementById('scrollProgressBar'),
    themeToggle: document.getElementById('themeToggle'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileCloseBtn: document.getElementById('mobileCloseBtn'),
    mobileNavDrawer: document.getElementById('mobileNavDrawer'),
    mobileNavOverlay: document.getElementById('mobileNavOverlay'),
    cursorDot: document.getElementById('cursorDot'),
    cursorGlow: document.getElementById('cursorGlow'),
    starCanvas: document.getElementById('starCanvas'),
    typedText: document.getElementById('typedText'),
    aboutTiltCard: document.getElementById('aboutTiltCard'),
    statsCounters: document.querySelectorAll('.stat-counter'),
    progressBars: document.querySelectorAll('.progress-bar'),
    filterBtns: document.querySelectorAll('.filter-tab-btn'),
    projectCards: document.querySelectorAll('.project-card'),
    projectModal: document.getElementById('projectModal'),
    modalTitle: document.getElementById('modalProjectTitle'),
    modalCategory: document.getElementById('modalProjectCategory'),
    modalContent: document.getElementById('modalProjectContent'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalDismissBtn: document.getElementById('modalDismissBtn'),
    resumeModal: document.getElementById('resumeModal'),
    resumeModalCloseBtn: document.getElementById('resumeModalCloseBtn'),
    dismissResumeModalBtn: document.getElementById('dismissResumeModalBtn'),
    downloadResumeBtn: document.getElementById('downloadResumeBtn'),
    confirmDownloadResumeBtn: document.getElementById('confirmDownloadResumeBtn'),
    copyEmailBtn: document.getElementById('copyEmailBtn'),
    toastContainer: document.getElementById('toastContainer'),
    contactForm: document.getElementById('contactForm'),
    formSuccessBanner: document.getElementById('formSuccessBanner'),
    resetFormBtn: document.getElementById('resetFormBtn'),
    backToTopBtn: document.getElementById('backToTopBtn'),
    animatedElements: document.querySelectorAll('[data-animate]')
  };

  const STATE = {
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    hasAnimatedStats: false,
    hasAnimatedSkills: false
  };

  // --------------------------------------------------------------------------
  // 2. Theme Controller (Dark / Light)
  // --------------------------------------------------------------------------
  const ThemeController = {
    init() {
      const savedTheme = localStorage.getItem('ujala_portfolio_theme');
      if (savedTheme) {
        DOM.html.setAttribute('data-theme', savedTheme);
      } else {
        DOM.html.setAttribute('data-theme', 'dark');
      }

      if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', () => this.toggleTheme());
      }
    },

    toggleTheme() {
      const current = DOM.html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      DOM.html.setAttribute('data-theme', next);
      localStorage.setItem('ujala_portfolio_theme', next);

      ToastController.show(
        next === 'light' ? 'Light mode activated' : 'Dark navy mode activated',
        next === 'light' ? 'fa-sun' : 'fa-moon'
      );
    }
  };

  // --------------------------------------------------------------------------
  // 3. Custom Glowing Cursor (Desktop Only)
  // --------------------------------------------------------------------------
  const CursorController = {
    dotX: window.innerWidth / 2,
    dotY: window.innerHeight / 2,
    glowX: window.innerWidth / 2,
    glowY: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    init() {
      if (STATE.isTouchDevice || STATE.prefersReducedMotion || !DOM.cursorDot || !DOM.cursorGlow) {
        return;
      }

      window.addEventListener('mousemove', (e) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
        DOM.cursorDot.style.opacity = '1';
        DOM.cursorGlow.style.opacity = '1';
      });

      window.addEventListener('mouseleave', () => {
        DOM.cursorDot.style.opacity = '0';
        DOM.cursorGlow.style.opacity = '0';
      });

      // Hover scale over interactive elements
      const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .interest-card, .stat-card');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => DOM.cursorGlow.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => DOM.cursorGlow.classList.remove('cursor-hover'));
      });

      this.render();
    },

    render() {
      this.dotX += (this.targetX - this.dotX) * 0.45;
      this.dotY += (this.targetY - this.dotY) * 0.45;

      this.glowX += (this.targetX - this.glowX) * 0.15;
      this.glowY += (this.targetY - this.glowY) * 0.15;

      DOM.cursorDot.style.transform = `translate3d(${this.dotX}px, ${this.dotY}px, 0) translate(-50%, -50%)`;
      DOM.cursorGlow.style.transform = `translate3d(${this.glowX}px, ${this.glowY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(() => this.render());
    }
  };

  // --------------------------------------------------------------------------
  // 4. Hero Constellation / Star Canvas
  // --------------------------------------------------------------------------
  const StarCanvasController = {
    canvas: DOM.starCanvas,
    ctx: null,
    particles: [],
    numParticles: 45,
    mouseX: -1000,
    mouseY: -1000,

    init() {
      if (!this.canvas || STATE.prefersReducedMotion) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();

      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });

      this.createParticles();
      this.animate();
    },

    resize() {
      if (!this.canvas) return;
      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;
    },

    createParticles() {
      this.particles = [];
      const count = window.innerWidth < 768 ? 22 : this.numParticles;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.5 + 0.3,
          color: Math.random() > 0.6 ? '#D4AF6A' : '#A78BFA'
        });
      }
    },

    animate() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;

        // Render particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fill();

        // Connect lines near mouse
        const dxMouse = this.mouseX - p.x;
        const dyMouse = this.mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 130) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouseX, this.mouseY);
          this.ctx.strokeStyle = '#D4AF6A';
          this.ctx.globalAlpha = (1 - distMouse / 130) * 0.25;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }

        // Connect nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = p.color;
            this.ctx.globalAlpha = (1 - dist / 90) * 0.15;
            this.ctx.lineWidth = 0.6;
            this.ctx.stroke();
          }
        }
      }

      this.ctx.globalAlpha = 1;
      requestAnimationFrame(() => this.animate());
    }
  };

  // --------------------------------------------------------------------------
  // 5. Typing Animation (Hero Role Cycler)
  // --------------------------------------------------------------------------
  const TypingController = {
    roles: [
      'BSc.IT Student',
      'Web Development Learner',
      'Curious About AI & Cybersecurity'
    ],
    roleIdx: 0,
    charIdx: 0,
    isDeleting: false,
    typingSpeed: 90,
    deletingSpeed: 45,
    pauseEnd: 1800,
    pauseStart: 400,

    init() {
      if (!DOM.typedText) return;
      this.tick();
    },

    tick() {
      const currentRole = this.roles[this.roleIdx];

      if (this.isDeleting) {
        DOM.typedText.textContent = currentRole.substring(0, this.charIdx - 1);
        this.charIdx--;
      } else {
        DOM.typedText.textContent = currentRole.substring(0, this.charIdx + 1);
        this.charIdx++;
      }

      let delta = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

      if (!this.isDeleting && this.charIdx === currentRole.length) {
        delta = this.pauseEnd;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIdx === 0) {
        this.isDeleting = false;
        this.roleIdx = (this.roleIdx + 1) % this.roles.length;
        delta = this.pauseStart;
      }

      setTimeout(() => this.tick(), delta);
    }
  };

  // --------------------------------------------------------------------------
  // 6. Navigation, Scroll Progress & Active Nav Link Highlight
  // --------------------------------------------------------------------------
  const NavigationController = {
    init() {
      window.addEventListener('scroll', () => {
        this.handleScrollProgress();
        this.handleNavbarScrolled();
        this.highlightActiveSection();
        this.handleBackToTopVisibility();
      });

      // Mobile Menu Drawer Toggles
      if (DOM.mobileMenuBtn) {
        DOM.mobileMenuBtn.addEventListener('click', () => this.toggleMobileDrawer(true));
      }
      if (DOM.mobileCloseBtn) {
        DOM.mobileCloseBtn.addEventListener('click', () => this.toggleMobileDrawer(false));
      }
      if (DOM.mobileNavOverlay) {
        DOM.mobileNavOverlay.addEventListener('click', () => this.toggleMobileDrawer(false));
      }

      // Close mobile drawer when clicking a link
      DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.toggleMobileDrawer(false);
        });
      });

      // Back to top button
      if (DOM.backToTopBtn) {
        DOM.backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    },

    handleScrollProgress() {
      if (!DOM.scrollProgressBar) return;
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      DOM.scrollProgressBar.style.width = scrolled + '%';
    },

    handleNavbarScrolled() {
      if (!DOM.navbar) return;
      if (window.scrollY > 40) {
        DOM.navbar.classList.add('scrolled');
      } else {
        DOM.navbar.classList.remove('scrolled');
      }
    },

    highlightActiveSection() {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY + 120;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },

    handleBackToTopVisibility() {
      if (!DOM.backToTopBtn) return;
      if (window.scrollY > 450) {
        DOM.backToTopBtn.classList.add('visible');
      } else {
        DOM.backToTopBtn.classList.remove('visible');
      }
    },

    toggleMobileDrawer(open) {
      if (!DOM.mobileNavDrawer || !DOM.mobileNavOverlay) return;
      if (open) {
        DOM.mobileNavDrawer.classList.add('open');
        DOM.mobileNavOverlay.classList.add('open');
        DOM.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        DOM.mobileNavDrawer.classList.remove('open');
        DOM.mobileNavOverlay.classList.remove('open');
        DOM.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  };

  // --------------------------------------------------------------------------
  // 7. 3D Tilt Effect on Photos & Cards
  // --------------------------------------------------------------------------
  const TiltController = {
    init() {
      if (STATE.isTouchDevice || STATE.prefersReducedMotion) return;

      const tiltElements = [
        DOM.aboutTiltCard,
        ...document.querySelectorAll('.interest-card'),
        ...document.querySelectorAll('.stat-card')
      ].filter(Boolean);

      tiltElements.forEach(container => {
        const card = container.querySelector('.about-photo-frame') || container;

        container.addEventListener('mousemove', (e) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -9;
          const rotateY = ((x - centerX) / centerX) * 9;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        container.addEventListener('mouseleave', () => {
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
      });
    }
  };

  // --------------------------------------------------------------------------
  // 8. Magnetic Buttons & Ripple Micro-Interactions
  // --------------------------------------------------------------------------
  const MicroInteractions = {
    init() {
      // Magnetic hover on buttons
      if (!STATE.isTouchDevice && !STATE.prefersReducedMotion) {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        magneticBtns.forEach(btn => {
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
          });

          btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
          });
        });
      }

      // Ripple effect on click
      const clickableButtons = document.querySelectorAll('.btn, .btn-gold-sm, .social-btn, .filter-tab-btn');
      clickableButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const rect = this.getBoundingClientRect();
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
          ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
          this.appendChild(ripple);

          setTimeout(() => ripple.remove(), 600);
        });
      });
    }
  };

  // --------------------------------------------------------------------------
  // 9. Scroll Observer (Animations, Counters, Skills Bar)
  // --------------------------------------------------------------------------
  const ScrollObserverController = {
    init() {
      // 1. Reveal Animations Observer
      const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, delay);
            animateObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      DOM.animatedElements.forEach(el => animateObserver.observe(el));

      // 2. Stats Section Observer (Counter Trigger)
      const statsSection = document.getElementById('stats');
      if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !STATE.hasAnimatedStats) {
              STATE.hasAnimatedStats = true;
              this.animateCounters();
              statsObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
      }

      // 3. Skills Section Observer (Progress Bars Trigger)
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !STATE.hasAnimatedSkills) {
              STATE.hasAnimatedSkills = true;
              this.animateProgressBars();
              skillsObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.25 });

        skillsObserver.observe(skillsSection);
      }
    },

    animateCounters() {
      DOM.statsCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals'), 10) || 0;
        const duration = 1800;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease Out Quart
          const easeOut = 1 - Math.pow(1 - progress, 4);
          const currentVal = (target * easeOut).toFixed(decimals);

          counter.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toFixed(decimals);
          }
        };

        requestAnimationFrame(updateCounter);
      });
    },

    animateProgressBars() {
      DOM.progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      });
    }
  };

  // --------------------------------------------------------------------------
  // 10. Projects Filtering & Project Details Modal
  // --------------------------------------------------------------------------
  const ProjectsController = {
    projectsData: {
      telemedicine: {
        title: 'Telemedicine Portal',
        category: 'Hackathon Project • Web Development',
        badge: 'HACKVISION 2024',
        overview: 'Developed during the college-wide HACKVISION hackathon at Thakur Shyamnarayan Degree College in our first year. Our team addressed accessible healthcare by designing a modern, responsive digital consultation portal.',
        features: [
          'Virtual consultation booking system with date and department filtering',
          'Doctor profiles with specialty, availability, and accreditation tags',
          'Clean, empathetic patient user interface built with high-contrast accessibility standards',
          'Rapid interactive prototype developed under hackathon time constraints'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript ES6', 'Responsive Grid', 'Healthcare UI/UX'],
        learnings: 'Learned the importance of high-velocity team collaboration, task delegation, quick wireframing, and handling presentation feedback under tight hackathon deadlines.'
      },
      portfolio: {
        title: 'Personal Portfolio Website',
        category: 'Solo Build • Web Development & AI Tools',
        badge: 'First Solo Project',
        overview: 'A premium, responsive portfolio web application crafted independently to consolidate foundational frontend principles and explore AI developer workflows.',
        features: [
          'Full-screen interactive hero with canvas star constellation and 3D floating cutout portrait',
          'Responsive glassmorphism design with deep navy and soft gold color palette',
          'Custom micro-interactions: 3D tilt photo frame, magnetic hover buttons, and cursor aura',
          'Interactive project filtering, accessible modal system, live contact validation & toast messaging',
          'Dark / Light theme toggling with smooth transitions and persistent state'
        ],
        techStack: ['Semantic HTML5', 'Vanilla CSS3 Custom Properties', 'Modern JavaScript (ES6+)', 'AI-Assisted Workflow'],
        learnings: 'Deepened mastery of modern CSS layout techniques (Grid/Flexbox), IntersectionObserver performance, accessibility best practices, and AI-accelerated development.'
      }
    },

    init() {
      // Filter Tabs
      DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter');
          this.filterProjects(filter);
        });
      });

      // View Details Buttons
      const detailButtons = document.querySelectorAll('.view-details-btn');
      detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const projectId = btn.getAttribute('data-project');
          if (projectId && this.projectsData[projectId]) {
            this.openModal(this.projectsData[projectId]);
          }
        });
      });

      // Modal Close Events
      if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', () => this.closeModal());
      if (DOM.modalDismissBtn) DOM.modalDismissBtn.addEventListener('click', () => this.closeModal());
      if (DOM.projectModal) {
        DOM.projectModal.addEventListener('click', (e) => {
          if (e.target === DOM.projectModal) this.closeModal();
        });
      }

      // Resume Modal Events
      if (DOM.downloadResumeBtn) {
        DOM.downloadResumeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openResumeModal();
        });
      }
      if (DOM.resumeModalCloseBtn) DOM.resumeModalCloseBtn.addEventListener('click', () => this.closeResumeModal());
      if (DOM.dismissResumeModalBtn) DOM.dismissResumeModalBtn.addEventListener('click', () => this.closeResumeModal());
      if (DOM.resumeModal) {
        DOM.resumeModal.addEventListener('click', (e) => {
          if (e.target === DOM.resumeModal) this.closeResumeModal();
        });
      }
      if (DOM.confirmDownloadResumeBtn) {
        DOM.confirmDownloadResumeBtn.addEventListener('click', () => {
          this.triggerResumePrint();
        });
      }

      // Close on Escape key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeModal();
          this.closeResumeModal();
        }
      });
    },

    filterProjects(filter) {
      DOM.projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    },

    openModal(data) {
      if (!DOM.projectModal) return;
      DOM.modalCategory.textContent = data.category;
      DOM.modalTitle.textContent = data.title;

      DOM.modalContent.innerHTML = `
        <div class="modal-overview-section">
          <p class="modal-lead-text">${data.overview}</p>
        </div>

        <div class="modal-section">
          <h4><i class="fa-solid fa-list-check gold-icon"></i> Key Features & Implementation</h4>
          <ul>
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-section">
          <h4><i class="fa-solid fa-code gold-icon"></i> Technologies & Tools</h4>
          <div class="project-tech-stack" style="margin-top: 8px;">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-section">
          <h4><i class="fa-solid fa-lightbulb gold-icon"></i> Learnings & Growth</h4>
          <p>${data.learnings}</p>
        </div>
      `;

      DOM.projectModal.classList.add('active');
      DOM.projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      if (!DOM.projectModal) return;
      DOM.projectModal.classList.remove('active');
      DOM.projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    openResumeModal() {
      if (!DOM.resumeModal) return;
      DOM.resumeModal.classList.add('active');
      DOM.resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    closeResumeModal() {
      if (!DOM.resumeModal) return;
      DOM.resumeModal.classList.remove('active');
      DOM.resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    triggerResumePrint() {
      ToastController.show('Preparing resume document...', 'fa-file-pdf');
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  // --------------------------------------------------------------------------
  // 11. Copy Email & Toast System
  // --------------------------------------------------------------------------
  const ToastController = {
    show(message, icon = 'fa-circle-check', duration = 3500) {
      if (!DOM.toastContainer) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <i class="fa-solid ${icon} toast-icon"></i>
        <span>${message}</span>
      `;

      DOM.toastContainer.appendChild(toast);

      // Trigger slide in
      setTimeout(() => toast.classList.add('show'), 10);

      // Auto dismiss
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      }, duration);
    }
  };

  const ClipboardController = {
    init() {
      if (!DOM.copyEmailBtn) return;

      DOM.copyEmailBtn.addEventListener('click', async () => {
        const email = 'ujalayadav2207@gmail.com';

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
          } else {
            // Fallback for non-https or older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }

          ToastController.show('Email copied to clipboard!', 'fa-copy');
        } catch (err) {
          ToastController.show('Could not copy email automatically.', 'fa-triangle-exclamation');
        }
      });
    }
  };

  // --------------------------------------------------------------------------
  // 12. Achievement & Certification Sliding Carousel
  // --------------------------------------------------------------------------
  const AchievementSliderController = {
    currentIndex: 0,
    totalSlides: 4,
    autoSlideTimer: null,
    touchStartX: 0,
    touchEndX: 0,

    init() {
      this.track = document.getElementById('achievementTrack');
      this.slides = document.querySelectorAll('.achievement-slide');
      this.prevBtn = document.getElementById('sliderPrevBtn');
      this.nextBtn = document.getElementById('sliderNextBtn');
      this.dots = document.querySelectorAll('.slider-dot');
      this.viewport = document.getElementById('achievementViewport');

      if (!this.track || this.slides.length === 0) return;

      this.totalSlides = this.slides.length;

      // Button controls
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.prevSlide();
          this.restartAutoSlide();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.nextSlide();
          this.restartAutoSlide();
        });
      }

      // Dot controls
      this.dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          this.goToSlide(idx);
          this.restartAutoSlide();
        });
      });

      // Hover pause
      if (this.viewport) {
        this.viewport.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.viewport.addEventListener('mouseleave', () => this.startAutoSlide());

        // Touch swipe support
        this.viewport.addEventListener('touchstart', (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.viewport.addEventListener('touchend', (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
        }, { passive: true });
      }

      // Keyboard arrow keys when achievements section is in view
      window.addEventListener('keydown', (e) => {
        const achSection = document.getElementById('achievements');
        if (!achSection) return;
        const rect = achSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          if (e.key === 'ArrowLeft') {
            this.prevSlide();
            this.restartAutoSlide();
          } else if (e.key === 'ArrowRight') {
            this.nextSlide();
            this.restartAutoSlide();
          }
        }
      });

      this.goToSlide(0);
      this.startAutoSlide();
    },

    goToSlide(index) {
      this.currentIndex = (index + this.totalSlides) % this.totalSlides;
      if (this.track) {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }

      this.dots.forEach((dot, idx) => {
        if (idx === this.currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    },

    nextSlide() {
      this.goToSlide(this.currentIndex + 1);
    },

    prevSlide() {
      this.goToSlide(this.currentIndex - 1);
    },

    handleSwipe() {
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          this.nextSlide(); // Swiped left -> next
        } else {
          this.prevSlide(); // Swiped right -> prev
        }
        this.restartAutoSlide();
      }
    },

    startAutoSlide() {
      if (STATE.prefersReducedMotion) return;
      this.stopAutoSlide();
      this.autoSlideTimer = setInterval(() => {
        this.nextSlide();
      }, 5500);
    },

    stopAutoSlide() {
      if (this.autoSlideTimer) {
        clearInterval(this.autoSlideTimer);
        this.autoSlideTimer = null;
      }
    },

    restartAutoSlide() {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  };

  // --------------------------------------------------------------------------
  // 13. Certificate & Trophy Lightbox Modal
  // --------------------------------------------------------------------------
  const CertificateModalController = {
    init() {
      this.modal = document.getElementById('certificateModal');
      this.modalImg = document.getElementById('certModalImg');
      this.modalTitle = document.getElementById('certModalTitle');
      this.modalBadge = document.getElementById('certModalBadge');
      this.modalDesc = document.getElementById('certModalDesc');
      this.downloadLink = document.getElementById('certModalDownloadLink');
      this.closeBtn = document.getElementById('certModalCloseBtn');
      this.dismissBtn = document.getElementById('certModalDismissBtn');

      if (!this.modal) return;

      // Bind click on view buttons
      const viewButtons = document.querySelectorAll('.open-cert-modal-btn');
      viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openModal({
            img: btn.getAttribute('data-img'),
            title: btn.getAttribute('data-title'),
            badge: btn.getAttribute('data-badge'),
            desc: btn.getAttribute('data-desc')
          });
        });
      });

      // Bind click on card media thumbnails
      const mediaCards = document.querySelectorAll('.achievement-card-media');
      mediaCards.forEach(media => {
        media.addEventListener('click', () => {
          this.openModal({
            img: media.getAttribute('data-cert-img'),
            title: media.getAttribute('data-cert-title'),
            badge: media.getAttribute('data-cert-badge'),
            desc: media.getAttribute('data-cert-desc')
          });
        });
      });

      // Close handlers
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
      if (this.dismissBtn) this.dismissBtn.addEventListener('click', () => this.closeModal());
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) {
          this.closeModal();
        }
      });
    },

    openModal(data) {
      if (!this.modal || !data.img) return;

      this.modalImg.src = data.img;
      this.modalImg.alt = data.title || 'Certificate Preview';
      this.modalTitle.textContent = data.title || 'Official Certificate';
      this.modalBadge.textContent = data.badge || 'Verified Achievement';
      this.modalDesc.textContent = data.desc || '';

      if (this.downloadLink) {
        this.downloadLink.href = data.img;
        this.downloadLink.setAttribute('download', (data.title || 'certificate').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg');
      }

      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      if (!this.modal) return;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // --------------------------------------------------------------------------
  // 14. Interactive Moving & Talking Avatar Controller
  // --------------------------------------------------------------------------
  const InteractiveAvatarController = {
    dialogues: [
      "👋 Hi there! I'm Ujala Yadav! Welcome to my digital portfolio!",
      "🏆 I'm proud to be the 1st Rank Department Topper with 9.09 SGPA in BSc.IT!",
      "🤝 I thrive with strong team co-operative and leadership abilities!",
      "💻 Explore my Telemedicine Portal project from the HACKVISION Hackathon!",
      "📜 Scroll to check out my verified Python and C++ certifications!",
      "📄 Click 'Download Resume' below to inspect and save my official CV!"
    ],
    currentIndex: 0,
    isVoiceActive: false,
    autoCycleTimer: null,

    init() {
      this.avatarWrap = document.getElementById('interactivePortraitWrap');
      this.avatarImg = document.getElementById('ujalaFullbodyImg');
      this.bubbleText = document.getElementById('ujalaSpeechText');
      this.voiceBtn = document.getElementById('voiceSpeakBtn');
      this.voiceBtnLabel = document.getElementById('voiceBtnLabel');
      this.nextBtn = document.getElementById('nextSpeechBtn');
      this.soundWaves = document.getElementById('talkingSoundWaves');

      if (!this.avatarWrap) return;

      // Click on avatar to trigger talking, sparkles and bounce
      this.avatarWrap.addEventListener('click', (e) => {
        this.createSparkles(e.clientX, e.clientY);
        this.triggerBounce();
        this.nextDialogue(this.isVoiceActive);
        this.restartAutoCycle();
      });

      // Next dialogue button
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.nextDialogue(this.isVoiceActive);
          this.restartAutoCycle();
        });
      }

      // Voice listen / mute button
      if (this.voiceBtn) {
        this.voiceBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleVoice();
        });
      }

      // Dynamic 3D Parallax Tilt towards cursor
      if (!STATE.isTouchDevice && !STATE.prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
          const rect = this.avatarWrap.getBoundingClientRect();
          const avatarCenterX = rect.left + rect.width / 2;
          const avatarCenterY = rect.top + rect.height / 3;

          const deltaX = (e.clientX - avatarCenterX) / (window.innerWidth / 2);
          const deltaY = (e.clientY - avatarCenterY) / (window.innerHeight / 2);

          const rotateY = deltaX * 12; // Rotate towards mouse
          const rotateX = -deltaY * 8;

          this.avatarWrap.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-4px)`;
        });

        this.avatarWrap.addEventListener('mouseleave', () => {
          this.avatarWrap.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
        });
      }

      // Start auto dialogue cycling
      this.startAutoCycle();
    },

    nextDialogue(speak = false) {
      this.currentIndex = (this.currentIndex + 1) % this.dialogues.length;
      const text = this.dialogues[this.currentIndex];

      if (this.bubbleText) {
        this.bubbleText.style.opacity = '0';
        setTimeout(() => {
          this.bubbleText.textContent = text;
          this.bubbleText.style.opacity = '1';
        }, 180);
      }

      if (speak) {
        this.speakCurrentText(text);
      }
    },

    toggleVoice() {
      if (!('speechSynthesis' in window)) {
        ToastController.show('Text-to-speech is not supported in this browser.', 'fa-volume-xmark');
        return;
      }

      this.isVoiceActive = !this.isVoiceActive;

      if (this.isVoiceActive) {
        if (this.voiceBtnLabel) this.voiceBtnLabel.textContent = 'Speaking...';
        if (this.voiceBtn) this.voiceBtn.style.background = 'var(--gold-primary)';
        if (this.voiceBtn) this.voiceBtn.style.color = '#0A1128';
        ToastController.show('Voice enabled: Ujala is speaking!', 'fa-volume-high');
        this.speakCurrentText(this.dialogues[this.currentIndex]);
      } else {
        window.speechSynthesis.cancel();
        if (this.voiceBtnLabel) this.voiceBtnLabel.textContent = 'Listen';
        if (this.voiceBtn) this.voiceBtn.style.background = '';
        if (this.voiceBtn) this.voiceBtn.style.color = '';
        if (this.soundWaves) this.soundWaves.style.opacity = '0.3';
      }
    },

    speakCurrentText(text) {
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();

      // Clean emoji from text for natural speech
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.15; // Pleasant friendly pitch

      // Pick a clean English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google UK English Female') || v.name.includes('Zira')));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      if (this.soundWaves) this.soundWaves.style.opacity = '1';

      utterance.onend = () => {
        if (this.soundWaves) this.soundWaves.style.opacity = '0.4';
      };

      utterance.onerror = () => {
        if (this.soundWaves) this.soundWaves.style.opacity = '0.4';
      };

      window.speechSynthesis.speak(utterance);
    },

    triggerBounce() {
      if (!this.avatarImg) return;
      this.avatarImg.style.transform = 'scale(1.06) translateY(-8px)';
      setTimeout(() => {
        this.avatarImg.style.transform = '';
      }, 350);
    },

    createSparkles(clientX, clientY) {
      const container = document.body;
      const colors = ['#D4AF6A', '#F5E1A4', '#A78BFA', '#38BDF8'];

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${clientX}px`;
        particle.style.top = `${clientY}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 70 + 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        container.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
      }
    },

    startAutoCycle() {
      if (STATE.prefersReducedMotion) return;
      this.stopAutoCycle();
      this.autoCycleTimer = setInterval(() => {
        this.nextDialogue(this.isVoiceActive);
      }, 7000);
    },

    stopAutoCycle() {
      if (this.autoCycleTimer) {
        clearInterval(this.autoCycleTimer);
        this.autoCycleTimer = null;
      }
    },

    restartAutoCycle() {
      this.stopAutoCycle();
      this.startAutoCycle();
    }
  };

  // --------------------------------------------------------------------------
  // 15. Page Intro & Startup
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    ThemeController.init();
    CursorController.init();
    StarCanvasController.init();
    TypingController.init();
    NavigationController.init();
    TiltController.init();
    MicroInteractions.init();
    ScrollObserverController.init();
    ProjectsController.init();
    AchievementSliderController.init();
    CertificateModalController.init();
    InteractiveAvatarController.init();
    ClipboardController.init();

    // Trigger initial hero animations
    setTimeout(() => {
      document.querySelectorAll('#hero [data-animate]').forEach(el => {
        el.classList.add('animated');
      });
    }, 100);
  });
})();
