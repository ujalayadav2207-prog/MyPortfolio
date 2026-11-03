import React, { useState, useEffect, useRef } from 'react';

/**
 * Premium Personal Portfolio Component for Ujala Yadav
 * Built with React, Tailwind CSS & JavaScript micro-interactions
 * 
 * Features:
 * - Reference A & B blend: Dark navy background (#0A1128 to #111C3D) + Soft Gold (#D4AF6A) + Violet portrait glow
 * - Dynamic typing animation, interactive star constellation canvas
 * - Interactive Talking & Moving Full-Body Avatar with Speech Synthesis & Dialogue rotation
 * - 3D tilting portrait & interactive cards
 * - Filterable projects, dynamic modal popup, and animated stats counters
 * - Verified Certifications sliding carousel (Trophy, HackVision, Python, C++)
 * - Executive Direct Contact card & verified resume preview modal (Batch 2025–2028)
 */

export default function Portfolio() {
  // Theme state
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Typing animation state
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive Avatar Talking & Moving state
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const avatarRef = useRef(null);

  // Projects filter state
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Certifications slider state
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  // Canvas ref
  const canvasRef = useRef(null);

  const roles = [
    'BSc.IT Student (2025–2028)',
    'Web Development & Python Learner',
    'Curious About AI & Cybersecurity'
  ];

  const speechDialogues = [
    "👋 Hi there! I'm Ujala Yadav! Welcome to my personal portfolio!",
    "🏆 I was honored with 1st Rank (9.09 SGPA) in FYIT at Thakur Shyamnarayan Degree College!",
    "🤝 I bring strong team co-operative and leadership abilities to tech challenges!",
    "💻 Check out my Telemedicine Portal from the HACKVISION Hackathon!",
    "📜 Explore my verified certifications in Python & C++ below!",
    "📄 Click 'Download Resume' to inspect and save my official CV!"
  ];

  const certifications = [
    {
      img: 'assets/images/achievement-topper-trophy.png',
      ribbon: '🏆 1st Rank Topper',
      issuer: 'Thakur Shyamnarayan Degree College',
      date: 'Academic Year 2025–2026',
      title: 'First Rank — Academic Excellence Trophy & Certificate',
      desc: 'Honored with the official department topper trophy and certificate at the Annual Prize Distribution for securing 1st Rank (9.09 SGPA) in FYIT across the Department of Information Technology.',
      tags: ['1st Rank', '9.09 SGPA', 'Department Topper', 'Trophy & Certificate']
    },
    {
      img: 'assets/images/certificate-hackvision.jpg',
      ribbon: '⚡ Hackathon Honor',
      issuer: 'CSI & TSDC • Unstop Partnered',
      date: 'HackVision 2024',
      title: 'HACKVISION Hackathon Participation Certificate',
      desc: 'Certified hackathon participant in Team MindSpark. Collaborated intensively under strict 24-hour time limits to design, build, and present a functional prototype of a Telemedicine Portal.',
      tags: ['Team MindSpark', 'Telemedicine Portal', 'Unstop Partner', '.xyz Domain']
    },
    {
      img: 'assets/images/certificate-python.jpg',
      ribbon: '🐍 Python Certified',
      issuer: 'Programming Hub • Google Developers Launchpad',
      date: 'Granted: 2026-02-15',
      title: 'Python Certification Course of Excellence',
      desc: 'Certified proficiency in Python programming covering fundamental syntax, data structures, conditional control flow, functions, OOP concepts, and modular programming techniques.',
      tags: ['Python 3', 'ID: 790b141c6bbff9e', 'Google Dev Launchpad', 'Core Logic']
    },
    {
      img: 'assets/images/certificate-cpp.jpg',
      ribbon: '⚙️ C++ Certified',
      issuer: 'SCALER Topics',
      date: '27 January 2026',
      title: 'C++ Course: Learn the Essentials Certificate',
      desc: 'Completed an intensive 91-tutorial track across 14 comprehensive modules and 14 coding challenges, mastering low-level memory concepts, pointers, STL, and object-oriented architecture.',
      tags: ['91 Tutorials', '14 Modules', '14 Challenges', 'Object Oriented C++']
    }
  ];

  // Show Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Dark/Light Theme
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(`${next === 'light' ? 'Light' : 'Dark Navy'} mode activated`);
  };

  // Avatar Speech Synthesis
  const speakDialogue = (indexToSpeak) => {
    const text = speechDialogues[indexToSpeak];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.15;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextSpeech = (withAudio = false) => {
    const nextIndex = (speechIndex + 1) % speechDialogues.length;
    setSpeechIndex(nextIndex);
    if (withAudio || isSpeaking) {
      speakDialogue(nextIndex);
    }
  };

  // Typing animation effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setRoleText(current.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    } else {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setRoleText(current.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 90);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Scroll Progress and Active Nav tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      const sections = ['hero', 'about', 'stats', 'interests', 'skills', 'projects', 'achievements', 'contact'];
      const scrollY = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Star canvas constellation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#D4AF6A' : '#A78BFA'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 85) * 0.18;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Copy Email Handler
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ujalayadav2207@gmail.com');
      showToast('Email copied: ujalayadav2207@gmail.com');
    } catch {
      showToast('Copied email: ujalayadav2207@gmail.com');
    }
  };

  const projectDetails = {
    telemedicine: {
      title: 'Telemedicine Portal',
      category: 'Hackathon Project • Web Development',
      desc: 'Built during the HACKVISION hackathon at Thakur Shyamnarayan Degree College in our first year. A digital consultation and appointment booking platform.',
      features: [
        'Doctor profiles and medical specialty filtering',
        'Virtual consultation appointment scheduler',
        'Accessible, empathetic UI tailored for patient comfort',
        'Built rapidly under 24-hour hackathon conditions'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI']
    },
    portfolio: {
      title: 'Personal Portfolio Website',
      category: 'First Solo Project • Web & AI Tools',
      desc: 'An interactive, responsive single-page portfolio engineered to understand and explore modern AI developer tools and frontend micro-interactions.',
      features: [
        '3D tilt photo framing and dynamic violet glowing aura',
        'Star constellation canvas and magnetic button animations',
        'Smooth dark/light themes and accessible modal dialogues',
        'Built with AI tools and modern web performance best practices'
      ],
      stack: ['React', 'JavaScript ES6', 'Tailwind CSS', 'AI Developer Tools']
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0A1128] text-slate-100' : 'bg-[#F4F7FB] text-slate-900'} font-sans transition-colors duration-300 relative selection:bg-[#D4AF6A] selection:text-[#0A1128]`}>
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#996515] via-[#D4AF6A] to-[#F5E1A4] z-50 transition-all duration-75 shadow-[0_0_10px_rgba(212,175,106,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Translucent Navbar */}
      <header className={`fixed top-0 left-0 w-full h-[74px] z-40 transition-all duration-300 ${scrollProgress > 2 ? 'backdrop-blur-md bg-[#0A1128]/85 border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF6A]/20 to-purple-600/20 border border-[#D4AF6A]/60 flex items-center justify-center font-serif font-bold text-[#D4AF6A] shadow-md group-hover:scale-105 transition-transform">
              UY
            </span>
            <span className="font-semibold text-lg tracking-tight">
              Ujala <span className="font-serif italic font-bold text-[#D4AF6A]">Yadav</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'interests', label: 'Interests' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-[#D4AF6A] to-[#F5E1A4] text-[#0A1128] font-semibold shadow-md'
                    : 'text-slate-300 hover:text-[#D4AF6A] hover:bg-[#D4AF6A]/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Nav Right CTA & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#D4AF6A] hover:bg-[#D4AF6A]/15 transition-all"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-xs tracking-wide bg-gradient-to-r from-[#D4AF6A] to-[#F5E1A4] text-[#0A1128] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Contact Me</span>
              <span>↗</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex flex-col justify-center items-center gap-1.5 text-slate-200"
              aria-label="Toggle mobile menu"
            >
              <span className={`w-5 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[74px] bg-[#0A1128]/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between z-50">
            <div className="flex flex-col gap-3">
              {['hero', 'about', 'interests', 'skills', 'projects', 'achievements', 'contact'].map((sec) => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold capitalize text-slate-200 hover:bg-[#D4AF6A]/10 hover:text-[#D4AF6A] transition-colors"
                >
                  {sec === 'hero' ? 'Home' : sec}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 text-center font-bold rounded-xl bg-gradient-to-r from-[#D4AF6A] to-[#F5E1A4] text-[#0A1128] shadow-lg"
            >
              Get In Touch ↗
            </a>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
        {/* Star Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Reference A Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl md:text-[14rem] font-black text-white/[0.02] tracking-widest select-none pointer-events-none uppercase">
          PORTFOLIO
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-semibold tracking-wide w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-[#D4AF6A] animate-ping" />
              <span>Welcome to my digital space</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Hello, I'm <br />
              <span className="font-serif italic font-bold bg-gradient-to-r from-[#D4AF6A] via-white to-[#F5E1A4] bg-clip-text text-transparent">
                Ujala Yadav
              </span>
            </h1>

            {/* Cycling typed role */}
            <div className="text-xl sm:text-2xl font-medium text-slate-300 flex items-center justify-center lg:justify-start gap-2 min-h-[2.5rem]">
              <span className="opacity-75">I am a</span>
              <span className="text-[#D4AF6A] font-bold border-b border-[#D4AF6A]/40">{roleText}</span>
              <span className="animate-pulse text-[#D4AF6A]">|</span>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Second-year <strong>BSc.IT student (2025–2028)</strong> at Thakur Shyamnarayan Degree College, exploring web development, Python, and AI tools with strong <strong>team co-operative and leadership abilities</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#D4AF6A] to-[#F5E1A4] text-[#0A1128] shadow-[0_8px_24px_rgba(212,175,106,0.35)] hover:-translate-y-1 transition-all"
              >
                View Projects →
              </a>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-7 py-3.5 rounded-full font-semibold text-sm border border-[#D4AF6A]/60 bg-white/5 hover:bg-[#D4AF6A]/10 text-slate-200 hover:text-[#D4AF6A] hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <span>Download Resume</span>
                <span>↓</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-400 flex-wrap">
              <span>🎓 BSc.IT (Batch 2025–2028)</span>
              <span>•</span>
              <span>👥 Team Co-operative & Leadership</span>
              <span>•</span>
              <span>📍 Mumbai</span>
            </div>
          </div>

          {/* Right Hero Cutout Portrait & Talking Interactive Avatar */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[420px] h-[520px] sm:h-[560px] flex items-end justify-center">
              
              {/* Violet Radial Spotlight Aura */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-80 bg-purple-600/40 rounded-full blur-[60px] pointer-events-none animate-pulse" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-60 h-40 bg-[#D4AF6A]/20 rounded-full blur-[45px] pointer-events-none" />
              
              {/* Decorative Ring */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-dashed border-[#D4AF6A]/30 pointer-events-none animate-[spin_40s_linear_infinite]" />

              {/* Talking Speech Bubble */}
              <div className="absolute top-2 -right-4 sm:-right-8 z-30 max-w-[240px] p-3.5 rounded-2xl bg-[#111C3D]/95 border border-[#D4AF6A]/70 shadow-2xl backdrop-blur-md text-left">
                <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] font-bold text-[#D4AF6A] uppercase">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF6A] animate-ping" />
                    Ujala Speaking
                  </span>
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-[#D4AF6A] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#D4AF6A] animate-pulse" />
                    <span className="w-0.5 h-1.5 bg-[#D4AF6A] animate-pulse" />
                  </div>
                </div>
                <p className="text-xs text-slate-100 font-medium leading-relaxed mb-2.5">
                  "{speechDialogues[speechIndex]}"
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakDialogue(speechIndex)}
                    className="px-2.5 py-1 rounded-md bg-[#D4AF6A]/20 hover:bg-[#D4AF6A] hover:text-[#0A1128] text-[#D4AF6A] text-[10px] font-bold transition-all flex items-center gap-1"
                  >
                    🔊 Listen
                  </button>
                  <button
                    onClick={() => nextSpeech(true)}
                    className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold transition-all"
                  >
                    Next ⏭
                  </button>
                </div>
              </div>

              {/* Cutout Photo (Clickable & Interactive) */}
              <div 
                ref={avatarRef}
                onClick={() => nextSpeech(true)}
                className="relative z-10 cursor-pointer group flex flex-col items-center"
                title="Click me to talk with Ujala!"
              >
                <img
                  src="assets/images/ujala-fullbody.png"
                  alt="Ujala Yadav - Full Body Portrait"
                  className="max-h-[480px] sm:max-h-[520px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-4 px-3 py-1 rounded-full bg-[#0A1128]/85 border border-[#D4AF6A]/60 text-[#D4AF6A] text-[10px] font-bold shadow-lg animate-bounce pointer-events-none">
                  👆 Click me to talk!
                </span>
              </div>

              {/* Floating Badge 1: 1st Rank */}
              <div className="absolute top-1/4 -left-6 z-20 px-3.5 py-2 rounded-2xl bg-[#111C3D]/80 backdrop-blur-md border border-[#D4AF6A]/50 shadow-xl flex items-center gap-2.5">
                <span className="text-xl">🏆</span>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Year 1 Topper</div>
                  <div className="text-xs font-bold text-slate-100">1st Rank, 9.09 SGPA</div>
                </div>
              </div>

              {/* Floating Badge 2: Hackathon */}
              <div className="absolute bottom-16 -right-6 z-20 px-3.5 py-2 rounded-2xl bg-[#111C3D]/80 backdrop-blur-md border border-purple-500/50 shadow-xl flex items-center gap-2.5">
                <span className="text-xl">⚡</span>
                <div className="text-left">
                  <div className="text-[10px] text-purple-300 uppercase font-semibold">HACKVISION 2024</div>
                  <div className="text-xs font-bold text-slate-100">Team MindSpark</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 hover:text-[#D4AF6A] transition-colors">
          <span className="w-5 h-8 rounded-full border border-[#D4AF6A]/50 flex justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-[#D4AF6A] animate-bounce" />
          </span>
          <span>SCROLL DOWN</span>
        </a>
      </section>

      {/* ==================== ABOUT ME SECTION ==================== */}
      <section id="about" className="py-24 relative bg-gradient-to-b from-transparent via-slate-900/40 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-bold uppercase tracking-wider">
              DISCOVER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              About <span className="font-serif italic text-[#D4AF6A]">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Close-up Portrait Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-3 rounded-3xl bg-gradient-to-br from-[#D4AF6A]/30 via-white/5 to-purple-600/30 border border-[#D4AF6A]/60 shadow-[0_20px_45px_rgba(0,0,0,0.5)] group max-w-sm w-full">
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#0A1128] relative">
                  <img
                    src="assets/images/ujala-closeup.png"
                    alt="Ujala Yadav - Close-up Portrait"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-purple-500/10 pointer-events-none" />
                </div>
                <div className="absolute -bottom-4 right-4 bg-[#111C3D] border border-[#D4AF6A]/60 px-4 py-2 rounded-full text-xs font-bold text-slate-100 shadow-xl flex items-center gap-2">
                  <span className="text-[#D4AF6A]">★</span>
                  <span>Academic Excellence</span>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 flex flex-col gap-4 text-slate-300">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF6A]">
                Dedicated Learner & Aspiring Technologist
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Transforming Curiosity Into <span className="font-serif italic text-[#D4AF6A]">Clean Code</span> & Meaningful Solutions.
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                I'm a dedicated, sincere, and hardworking second-year <strong>BSc.IT student</strong> at <strong>Thakur Shyamnarayan Degree College</strong>.
              </p>
              <p className="leading-relaxed">
                I had the honor of being the <strong>first-year department topper (1st rank, 9.09 SGPA)</strong>, reflecting my commitment to academic rigor and systematic problem-solving.
              </p>
              <p className="leading-relaxed">
                This portfolio represents my first solo project—built thoughtfully to understand, explore, and integrate modern <strong>AI tools</strong> with core web development practices.
              </p>

              {/* Trait Tags */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {['1st Rank Department Topper', 'Sincere & Hardworking', 'AI Tools Explorer', 'Team Co-operative & Leadership Abilities'].map((t) => (
                  <span key={t} className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                    ✓ {t}
                  </span>
                ))}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Degree College</div>
                  <div className="text-sm font-semibold text-slate-200">Thakur Shyamnarayan Degree College</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Junior College</div>
                  <div className="text-sm font-semibold text-slate-200">Bhavan's College, Mumbai</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Graduation Program</div>
                  <div className="text-sm font-semibold text-slate-200">BSc.IT (Batch 2025–2028 Expected)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Standing</div>
                  <div className="text-sm font-semibold text-slate-200">Rank 1 • 9.09 SGPA (Year 1 Topper)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ROW ==================== */}
      <section id="stats" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: '9.09', unit: '', label: 'First Year SGPA', sub: 'Academic Excellence' },
              { val: '1', unit: 'st', label: 'Rank in Year 1', sub: 'Department Topper' },
              { val: '1', unit: '+', label: 'Hackathon', sub: 'HACKVISION 2024' },
              { val: '2028', unit: '', label: 'Graduation Year', sub: 'Batch 2025–2028' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#D4AF6A]/60 hover:-translate-y-1.5 transition-all shadow-lg"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF6A] mb-1">
                  {stat.val}<span className="font-serif italic text-2xl text-[#D4AF6A]">{stat.unit}</span>
                </div>
                <div className="text-sm font-bold text-slate-100">{stat.label}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INTERESTS SECTION ==================== */}
      <section id="interests" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-bold uppercase tracking-wider">
              PASSIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Areas of <span className="font-serif italic text-[#D4AF6A]">Interest</span>
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Three domains that fuel my enthusiasm and continuous technological discovery.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Web Development',
                icon: '💻',
                desc: 'Building responsive, clean, and accessible web interfaces using semantic HTML5, modern CSS, and JavaScript interactions.',
                points: ['Responsive layouts & mobile-first UI', 'Modern micro-interactions & animations', 'Clean component hierarchy'],
                tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX']
              },
              {
                num: '02',
                title: 'Artificial Intelligence',
                icon: '🤖',
                desc: 'Exploring AI tools, understanding generative workflows, and applying intelligent assistants to accelerate learning and problem-solving.',
                points: ['AI-assisted development tools', 'Prompt engineering & synthesis', 'Intelligent developer workflows'],
                tags: ['AI Tools', 'Prompt Design', 'Productivity', 'Exploration']
              },
              {
                num: '03',
                title: 'Cybersecurity',
                icon: '🛡️',
                desc: 'Understanding how networks and applications stay authenticated, resilient, and protected against emerging security threats.',
                points: ['Web security & safe input practices', 'Authentication mechanisms', 'Defensive programming mindsets'],
                tags: ['Network Security', 'Data Safety', 'Fundamentals', 'Protection']
              }
            ].map((interest) => (
              <div
                key={interest.num}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF6A]/60 hover:shadow-[0_20px_45px_rgba(212,175,106,0.15)] hover:-translate-y-2 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl p-3 rounded-2xl bg-[#D4AF6A]/10 border border-[#D4AF6A]/30">
                      {interest.icon}
                    </span>
                    <span className="font-serif italic text-3xl font-extrabold text-[#D4AF6A]/30 group-hover:text-[#D4AF6A]/60 transition-colors">
                      {interest.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{interest.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{interest.desc}</p>
                  
                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="text-[11px] uppercase font-bold text-[#D4AF6A] tracking-wider mb-2">What Excites Me:</div>
                    <ul className="text-xs text-slate-300 space-y-2">
                      {interest.points.map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#D4AF6A]">✔</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {interest.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#D4AF6A]/10 text-[#D4AF6A] border border-[#D4AF6A]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="py-24 relative bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-bold uppercase tracking-wider">
              COMPETENCIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Skills & <span className="font-serif italic text-[#D4AF6A]">Expertise</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'HTML5, CSS3 & JavaScript', pct: 85, desc: 'Semantic layouts, CSS custom properties, responsive design, DOM manipulation.' },
              { name: 'Python & C++ Core Programming', pct: 86, desc: 'Certified in Python and C++. Object-oriented programming, algorithms, and logic.' },
              { name: 'Web Development', pct: 80, desc: 'Responsive mobile-first layouts, cross-browser compatibility, UI component design.' },
              { name: 'AI Tools & Exploration', pct: 82, desc: 'Leveraging modern AI platforms for code acceleration, debugging, and ideation.' },
              { name: 'Team Co-operative & Leadership Abilities', pct: 92, desc: 'Guiding and synchronizing hackathon projects with positive motivation.' },
              { name: 'Academic Discipline & Research', pct: 95, desc: 'First rank rigor, meticulous study habits, continuous conceptual learning.' },
            ].map((skill, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF6A]/40 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-base text-slate-100">{skill.name}</h3>
                  <span className="font-bold text-sm text-[#D4AF6A]">{skill.pct}%</span>
                </div>
                <p className="text-xs text-slate-300 mb-4">{skill.desc}</p>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF6A] to-[#F5E1A4]"
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-bold uppercase tracking-wider">
              SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Featured <span className="font-serif italic text-[#D4AF6A]">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent mx-auto mt-4 rounded" />
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {['all', 'web', 'ai'].map((f) => (
              <button
                key={f}
                onClick={() => setProjectFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  projectFilter === f
                    ? 'bg-gradient-to-r from-[#D4AF6A] to-[#F5E1A4] text-[#0A1128] shadow-md'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:border-[#D4AF6A]/40'
                }`}
              >
                {f === 'all' ? 'All Projects' : f === 'web' ? 'Web Development' : 'AI & Tools'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1: Telemedicine Portal */}
            {(projectFilter === 'all' || projectFilter === 'web') && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF6A]/60 hover:-translate-y-2 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-44 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-[#0A1128] border border-white/10 flex items-center justify-center text-5xl mb-6">
                    🩺
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#D4AF6A] uppercase">Web Development</span>
                    <span className="text-[11px] text-slate-400">• HACKVISION 2024</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Telemedicine Portal</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Digital consultation and appointment booking platform prototype developed at our college hackathon to simplify healthcare accessibility.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {['HTML5', 'CSS3', 'JavaScript', 'Healthcare UI'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(projectDetails.telemedicine)}
                  className="w-full py-2.5 rounded-xl border border-[#D4AF6A]/40 hover:bg-[#D4AF6A] hover:text-[#0A1128] text-[#D4AF6A] text-xs font-bold transition-all"
                >
                  View Details →
                </button>
              </div>
            )}

            {/* Project 2: Personal Portfolio */}
            {(projectFilter === 'all' || projectFilter === 'web' || projectFilter === 'ai') && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF6A]/60 hover:-translate-y-2 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-44 rounded-2xl bg-gradient-to-br from-[#D4AF6A]/20 via-[#111C3D] to-[#0A1128] border border-white/10 flex items-center justify-center text-5xl mb-6">
                    ✨
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#D4AF6A] uppercase">Solo Project</span>
                    <span className="text-[11px] text-slate-400">• AI Tools</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Personal Portfolio Website</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    My first solo build, combining 3D card tilts, custom particles, reactive forms, and modern AI development tooling.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {['Semantic HTML5', 'Vanilla CSS3', 'ES6 JavaScript', 'AI Workflows'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(projectDetails.portfolio)}
                  className="w-full py-2.5 rounded-xl border border-[#D4AF6A]/40 hover:bg-[#D4AF6A] hover:text-[#0A1128] text-[#D4AF6A] text-xs font-bold transition-all"
                >
                  View Details →
                </button>
              </div>
            )}

            {/* Project 3: More Coming Soon */}
            <div className="p-6 rounded-3xl bg-white/5 border border-dashed border-white/20 flex flex-col justify-between">
              <div>
                <div className="h-44 rounded-2xl bg-white/5 flex items-center justify-center text-5xl mb-6 animate-pulse">
                  🌱
                </div>
                <div className="text-[11px] font-bold text-[#D4AF6A] uppercase mb-2">In Progress</div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">More Projects Coming Soon</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Actively engineering new web utilities, exploring React applications, and experimenting with AI agents in year two.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['React', 'Next.js', 'REST APIs', 'Cybersecurity'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="w-full py-2.5 text-center rounded-xl bg-white/10 text-slate-300 text-xs font-bold hover:bg-white/20 transition-all"
              >
                Suggest an Idea 💬
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACHIEVEMENTS & CERTIFICATIONS SLIDER ==================== */}
      <section id="achievements" className="py-24 relative bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-bold uppercase tracking-wider">
              VERIFIED CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Certifications & <span className="font-serif italic text-[#D4AF6A]">Achievements</span>
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Verified trophies, national hackathon honors, and industry programming certifications.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent mx-auto mt-4 rounded" />
          </div>

          {/* Interactive Sliding Motion Carousel */}
          <div className="relative max-w-5xl mx-auto mb-16">
            <div className="overflow-hidden rounded-3xl border border-[#D4AF6A]/50 bg-white/5 backdrop-blur-xl shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentCertSlide * 100}%)` }}
              >
                {certifications.map((cert, idx) => (
                  <div key={idx} className="min-w-full p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/40 border border-white/10 cursor-pointer group flex items-center justify-center p-3"
                    >
                      <img 
                        src={cert.img} 
                        alt={cert.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#0A1128]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="px-4 py-2 rounded-full bg-[#D4AF6A] text-[#0A1128] font-bold text-xs shadow-lg">
                          🔍 View Full Certificate
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF6A]/20 text-[#D4AF6A] border border-[#D4AF6A]/40 backdrop-blur-md">
                        {cert.ribbon}
                      </span>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs font-bold text-[#D4AF6A]">{cert.issuer}</span>
                        <span className="text-[11px] text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5">{cert.date}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{cert.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">{cert.desc}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cert.tags.map((t) => (
                          <span key={t} className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="w-fit px-5 py-2.5 rounded-full text-xs font-bold border border-[#D4AF6A]/50 bg-[#D4AF6A]/10 text-[#D4AF6A] hover:bg-[#D4AF6A] hover:text-[#0A1128] transition-all flex items-center gap-2"
                      >
                        <span>Inspect Full Resolution</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentCertSlide((prev) => (prev === 0 ? certifications.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-[#D4AF6A]/40 bg-white/5 text-[#D4AF6A] flex items-center justify-center hover:bg-[#D4AF6A] hover:text-[#0A1128] transition-all"
                aria-label="Previous slide"
              >
                ←
              </button>
              <div className="flex gap-2">
                {certifications.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentCertSlide(i)}
                    className={`h-2.5 rounded-full transition-all ${currentCertSlide === i ? 'w-8 bg-[#D4AF6A]' : 'w-2.5 bg-white/20'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentCertSlide((prev) => (prev === certifications.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full border border-[#D4AF6A]/40 bg-white/5 text-[#D4AF6A] flex items-center justify-center hover:bg-[#D4AF6A] hover:text-[#0A1128] transition-all"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="relative border-l-2 border-[#D4AF6A]/40 ml-4 sm:ml-8 pl-8 sm:pl-10 space-y-12 max-w-4xl mx-auto">
            {[
              {
                year: 'Academic Year 2025–2026',
                title: 'First Rank — Academic Excellence Trophy & Certificate',
                sub: 'Thakur Shyamnarayan Degree College • Department Topper',
                desc: 'Secured 1st Rank across the entire First-Year BSc.IT department with an exceptional 9.09 SGPA, honored with the official trophy and certificate at the Annual Prize Distribution.',
                tags: ['1st Rank', '9.09 SGPA', 'Department Topper', 'Trophy']
              },
              {
                year: 'HackVision 2024',
                title: 'HACKVISION Hackathon Participant',
                sub: 'Team MindSpark • Thakur Shyamnarayan Degree College',
                desc: 'Collaborated in the collegiate HACKVISION hackathon with Team MindSpark, building a prototype for an accessible Telemedicine Portal in partnership with Unstop and .xyz.',
                tags: ['Hackathon', 'Telemedicine Portal', 'Team MindSpark']
              },
              {
                year: 'Early 2026',
                title: 'Python & C++ Industry Certifications',
                sub: 'Programming Hub (Google Dev Launchpad) & Scaler Topics',
                desc: 'Achieved dual programming certifications in Python (Google Developers Launchpad partnered) and comprehensive C++ (91 video tutorials, 14 challenges from Scaler).',
                tags: ['Python Certified', 'C++ Essentials', 'Google Dev Launchpad', 'Scaler']
              }
            ].map((ach, i) => (
              <div key={i} className="relative group">
                <span className="absolute -left-[45px] sm:-left-[53px] top-1 w-6 h-6 rounded-full bg-[#0A1128] border-2 border-[#D4AF6A] flex items-center justify-center text-[10px] text-[#D4AF6A] shadow-[0_0_12px_rgba(212,175,106,0.6)]">
                  ★
                </span>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#D4AF6A]/50 transition-all">
                  <span className="text-xs font-bold text-[#D4AF6A]">{ach.year}</span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">{ach.title}</h3>
                  <div className="text-xs text-slate-400 mb-2">{ach.sub}</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{ach.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {ach.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-[11px] bg-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION (Executive Direct Card) ==================== */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 text-[#D4AF6A] text-xs font-bold uppercase tracking-wider">
              DIRECT CONNECT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Get In <span className="font-serif italic text-[#D4AF6A]">Touch</span>
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Reach out directly for hackathons, collaborative student projects, or technical opportunities.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent mx-auto mt-4 rounded" />
          </div>

          {/* Executive Direct Contact Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-[#D4AF6A]/50 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Available for Tech Collaborations & Hackathons</span>
              </div>
              <span className="text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                📍 Mumbai, Maharashtra
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
              Ready to collaborate on innovative digital solutions? Let's connect!
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Whether you want to discuss hackathon teamwork, explore AI tools, or review my technical background, feel free to reach out directly through any channel below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Email */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Direct Email</div>
                  <a href="mailto:ujalayadav2207@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-[#D4AF6A]">
                    ujalayadav2207@gmail.com
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4AF6A] hover:border-[#D4AF6A]/50 transition-colors"
                  title="Copy email"
                >
                  📋
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm font-semibold text-slate-200">ujala-yadav-221769373</div>
                </div>
                <a
                  href="https://in.linkedin.com/in/ujala-yadav-221769373"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4AF6A] hover:border-[#D4AF6A]/50 transition-colors"
                >
                  ↗
                </a>
              </div>

              {/* GitHub */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">GitHub Repository</div>
                  <div className="text-sm font-semibold text-slate-200">ujalayadav2207-prog</div>
                </div>
                <a
                  href="https://github.com/ujalayadav2207-prog"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4AF6A] hover:border-[#D4AF6A]/50 transition-colors"
                >
                  ↗
                </a>
              </div>

              {/* Degree College */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Degree College</div>
                  <div className="text-sm font-semibold text-slate-200">Thakur Shyamnarayan Degree College</div>
                </div>
                <span className="text-xs">🎓</span>
              </div>

              {/* Junior College */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Junior College</div>
                  <div className="text-sm font-semibold text-slate-200">Bhavan's College, Mumbai</div>
                </div>
                <span className="text-xs">🏫</span>
              </div>

              {/* Graduation Batch */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Graduation Program</div>
                  <div className="text-sm font-semibold text-slate-200">BSc.IT (2025–2028 Expected)</div>
                </div>
                <span className="text-xs">🏆</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/10">
              <a
                href="mailto:ujalayadav2207@gmail.com"
                className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#D4AF6A] to-[#F5E1A4] text-[#0A1128] shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Send Email to Ujala ✉️
              </a>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-8 py-3.5 rounded-full font-bold text-sm border border-[#D4AF6A]/60 bg-white/5 hover:bg-[#D4AF6A]/15 text-slate-100 hover:text-[#D4AF6A] transition-all"
              >
                Download Resume (JPG) 📥
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 border-t border-white/10 bg-[#0A1128]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          <div>
            &copy; 2026 <strong className="text-[#D4AF6A]">Ujala Yadav</strong>. BSc.IT (2025–2028). Built with modern web standards & AI tools.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://in.linkedin.com/in/ujala-yadav-221769373" target="_blank" rel="noreferrer" className="hover:text-[#D4AF6A]">
              LinkedIn
            </a>
            <span>•</span>
            <a href="https://github.com/ujalayadav2207-prog" target="_blank" rel="noreferrer" className="hover:text-[#D4AF6A]">
              GitHub
            </a>
            <span>•</span>
            <a href="mailto:ujalayadav2207@gmail.com" className="hover:text-[#D4AF6A]">
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* ==================== MODALS & TOASTS ==================== */}
      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111C3D] border border-[#D4AF6A]/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <div className="text-xs font-bold text-[#D4AF6A] uppercase tracking-wider mb-1">
              {selectedProject.category}
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-3">{selectedProject.title}</h3>
            <p className="text-sm text-slate-300 mb-4">{selectedProject.desc}</p>
            <div className="border-t border-white/10 pt-3 mb-4">
              <div className="text-xs font-bold text-slate-200 mb-2">Key Features:</div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                {selectedProject.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.stack.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-[#D4AF6A]">
                  {s}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Official Verified Resume Modal */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111C3D] border border-[#D4AF6A]/60 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <div className="text-xs font-bold text-[#D4AF6A] uppercase tracking-wider mb-1">
              Curriculum Vitae
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">Ujala Yadav — Official Resume</h3>
            
            <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 p-2 mb-4 max-h-[55vh] overflow-y-auto flex justify-center">
              <img
                src="assets/Ujala_Yadav_Resume.jpg"
                alt="Ujala Yadav Official Resume Document"
                className="w-full max-w-[550px] object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="text-xs text-slate-300 mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
              <p><strong>Education:</strong> BSc.IT (2025–2028 Expected) at Thakur Shyamnarayan Degree College • Junior College: Bhavan's College</p>
              <p><strong>Strengths:</strong> Team Co-operative & Leadership Abilities • Department Topper (9.09 SGPA)</p>
            </div>

            <div className="flex gap-2">
              <a
                href="assets/Ujala_Yadav_Resume.jpg"
                download="Ujala_Yadav_Resume.jpg"
                className="flex-1 py-2.5 text-center rounded-xl bg-[#D4AF6A] text-[#0A1128] text-xs font-bold hover:brightness-110 transition-all"
              >
                Download Resume (JPG) 📥
              </a>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-slate-300 hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111C3D] border border-[#D4AF6A]/60 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <div className="text-xs font-bold text-[#D4AF6A] uppercase tracking-wider mb-1">
              {selectedCert.ribbon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{selectedCert.title}</h3>
            
            <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 p-2 mb-4 max-h-[50vh] flex items-center justify-center">
              <img
                src={selectedCert.img}
                alt={selectedCert.title}
                className="max-h-[46vh] w-auto object-contain rounded-lg shadow-md"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4">{selectedCert.desc}</p>
            
            <div className="flex gap-2">
              <a
                href={selectedCert.img}
                download
                className="flex-1 py-2.5 text-center rounded-xl bg-[#D4AF6A] text-[#0A1128] text-xs font-bold hover:brightness-110 transition-all"
              >
                Download Certificate Image 📥
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-slate-300 hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-[#111C3D] border border-[#D4AF6A]/80 text-xs font-semibold text-slate-100 shadow-2xl flex items-center gap-2">
          <span>✔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
