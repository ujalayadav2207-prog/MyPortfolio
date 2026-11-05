# 🌟 Ujala Yadav — Personal Portfolio Website

A premium, highly interactive, and fully responsive single-page personal portfolio website for **Ujala Yadav**, second-year BSc.IT student and 1st Rank Department Topper at **Thakur Shyamnarayan Degree College**.

Designed and built by blending **Reference A** (dark navy and gold aesthetic, thin gold borders, watermark typography, serif italic elegance) and **Reference B** (bold headline, dynamic role typing animation, and soft violet aura behind a cutout portrait).

---

## 🚀 Quick Start (Instant Preview)

**No installation, Node.js, or build steps required!**

1. Open this folder in Windows Explorer: `c:\Users\Test1\Downloads\portfolio`
2. **Double-click `index.html`** to open it immediately in Google Chrome, Microsoft Edge, or any modern web browser.
3. Everything is fully functional:
   - ✅ Interactive Star Constellation background
   - ✅ Custom glowing mouse cursor (desktop)
   - ✅ Typing animation cycling roles
   - ✅ 3D tilt effects on cards and photo frame
   - ✅ Dark / Light theme toggle
   - ✅ Animated counters (9.09 SGPA, 1st Rank, etc.)
   - ✅ Project filter tabs & interactive popup modal
   - ✅ One-click "Copy Email" with animated toast
   - ✅ Validated contact form with mailto client launcher
   - ✅ Fully responsive on phones, tablets, and desktops

---

## 🎨 Visual Design System

- **Background Palette**: Deep Navy gradient (`#0A1128` to `#111C3D` and `#0F172A`)
- **Primary Accent**: Soft Gold (`#D4AF6A`, with highlights `#F5E1A4` and metallic depths `#A67C37`)
- **Hero Aura**: Multi-layered soft violet / indigo radial glow (`rgba(139, 92, 246, 0.45)`) positioned behind the cut-out portrait
- **Typography**: 
  - Serif italic accent: *Playfair Display* & *Cormorant Garamond* for emphasized words and quotes
  - Clean sans-serif: *Plus Jakarta Sans* & *Inter* for modern readability
- **Glassmorphism**: Backdrop blur (`blur(16px)`), subtle gold card borders, and refined box shadows
- **Cutout Portraits**: Uses Ujala's uploaded full-body standing photo (`assets/images/ujala-fullbody.png`) in the hero and close-up smiling photo (`assets/images/ujala-closeup.png`) in the About Me section.

---

## 📑 Included Sections

1. **Sticky Translucent Navbar**:
   - Stylized monogram logo `UY` with gold accents
   - Quick navigation links (Home, About, Interests, Skills, Projects, Achievements, Contact)
   - Dark / Light mode toggle button (persists in `localStorage`)
   - Thin gold scroll progress bar indicator at the top
   - Slide-in mobile drawer navigation for smartphones
2. **Hero Section**:
   - Headline: *"Hello, I'm Ujala Yadav"*
   - Animated typing text cycling through:
     1. *"BSc.IT Student"*
     2. *"Web Development Learner"*
     3. *"Curious About AI & Cybersecurity"*
   - Full-body portrait cutout with floating animation, dashed orbital ring, and violet aura
   - Floating glass badges: *"🏆 1st Rank, 9.09 SGPA"* and *"⚡ Hackathon Participant"*
   - Primary action buttons: *"View Projects"* (gold magnetic) and *"Download Resume"* (outlined)
   - Reference A style animated mouse *"SCROLL DOWN"* indicator
3. **About Me**:
   - Two-column layout with 3D tilting portrait in a gold-cornered frame
   - Narrative detailing academic excellence as first-year department topper (1st rank, 9.09 SGPA)
   - Exploration of AI developer tools and web development foundations
   - Key traits badges & academic info grid
4. **Interests**:
   - 3 interactive 3D flip / hover cards:
     1. **Web Development**: Building responsive, clean interfaces with semantic code.
     2. **Artificial Intelligence**: Exploring modern AI tools, prompt craft, and code acceleration.
     3. **Cybersecurity**: Learning system protection, authentication, and defensive programming.
