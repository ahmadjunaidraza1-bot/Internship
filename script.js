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

// Project data
const projectsData = {
  1: {
    title: "E-Commerce Website",
    description: "A fully responsive e-commerce website built with modern web technologies. Features include product catalog, shopping cart, user authentication, and secure payment processing. The website provides an intuitive shopping experience with advanced filtering, search functionality, and mobile-first design.",
    image: "/images/shoe1-3.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5","Full-Responsive"],
    liveDemo: "#",
    sourceCode: "#"
  },
  2: {
    title: "Sabroso Website",
    description: "An elegant restaurant website showcasing menu items, reservation system, and online ordering capabilities. The design focuses on visual appeal with high-quality food photography and smooth animations. Features include interactive menu, contact forms, and social media integration.",
    image: "/images/Crispy-1300x600-d59bb43-sabroso.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5","Full-Responsive"],
    liveDemo: "#",
    sourceCode: "#"
  },
  3: {
    title: "Portfolio Website",
    description: "A personal portfolio website designed to showcase professional work and skills. Features include animated skill bars, project galleries, contact forms, and responsive design. The website demonstrates proficiency in frontend development with clean, modern aesthetics.",
    image: "/images/about.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "AOS Animation", "Font Awesome"],
    liveDemo: "#",
    sourceCode: "#"
  },
  4: {
    title: "Coffee Website",
    description: "A comprehensive task management application with drag-and-drop functionality, priority settings, and deadline tracking. Users can create projects, assign tasks, set reminders, and collaborate with team members. Features include data persistence and real-time updates.",
    image: "/images/coffee-hero-section.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation","Full-Responsive"],
    liveDemo: "#",
    sourceCode: "#"
  },
  5: {
    title: "LimeLight Website",
    description: "A real-time weather application that provides current weather conditions, forecasts, and location-based weather data. Features include geolocation services, weather maps, and customizable themes. The app fetches data from weather APIs and displays information in an intuitive interface.",
    image: "/images/lawn-3.webp",
    technologies: ["HTML5", "CSS3", "Font Awesome"],
    liveDemo: "#",
    sourceCode: "#"
  },
  6: {
    title: "Prixima Website",
    description: "A real-time weather application that provides current weather conditions, forecasts, and location-based weather data. Features include geolocation services, weather maps, and customizable themes. The app fetches data from weather APIs and displays information in an intuitive interface.",
    image: "/images/bg_banner3.jpg",
    technologies: ["HTML5", "CSS3","Font Awesome"],
    liveDemo: "#",
    sourceCode: "#"
  }
};

// Project modal functionality
const projectModal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
const projectCards = document.querySelectorAll('.project-card');

// Open modal when project card is clicked
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.getAttribute('data-project');
    const project = projectsData[projectId];
    
    if (project) {
      // Update modal content
      document.getElementById('modalImg').src = project.image;
      document.getElementById('modalImg').alt = project.title;
      document.getElementById('modalTitle').textContent = project.title;
      document.getElementById('modalDescription').textContent = project.description;
      
      // Update technologies
      const techContainer = document.getElementById('modalTech');
      techContainer.innerHTML = '';
      project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
      });
      
      // Update links
      // document.getElementById('liveDemo').href = project.liveDemo;
      document.getElementById('sourceCode').href = project.sourceCode;
      
      // Show modal
      projectModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  });
});

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