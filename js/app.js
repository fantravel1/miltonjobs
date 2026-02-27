/**
 * MiltonJobs.com - Main Application
 * Free hyperlocal business directory & jobs hub for Milton, Ontario
 */

(function () {
  'use strict';

  // ─── State ───
  const state = {
    businesses: [],
    filteredBusinesses: [],
    favorites: JSON.parse(localStorage.getItem('mj_favorites') || '[]'),
    currentPage: 1,
    perPage: 24,
    searchQuery: '',
    categoryFilter: 'all',
    neighborhoodFilter: 'all',
    sortBy: 'name',
    viewMode: localStorage.getItem('mj_viewMode') || 'grid',
    theme: localStorage.getItem('mj_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  };

  // ─── Category Config ───
  const categoryIcons = {
    'Restaurant': '&#127869;',
    'Fast Food': '&#127828;',
    'Pizza': '&#127829;',
    'Coffee Shop': '&#9749;',
    'Cafe': '&#9749;',
    'Bakery': '&#127856;',
    'Bar & Pub': '&#127866;',
    'Bubble Tea': '&#129380;',
    'Ice Cream': '&#127846;',
    'Dessert': '&#127856;',
    'Grocery Store': '&#128722;',
    'Supermarket': '&#128722;',
    'Pharmacy': '&#128138;',
    'Bank': '&#127974;',
    'Credit Union': '&#127974;',
    'Dentist': '&#129463;',
    'Doctor': '&#129658;',
    'Medical Clinic': '&#127973;',
    'Walk-in Clinic': '&#127973;',
    'Chiropractor': '&#129486;',
    'Physiotherapy': '&#129486;',
    'Optometrist': '&#128083;',
    'Massage Therapy': '&#128134;',
    'Veterinarian': '&#128054;',
    'Pet Store': '&#128062;',
    'Auto Repair': '&#128295;',
    'Auto Dealership': '&#128663;',
    'Gas Station': '&#9981;',
    'Car Wash': '&#128663;',
    'Hair Salon': '&#128135;',
    'Barber Shop': '&#128136;',
    'Spa': '&#128134;',
    'Nail Salon': '&#128133;',
    'Gym': '&#127947;',
    'Fitness': '&#127947;',
    'Yoga': '&#129496;',
    'Martial Arts': '&#129354;',
    'Dance Studio': '&#128131;',
    'Real Estate': '&#127968;',
    'Law Office': '&#9878;',
    'Accounting': '&#128202;',
    'Insurance': '&#128203;',
    'Hotel': '&#127976;',
    'Motel': '&#127976;',
    'School': '&#127979;',
    'Church': '&#9962;',
    'Mosque': '&#128332;',
    'Temple': '&#128332;',
    'Gurdwara': '&#128332;',
    'Community Centre': '&#127963;',
    'Daycare': '&#128118;',
    'Tutoring': '&#128218;',
    'Warehouse': '&#127981;',
    'Distribution Centre': '&#127981;',
    'Construction': '&#127959;',
    'Plumber': '&#128295;',
    'Electrician': '&#9889;',
    'HVAC': '&#127777;',
    'Landscaping': '&#127793;',
    'Roofing': '&#127968;',
    'Painting': '&#127912;',
    'Cleaning Service': '&#129529;',
    'Moving Company': '&#128230;',
    'Storage': '&#128230;',
    'Dry Cleaning': '&#128084;',
    'Printing': '&#128424;',
    'Driving School': '&#128664;',
    'Photography': '&#128247;',
    'Tattoo': '&#128396;',
    'Dollar Store': '&#128176;',
    'Home Improvement': '&#128296;',
    'Furniture': '&#128717;',
    'Jewellery': '&#128141;',
    'Clothing': '&#128085;',
    'Electronics': '&#128187;',
    'Sporting Goods': '&#127934;',
    'Travel Agency': '&#9992;',
    'Wedding': '&#128141;',
    'Towing': '&#128666;',
    'Library': '&#128218;',
    'Hospital': '&#127973;',
    'Employment Agency': '&#128188;',
    'Manufacturing': '&#127981;',
    'default': '&#128188;'
  };

  // ─── Initialization ───
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    applyTheme();
    loadBusinesses();
    setupEventListeners();
    updateFavoritesCount();
    hideLoadingScreen();
  }

  // ─── Theme ───
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('mj_theme', state.theme);
    applyTheme();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.innerHTML = state.theme === 'light'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    btn.setAttribute('aria-label', state.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  // ─── Loading ───
  function hideLoadingScreen() {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
  }

  // ─── Data Loading ───
  function loadBusinesses() {
    fetch('/data/businesses.json')
      .then(r => r.json())
      .then(data => {
        state.businesses = data;
        state.filteredBusinesses = [...data];
        populateFilters();
        renderBusinesses();
        renderFeaturedCarousel();
        updateStats();
      })
      .catch(err => {
        console.warn('Could not load businesses.json:', err);
        state.businesses = [];
        state.filteredBusinesses = [];
      });
  }

  // ─── Event Listeners ───
  function setupEventListeners() {
    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const isOpen = mobileNav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      });
    }

    // Announcement bar close
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    if (closeAnnouncement) {
      closeAnnouncement.addEventListener('click', () => {
        const bar = document.querySelector('.announcement-bar');
        if (bar) bar.style.display = 'none';
      });
    }

    // Search
    const searchInput = document.getElementById('heroSearch');
    const searchBtn = document.getElementById('heroSearchBtn');
    if (searchInput) {
      searchInput.addEventListener('input', debounce(handleSearch, 300));
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSearch();
      });
    }
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);

    // Voice search
    const voiceBtn = document.getElementById('voiceSearchBtn');
    if (voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      voiceBtn.addEventListener('click', startVoiceSearch);
    } else if (voiceBtn) {
      voiceBtn.style.display = 'none';
    }

    // Filter controls
    const catFilter = document.getElementById('categoryFilter');
    const neighborhoodFilter = document.getElementById('neighborhoodFilter');
    const sortFilter = document.getElementById('sortFilter');
    const directorySearch = document.getElementById('directorySearch');

    if (catFilter) catFilter.addEventListener('change', handleFilterChange);
    if (neighborhoodFilter) neighborhoodFilter.addEventListener('change', handleFilterChange);
    if (sortFilter) sortFilter.addEventListener('change', handleFilterChange);
    if (directorySearch) directorySearch.addEventListener('input', debounce(handleFilterChange, 300));

    // View toggle
    document.querySelectorAll('.view-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        state.viewMode = btn.dataset.view;
        localStorage.setItem('mj_viewMode', state.viewMode);
        document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const grid = document.getElementById('businessGrid');
        if (grid) {
          grid.classList.toggle('list-view', state.viewMode === 'list');
        }
      });
    });

    // Scroll effects
    const header = document.querySelector('.site-header');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 10);
      if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // FAQ toggles
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('open');
      });
    });

    // Category chips
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.dataset.category;
        state.categoryFilter = cat;
        const catSelect = document.getElementById('categoryFilter');
        if (catSelect) catSelect.value = cat;
        applyFilters();
        document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Neighborhood cards
    document.querySelectorAll('.neighborhood-card').forEach(card => {
      card.addEventListener('click', () => {
        const neighborhood = card.dataset.neighborhood;
        state.neighborhoodFilter = neighborhood;
        const nSelect = document.getElementById('neighborhoodFilter');
        if (nSelect) nSelect.value = neighborhood;
        applyFilters();
        document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Cuisine tags
    document.querySelectorAll('.cuisine-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const searchInput = document.getElementById('heroSearch');
        if (searchInput) {
          searchInput.value = tag.textContent;
          handleSearch();
        }
      });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Thanks for subscribing! We\'ll keep you updated about Milton businesses and jobs.', 'success');
        newsletterForm.reset();
      });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon.', 'success');
        contactForm.reset();
      });
    }

    // Submit business form
    const submitBizForm = document.getElementById('submitBusinessForm');
    if (submitBizForm) {
      submitBizForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Business submitted for review! We\'ll add it to the directory soon.', 'success');
        submitBizForm.reset();
        closeModal();
      });
    }

    // Modal close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // Favorites button
    const favBtn = document.getElementById('favoritesBtn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        if (state.favorites.length === 0) {
          showToast('No favorites yet. Click the heart icon on any business to save it.', 'info');
          return;
        }
        showFavoritesModal();
      });
    }

    // Carousel navigation
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (prevBtn) prevBtn.addEventListener('click', () => moveCarousel(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveCarousel(1));

    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }

  // ─── Search ───
  function handleSearch() {
    const input = document.getElementById('heroSearch');
    if (!input) return;
    state.searchQuery = input.value.trim().toLowerCase();
    state.currentPage = 1;
    applyFilters();
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  }

  function startVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-CA';
    recognition.continuous = false;
    recognition.interimResults = false;

    const btn = document.getElementById('voiceSearchBtn');
    if (btn) btn.classList.add('listening');

    recognition.onresult = e => {
      const transcript = e.results[0][0].transcript;
      const input = document.getElementById('heroSearch');
      if (input) {
        input.value = transcript;
        handleSearch();
      }
    };

    recognition.onend = () => {
      if (btn) btn.classList.remove('listening');
    };

    recognition.onerror = () => {
      if (btn) btn.classList.remove('listening');
    };

    recognition.start();
  }

  // ─── Filtering ───
  function handleFilterChange() {
    const catSelect = document.getElementById('categoryFilter');
    const neighborhoodSelect = document.getElementById('neighborhoodFilter');
    const sortSelect = document.getElementById('sortFilter');
    const searchInput = document.getElementById('directorySearch');

    if (catSelect) state.categoryFilter = catSelect.value;
    if (neighborhoodSelect) state.neighborhoodFilter = neighborhoodSelect.value;
    if (sortSelect) state.sortBy = sortSelect.value;
    if (searchInput) state.searchQuery = searchInput.value.trim().toLowerCase();

    state.currentPage = 1;
    applyFilters();
  }

  function applyFilters() {
    let results = [...state.businesses];

    // Category filter
    if (state.categoryFilter && state.categoryFilter !== 'all') {
      results = results.filter(b => b.category === state.categoryFilter);
    }

    // Neighborhood filter
    if (state.neighborhoodFilter && state.neighborhoodFilter !== 'all') {
      results = results.filter(b => b.neighborhood === state.neighborhoodFilter);
    }

    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery;
      results = results.filter(b => {
        const searchable = [
          b.name, b.category, b.neighborhood, b.address,
          b.description, b.services, b.cuisine
        ].filter(Boolean).join(' ').toLowerCase();
        return searchable.includes(q);
      });
    }

    // Sort
    results.sort((a, b) => {
      switch (state.sortBy) {
        case 'name': return (a.name || '').localeCompare(b.name || '');
        case 'name-desc': return (b.name || '').localeCompare(a.name || '');
        case 'category': return (a.category || '').localeCompare(b.category || '');
        case 'neighborhood': return (a.neighborhood || '').localeCompare(b.neighborhood || '');
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

    state.filteredBusinesses = results;
    renderBusinesses();
    updateResultsCount();
  }

  // ─── Populate Filters ───
  function populateFilters() {
    const categories = [...new Set(state.businesses.map(b => b.category).filter(Boolean))].sort();
    const neighborhoods = [...new Set(state.businesses.map(b => b.neighborhood).filter(Boolean))].sort();

    const catSelect = document.getElementById('categoryFilter');
    if (catSelect) {
      catSelect.innerHTML = '<option value="all">All Categories</option>' +
        categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    }

    const neighborhoodSelect = document.getElementById('neighborhoodFilter');
    if (neighborhoodSelect) {
      neighborhoodSelect.innerHTML = '<option value="all">All Neighborhoods</option>' +
        neighborhoods.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
    }
  }

  // ─── Render Businesses ───
  function renderBusinesses() {
    const grid = document.getElementById('businessGrid');
    if (!grid) return;

    const start = (state.currentPage - 1) * state.perPage;
    const end = start + state.perPage;
    const page = state.filteredBusinesses.slice(start, end);

    if (page.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
          <div class="no-results-icon">&#128269;</div>
          <h3>No businesses found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
          <button onclick="document.getElementById('categoryFilter').value='all';document.getElementById('neighborhoodFilter').value='all';document.getElementById('directorySearch').value='';window.MiltonJobs.resetFilters();">Clear Filters</button>
        </div>`;
      renderPagination();
      return;
    }

    grid.innerHTML = page.map(biz => renderBusinessCard(biz)).join('');
    grid.classList.toggle('list-view', state.viewMode === 'list');

    // Attach event listeners
    grid.querySelectorAll('.business-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.favorite-btn')) return;
        const id = card.dataset.id;
        const biz = state.businesses.find(b => b.id === id);
        if (biz) showBusinessDetail(biz);
      });
    });

    grid.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.id);
        btn.classList.toggle('favorited');
      });
    });

    renderPagination();
  }

  function renderBusinessCard(biz) {
    const icon = getIcon(biz.category);
    const isFav = state.favorites.includes(biz.id);
    const rating = biz.rating ? `<span class="card-rating">&#11088; ${biz.rating}</span>` : '';
    const halal = biz.halal ? '<span class="halal-badge">&#9790; Halal</span>' : '';

    return `
      <div class="business-card" data-id="${escapeHtml(biz.id)}">
        <div class="card-header">
          <div class="card-icon">${icon}</div>
          <div class="card-actions">
            <button class="favorite-btn ${isFav ? 'favorited' : ''}" data-id="${escapeHtml(biz.id)}" aria-label="Save ${escapeHtml(biz.name)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
        <h3>${escapeHtml(biz.name)}</h3>
        <span class="card-category-tag">${escapeHtml(biz.category)}</span>
        ${halal}
        <p class="card-services">${escapeHtml(biz.description || biz.services || '')}</p>
        <div class="card-footer">
          ${rating}
          <span class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${escapeHtml(biz.neighborhood || '')}
          </span>
        </div>
      </div>`;
  }

  // ─── Pagination ───
  function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;

    const totalPages = Math.ceil(state.filteredBusinesses.length / state.perPage);
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = '';
    html += `<button class="pagination-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="window.MiltonJobs.goToPage(${state.currentPage - 1})">&#8249; Prev</button>`;

    const maxVisible = 5;
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<button class="pagination-btn" onclick="window.MiltonJobs.goToPage(1)">1</button>`;
      if (startPage > 2) html += '<span class="pagination-ellipsis">...</span>';
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `<button class="pagination-btn ${i === state.currentPage ? 'active' : ''}" onclick="window.MiltonJobs.goToPage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += '<span class="pagination-ellipsis">...</span>';
      html += `<button class="pagination-btn" onclick="window.MiltonJobs.goToPage(${totalPages})">${totalPages}</button>`;
    }

    html += `<button class="pagination-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="window.MiltonJobs.goToPage(${state.currentPage + 1})">Next &#8250;</button>`;

    container.innerHTML = html;
  }

  function goToPage(page) {
    const totalPages = Math.ceil(state.filteredBusinesses.length / state.perPage);
    if (page < 1 || page > totalPages) return;
    state.currentPage = page;
    renderBusinesses();
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ─── Results Count ───
  function updateResultsCount() {
    const el = document.getElementById('resultsCount');
    if (el) {
      const total = state.filteredBusinesses.length;
      const start = (state.currentPage - 1) * state.perPage + 1;
      const end = Math.min(state.currentPage * state.perPage, total);
      el.innerHTML = total === 0
        ? 'No businesses found'
        : `Showing <strong>${start}-${end}</strong> of <strong>${total}</strong> businesses`;
    }
  }

  // ─── Stats ───
  function updateStats() {
    const totalEl = document.getElementById('statTotalBusinesses');
    const catEl = document.getElementById('statCategories');
    const neighborhoodEl = document.getElementById('statNeighborhoods');

    if (totalEl) totalEl.textContent = state.businesses.length.toLocaleString();
    if (catEl) {
      const cats = new Set(state.businesses.map(b => b.category).filter(Boolean));
      catEl.textContent = cats.size;
    }
    if (neighborhoodEl) {
      const neighborhoods = new Set(state.businesses.map(b => b.neighborhood).filter(Boolean));
      neighborhoodEl.textContent = neighborhoods.size;
    }

    // Hero stats
    const heroTotal = document.getElementById('heroStatTotal');
    const heroJobs = document.getElementById('heroStatJobs');
    if (heroTotal) heroTotal.textContent = state.businesses.length + '+';
    if (heroJobs) heroJobs.textContent = '35+';
  }

  // ─── Featured Carousel ───
  let carouselIndex = 0;

  function renderFeaturedCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track || state.businesses.length === 0) return;

    // Pick some featured businesses (first 9 or random selection)
    const featured = state.businesses
      .filter(b => b.featured || b.rating >= 4.5)
      .slice(0, 9);

    if (featured.length === 0) {
      const shuffled = [...state.businesses].sort(() => Math.random() - 0.5);
      featured.push(...shuffled.slice(0, 9));
    }

    track.innerHTML = featured.map(biz => {
      const icon = getIcon(biz.category);
      return `
        <div class="carousel-card" onclick="window.MiltonJobs.showDetail('${escapeHtml(biz.id)}')">
          <span class="featured-badge">&#11088; Featured</span>
          <h3>${escapeHtml(biz.name)}</h3>
          <p class="card-category">${icon} ${escapeHtml(biz.category)}</p>
          <p class="card-services">${escapeHtml(biz.description || biz.services || '')}</p>
          <div class="card-meta">
            <span>&#128205; ${escapeHtml(biz.neighborhood || 'Milton')}</span>
            ${biz.rating ? `<span>&#11088; ${biz.rating}</span>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const cards = track.children.length;
    const visibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const maxIndex = Math.max(0, cards - visibleCards);

    carouselIndex = Math.max(0, Math.min(maxIndex, carouselIndex + direction));
    const offset = carouselIndex * (100 / visibleCards);
    track.style.transform = `translateX(-${offset}%)`;
  }

  // ─── Business Detail Modal ───
  function showBusinessDetail(biz) {
    const overlay = document.getElementById('businessModal');
    if (!overlay) return;

    const icon = getIcon(biz.category);
    const isFav = state.favorites.includes(biz.id);
    const body = overlay.querySelector('.modal-body');

    const phoneLink = biz.phone ? `<a href="tel:${biz.phone}">${escapeHtml(biz.phone)}</a>` : 'Not listed';
    const websiteLink = biz.website ? `<a href="${escapeHtml(biz.website)}" target="_blank" rel="noopener">${escapeHtml(biz.website.replace(/^https?:\/\//, ''))}</a>` : 'Not listed';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.name + ' ' + (biz.address || 'Milton ON'))}`;

    body.innerHTML = `
      <div class="business-detail-header">
        <div class="business-detail-icon">${icon}</div>
        <div class="business-detail-info">
          <h3>${escapeHtml(biz.name)}</h3>
          <p class="detail-category">${escapeHtml(biz.category)}</p>
          <p class="detail-neighborhood">&#128205; ${escapeHtml(biz.neighborhood || 'Milton')}</p>
          ${biz.halal ? '<span class="halal-badge">&#9790; Halal Certified</span>' : ''}
        </div>
      </div>

      ${biz.description ? `<div class="detail-section"><p>${escapeHtml(biz.description)}</p></div>` : ''}

      <div class="detail-section">
        <h4>Contact Information</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <span>${escapeHtml(biz.address || 'Milton, ON')}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <span>${phoneLink}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
            <span>${websiteLink}</span>
          </div>
        </div>
      </div>

      ${biz.services ? `<div class="detail-section"><h4>Services</h4><p>${escapeHtml(biz.services)}</p></div>` : ''}

      <div class="detail-actions">
        <a href="${mapsUrl}" target="_blank" rel="noopener" class="detail-action-btn primary">&#128205; Get Directions</a>
        ${biz.phone ? `<a href="tel:${biz.phone}" class="detail-action-btn secondary">&#128222; Call Now</a>` : ''}
        <button class="detail-action-btn secondary" onclick="window.MiltonJobs.toggleFav('${escapeHtml(biz.id)}')">${isFav ? '&#10084; Saved' : '&#128153; Save'}</button>
      </div>`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showDetail(id) {
    const biz = state.businesses.find(b => b.id === id);
    if (biz) showBusinessDetail(biz);
  }

  // ─── Favorites Modal ───
  function showFavoritesModal() {
    const overlay = document.getElementById('businessModal');
    if (!overlay) return;

    const favBizs = state.businesses.filter(b => state.favorites.includes(b.id));
    const header = overlay.querySelector('.modal-header h2');
    const body = overlay.querySelector('.modal-body');

    if (header) header.textContent = 'Your Saved Businesses';

    body.innerHTML = favBizs.length === 0
      ? '<p style="text-align:center;color:var(--text-tertiary);padding:2rem 0;">No saved businesses yet.</p>'
      : favBizs.map(biz => `
        <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 0;border-bottom:1px solid var(--border-primary);cursor:pointer;" onclick="window.MiltonJobs.showDetail('${escapeHtml(biz.id)}')">
          <span style="font-size:1.5rem;">${getIcon(biz.category)}</span>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:600;">${escapeHtml(biz.name)}</div>
            <div style="font-size:0.875rem;color:var(--text-tertiary);">${escapeHtml(biz.category)} &middot; ${escapeHtml(biz.neighborhood || 'Milton')}</div>
          </div>
          <button onclick="event.stopPropagation();window.MiltonJobs.toggleFav('${escapeHtml(biz.id)}');this.closest('div[style]').remove();" style="color:var(--error);background:none;border:none;font-size:1.25rem;cursor:pointer;" aria-label="Remove from favorites">&#128148;</button>
        </div>`).join('');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ─── Favorites ───
  function toggleFavorite(id) {
    const idx = state.favorites.indexOf(id);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
      showToast('Removed from favorites', 'info');
    } else {
      state.favorites.push(id);
      showToast('Added to favorites!', 'success');
    }
    localStorage.setItem('mj_favorites', JSON.stringify(state.favorites));
    updateFavoritesCount();
  }

  function updateFavoritesCount() {
    const badge = document.getElementById('favoritesCount');
    if (badge) {
      badge.textContent = state.favorites.length;
      badge.classList.toggle('hidden', state.favorites.length === 0);
    }
  }

  // ─── Modal ───
  function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  // ─── Toast ───
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ─── Helpers ───
  function getIcon(category) {
    if (!category) return categoryIcons['default'];
    // Try exact match first
    if (categoryIcons[category]) return categoryIcons[category];
    // Try partial match
    const key = Object.keys(categoryIcons).find(k =>
      category.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(category.toLowerCase())
    );
    return key ? categoryIcons[key] : categoryIcons['default'];
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function resetFilters() {
    state.categoryFilter = 'all';
    state.neighborhoodFilter = 'all';
    state.searchQuery = '';
    state.currentPage = 1;
    state.sortBy = 'name';
    applyFilters();
  }

  // ─── Public API ───
  window.MiltonJobs = {
    goToPage,
    showDetail,
    toggleFav: toggleFavorite,
    resetFilters,
    closeModal
  };

})();