5. **Stats Row**:
   - Animated number counters that count up on scroll:
     - **9.09** SGPA (Academic Excellence)
     - **1st** Rank in Year 1 (Department Topper)
     - **1** Hackathon (HACKVISION 2024)
     - **2nd** Year BSc.IT (Current Academic Year)
6. **Skills**:
   - Gold-outline icon cards with smooth animated progress bars:
     - HTML5, CSS3 & JavaScript (85%)
     - Web Development (80%)
     - AI Tools & Exploration (82%)
     - Teamwork & Collaboration (90%)
     - Problem Solving (88%)
     - Academic Discipline & Research (95%)
7. **Projects Showcase**:
   - Category filter tabs: `[All Projects]`, `[Web Development]`, `[AI & Tools]`
   - **Telemedicine Portal**: First-year HACKVISION hackathon prototype for patient-doctor appointments.
   - **Personal Portfolio Website**: First solo project built exploring AI tools and frontend interactions.
   - **More Coming Soon**: Card teasing ongoing full-stack and cybersecurity explorations.
   - **View Details Modal**: Rich popup showing project overview, key features list, tech stack tags, and lessons learned.
8. **Achievements Timeline**:
   - Vertical animated timeline with glowing gold nodes and connector spine:
     - First Rank Department Topper (9.09 SGPA)
     - HACKVISION Hackathon Participant
     - First Solo Web Project & AI Tools Exploration
9. **Contact Section**:
   - Direct glass info card:
     - Email: `ujalayadav2207@gmail.com` with a 1-click **Copy Email** button + animated toast
     - LinkedIn: `https://in.linkedin.com/in/ujala-yadav-221769373`
     - GitHub: `https://github.com/ujalayadav2207-prog`
     - College: Thakur Shyamnarayan Degree College, Mumbai
     - Live pulse badge: *"Available for Collaborations & Learning"*
   - Interactive Contact Form with client-side validation (name, email format, message length) and mailto fallback.
10. **Footer**:
    - *"© 2026 Ujala Yadav. Built with modern web standards and AI tools."*
    - Social links and back-to-top floating button.

---

## 🛠️ Project Structure

```
MyPortfolio/
├── index.html                 # Main standalone HTML5 entry point
├── style.css                  # Custom styling (Design tokens, glassmorphism, animations)
├── script.js                  # Interactivity (Canvas, typing, tilt, counters, validation)
├── package.json               # Node/Vite configuration (optional React build)
├── assets/
│   └── images/
│       ├── ujala-fullbody.png # Full body portrait (cutout, transparent background)
│       └── ujala-closeup.png  # Close-up portrait (cutout, transparent background)
└── src/
    ├── App.jsx                # React app wrapper
    └── Portfolio.jsx          # React + Tailwind component equivalent
```

---

## 🌐 Deploying to GitHub Pages or Netlify

### Option 1: GitHub Pages (Free)
1. Push this repository to GitHub with the website files in the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Ujala Yadav portfolio"
   git branch -M main
   git remote add origin https://github.com/ujalayadav2207-prog/MyPortfolio.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live at `https://ujalayadav2207-prog.github.io/MyPortfolio/`!

### Option 2: Netlify (Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the repository folder directly into your browser.
3. Your site will be deployed worldwide in under 10 seconds!

---

## 📝 Personalizing the Resume Download

To replace the resume download with your personal PDF file:
1. Place your resume PDF in the `assets/` folder, e.g. `assets/Ujala_Yadav_Resume.pdf`.
2. In `index.html`, update the `id="downloadResumeBtn"` button or modal link to point directly to `assets/Ujala_Yadav_Resume.pdf`:
   ```html
   <a href="assets/Ujala_Yadav_Resume.pdf" download="Ujala_Yadav_Resume.pdf" class="btn btn-outline">
     <i class="fa-solid fa-file-arrow-down"></i>
     <span>Download Resume</span>
   </a>
   ```

---

## ⚛️ Using with React

If you want to use the React version in an existing Vite, Next.js, or Create React App project:
1. Copy `src/Portfolio.jsx` into your React project components.
2. Ensure Tailwind CSS is configured in your project.
3. Import and render:
   ```jsx
   import Portfolio from './Portfolio';

   export default function App() {
     return <Portfolio />;
   }
   ```
