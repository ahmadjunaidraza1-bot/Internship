// Toggle navbar functionality
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');
  const span1 = document.querySelector('span1');

  mobileMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      nav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnToggle = mobileMenu.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
});

// Project data (array) with categories for filtering
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "Responsive shop with catalog, cart, auth, and payments.",
    image: "/images/shoe1-3.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Responsive"],
    sourceCode: "#",
    category: "Websites"
  },
  {
    id: 2,
    title: "Sabroso Website",
    description: "Restaurant landing with interactive menu and smooth animations.",
    image: "/images/Crispy-1300x600-d59bb43-sabroso.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Responsive"],
    sourceCode: "#",
    category: "Websites"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Personal portfolio showcasing skills and projects.",
    image: "/images/about.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "AOS"],
    sourceCode: "#",
    category: "Designs"
  },
  {
    id: 4,
    title: "Coffee Website",
    description: "Coffee brand site with engaging hero and sections.",
    image: "/images/coffee-hero-section.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    sourceCode: "#",
    category: "Websites"
  },
  {
    id: 5,
    title: "LimeLight Website",
    description: "Gardening services site with responsive gallery.",
    image: "/images/lawn-3.webp",
    technologies: ["HTML5", "CSS3", "Font Awesome"],
    sourceCode: "#",
    category: "Designs"
  },
  {
    id: 6,
    title: "Prixima Website",
    description: "Agency template with modern UI blocks.",
    image: "/images/bg_banner3.jpg",
    technologies: ["HTML5", "CSS3","Font Awesome"],
    sourceCode: "#",
    category: "Mini Apps"
  }
];

const idToProject = Object.fromEntries(projects.map(p => [String(p.id), p]));

// Render projects dynamically
const projectsGrid = document.getElementById('projectsGrid');

function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-project', String(project.id));
  card.setAttribute('data-category', project.category);
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-duration', '1200');
  if (index) {
    card.setAttribute('data-aos-delay', String(index * 200));
  }

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'project-image';

  const img = document.createElement('img');
  img.src = project.image;
  img.alt = project.title;

  const overlay = document.createElement('div');
  overlay.className = 'project-overlay';

  const title = document.createElement('h3');
  title.textContent = project.title;

  const info = document.createElement('p');
  info.textContent = 'Click to view details';

  const small = document.createElement('p');
  small.style.opacity = '0.9';
  small.style.marginTop = '6px';
  small.textContent = `${project.category} • ${project.technologies.slice(0, 2).join(', ')}`;

  overlay.appendChild(title);
  overlay.appendChild(info);
  overlay.appendChild(small);

  imageWrapper.appendChild(img);
  imageWrapper.appendChild(overlay);
  card.appendChild(imageWrapper);
  return card;
}

function renderProjects(filter = 'all') {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';
  const list = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  list.forEach((project, idx) => {
    const card = createProjectCard(project, idx);
    projectsGrid.appendChild(card);
  });
  if (window.AOS && typeof window.AOS.refresh === 'function') {
    window.AOS.refresh();
  }
}

renderProjects('all');

// Project modal functionality
const projectModal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');

// Open modal using event delegation on the grid
if (projectsGrid) {
  projectsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const projectId = card.getAttribute('data-project');
    const project = idToProject[projectId];
    if (!project) return;

    document.getElementById('modalImg').src = project.image;
    document.getElementById('modalImg').alt = project.title;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;

    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const techTag = document.createElement('span');
      techTag.className = 'tech-tag';
      techTag.textContent = tech;
      techContainer.appendChild(techTag);
    });

    document.getElementById('sourceCode').href = project.sourceCode;

    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
}

// Close modal functionality
closeModal.addEventListener('click', () => {
  projectModal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.style.display === 'block') {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Filtering logic
const filterContainer = document.querySelector('.filter-bar');
if (filterContainer) {
  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(filter);
  });
}