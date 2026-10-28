/**
 * Mariyamath Sifana - Portfolio Main Script
 * Handles project rendering, category filters, theme toggle, inspection modals,
 * copy-to-clipboard, form interaction, and scrollspy navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Components
  initTheme();
  renderProjects('all');
  initFilterButtons();
  initScrollProgress();
  initNavbarScroll();
  initScrollSpy();
  initMobileMenu();
  initCopyButtons();
  initContactForm();
  initModalListeners();
});

/* --------------------------------------------------------------------------
   Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('sifana_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sifana_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;

  if (theme === 'light') {
    // Show Moon icon (to switch to dark)
    themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
  } else {
    // Show Sun icon (to switch to light)
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    `;
  }
}

/* --------------------------------------------------------------------------
   Render Project Cards
   -------------------------------------------------------------------------- */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  const data = window.projectsData || [];
  if (!container || !data.length) return;

  container.innerHTML = '';

  const filteredProjects = filter === 'all' 
    ? data 
    : data.filter(p => p.category === filter);

  filteredProjects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);

    // Technologies badges
    const techBadges = project.technologies
      .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
      .join('');

    // Highlights (top 2 for card)
    const highlightsHtml = project.coverage.slice(0, 2)
      .map(h => `
        <div class="project-highlight-item">
          <svg class="highlight-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${escapeHtml(h)}</span>
        </div>
      `).join('');

    // Code preview banner
    const bannerCode = project.codeSnippet 
      ? escapeHtml(project.codeSnippet.split('\n')[0] || '// Test Specification')
      : `// ${escapeHtml(project.title)}`;

    // GitHub Button HTML
    const ghBtnHtml = project.github 
      ? `
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-project-gh" title="View Source on GitHub">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          View on GitHub
        </a>
      ` 
      : `
        <span class="btn-project-gh" style="opacity: 0.6; cursor: default;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          QA Case Study
        </span>
      `;

    card.innerHTML = `
      <div class="project-card-banner">
        <div class="banner-pattern"></div>
        <div class="banner-top-row">
          <span class="banner-category-badge">${escapeHtml(project.type)}</span>
          <span class="banner-status-badge status-${project.statusColor}">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:currentColor;"></span>
            ${escapeHtml(project.statusBadge)}
          </span>
        </div>
        <div class="banner-code-preview">
          <span>RUN:</span> ${bannerCode}
        </div>
      </div>

      <div class="project-card-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-tagline">${escapeHtml(project.subtitle)}</p>
        <p class="project-description">${escapeHtml(project.description)}</p>

        <div class="project-highlights-box">
          ${highlightsHtml}
        </div>

        <div class="project-tech-tags">
          ${techBadges}
        </div>

        <div class="project-card-footer">
          ${ghBtnHtml}
          <button type="button" class="btn-project-details" onclick="openProjectModal('${project.id}')">
            Inspect Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* --------------------------------------------------------------------------
   Project Inspection Modal
   -------------------------------------------------------------------------- */
window.openProjectModal = function(projectId) {
  const data = window.projectsData || [];
  const project = data.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('projectModal');
  const modalContent = document.getElementById('projectModalContent');
  if (!modalOverlay || !modalContent) return;

  // Coverage items
  const coverageList = project.coverage
    .map(c => `
      <li style="display: flex; gap: 8px; margin-bottom: 6px; align-items: flex-start;">
        <svg style="color: #10b981; flex-shrink: 0; margin-top: 4px;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${escapeHtml(c)}</span>
      </li>
    `).join('');

  // Structure / Files
  const structureList = project.repositoryStructure
    .map(s => `
      <li style="font-family: var(--font-mono); font-size: 0.8125rem; margin-bottom: 4px; color: var(--text-secondary);">
        📁 ${escapeHtml(s)}
      </li>
    `).join('');

  // Tech Badges
  const techBadges = project.technologies
    .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
    .join('');

  const githubLink = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        Open GitHub Repository
      </a>`
    : '';

  modalContent.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="banner-status-badge status-${project.statusColor}" style="margin-bottom: 10px; display: inline-flex;">${escapeHtml(project.statusBadge)}</span>
      <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">${escapeHtml(project.title)}</h2>
      <p style="color: var(--accent-primary); font-size: 0.9rem; font-weight: 600;">${escapeHtml(project.subtitle)}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.75px; margin-bottom: 8px;">Technologies & Tools</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">${techBadges}</div>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.75px; margin-bottom: 8px;">Detailed Overview</h4>
      <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.65;">${escapeHtml(project.description)}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.75px; margin-bottom: 8px;">Test Coverage & Architectural Highlights</h4>
      <ul style="list-style: none; font-size: 0.875rem; color: var(--text-secondary);">${coverageList}</ul>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.75px; margin-bottom: 8px;">Repository / Module Architecture</h4>
      <ul style="list-style: none; background: rgba(0,0,0,0.25); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">${structureList}</ul>
    </div>

    ${project.codeSnippet ? `
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.75px; margin-bottom: 8px;">Test Code Snippet / Test Case</h4>
        <pre class="modal-code-block"><code>${escapeHtml(project.codeSnippet)}</code></pre>
      </div>
    ` : ''}

    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
      ${githubLink}
      <button type="button" class="btn-secondary" onclick="closeProjectModal()" style="padding: 8px 18px; font-size: 0.84rem;">Close</button>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function initModalListeners() {
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

/* --------------------------------------------------------------------------
   Scroll Progress Bar & Sticky Navbar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = `${scrolled}%`;
  });
}

function initNavbarScroll() {
  const wrapper = document.getElementById('navbarWrapper');
  if (!wrapper) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      wrapper.classList.add('scrolled');
    } else {
      wrapper.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Active Scrollspy for Nav Links
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navbarWrapper = document.getElementById('navbarWrapper');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileBtn || !navbarWrapper) return;

  mobileBtn.addEventListener('click', () => {
    navbarWrapper.classList.toggle('mobile-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarWrapper.classList.remove('mobile-open');
    });
  });
}

/* --------------------------------------------------------------------------
   Copy to Clipboard & Toast
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast('Failed to copy. Please copy manually.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

/* --------------------------------------------------------------------------
   Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('messageSubject').value.trim() || 'Software Tester Role Inquiry';
    const message = document.getElementById('messageBody').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Compose mailto link
    const mailtoUrl = `mailto:mariyamathsifana@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

    // Show visual confirmation
    showToast('Preparing email client...');
    window.location.href = mailtoUrl;

    form.reset();
  });
}

/* Helper */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
