const btn2d = document.getElementById('btn-2d');
const btn3d = document.getElementById('btn-3d');
const pages = document.querySelector('.pages');
const logoImg = document.getElementById('logo-img');
const aboutImg = document.getElementById('about-img');
const aboutLink = document.getElementById('about-link');
const aboutPopup = document.getElementById('about-popup');
const closePopup = document.getElementById('close-popup');
const heroSlideshow = document.getElementById('hero-slideshow');
const heroVideo = document.getElementById('hero-video');
const sideNav = document.getElementById('side-nav'); // NEW

let currentPage = '2d'; // Track current active page

document.addEventListener('DOMContentLoaded', () => {
  // Scroll buttons
  const scrollBtn2d = document.getElementById('scroll-to-gallery');
  const scrollBtn3d = document.getElementById('scroll-to-gallery-3d');

  scrollBtn2d.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('gallery-2d-section').scrollIntoView({ behavior: 'smooth' });
  });

  scrollBtn3d.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('gallery-3d-section').scrollIntoView({ behavior: 'smooth' });
  });

  updateSideNav(currentPage); // NEW: Init nav
});

// Navigate to 2D
btn2d.addEventListener('click', () => {
  pages.style.transform = 'translateX(0)';
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  currentPage = '2d';
  resetGallery('2d');

  heroSlideshow.style.display = 'block';
  document.getElementById('cloudinary-video-wrapper').style.display = 'none';
  document.body.classList.remove('show-3d');

  updateSideNav('2d'); // NEW
});

// Navigate to 3D
btn3d.addEventListener('click', () => {
  pages.style.transform = 'translateX(-50%)';
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  currentPage = '3d';
  resetGallery('3d');

  heroSlideshow.style.display = 'none';
  document.getElementById('cloudinary-video-wrapper').style.display = 'block';
  document.body.classList.add('show-3d');

  updateSideNav('3d'); // NEW
});

// Prevent scroll hijack
window.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') e.preventDefault();
}, { passive: false });

window.addEventListener('wheel', function(e) {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
}, { passive: false });

// Slideshow on load
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  let current = 0;
  slides[current].style.opacity = 1;

  setInterval(() => {
    slides[current].style.opacity = 0;
    current = (current + 1) % slides.length;
    slides[current].style.opacity = 1;
  }, 4000);

  const page3D = document.querySelector('#page-3d');
  const cloudinaryWrapper = document.querySelector('#cloudinary-video-wrapper');

  function show3DPage() {
    page3D.style.display = 'block';
    cloudinaryWrapper.style.display = 'block';
  }

  function hide3DPage() {
    page3D.style.display = 'none';
    cloudinaryWrapper.style.display = 'none';
  }

  // Scroll reveal fade-in
  const fadeTargets = document.querySelectorAll('.fade-in-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // FIXED variable name
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeTargets.forEach(target => observer.observe(target));
});

// Fade helper
function fadeSwapImage(imgElement, newSrc) {
  imgElement.style.opacity = '0';
  setTimeout(() => {
    imgElement.src = newSrc;
    imgElement.style.opacity = '1';
  }, 300);
}

// Open about popup
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  aboutPopup.style.display = 'flex';
});

// Close about popup
closePopup.addEventListener('click', () => {
  aboutPopup.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === aboutPopup) {
    aboutPopup.style.display = 'none';
  }
});

// Filter logic
function filterGallery(section, category) {
  const gallery = document.getElementById(`gallery-${section}`);
  const images = gallery.querySelectorAll('img');
  images.forEach(img => {
    img.style.display = img.dataset.category === category ? 'block' : 'none';
  });
}

function resetGallery(section) {
  // Save current scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const gallery = document.getElementById(`gallery-${section}`);
  const images = gallery.querySelectorAll('img');

  images.forEach(img => {
    img.style.display = 'block';
  });

  // Restore scroll position
  window.scrollTo(scrollX, scrollY);
}

// Logo resets gallery
logoImg.addEventListener('click', () => {
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  resetGallery(currentPage);
});

// 🌟 NEW: Update side navigation content
function updateSideNav(page) {
 
  if (!sideNav) return;

  if (page === '2d') {
    sideNav.innerHTML = `
      <a onclick="filterGallery('2d', 'illustration')">Illustration</a>
      <a onclick="filterGallery('2d', 'editorial')">Editorial</a>
      <a onclick="filterGallery('2d', 'design')">Design</a>
      <a onclick="filterGallery('2d', 'books')">Books</a>

    `;
  } else if (page === '3d') {
    sideNav.innerHTML = `
      <a onclick="filterGallery('3d', 'animation')">Animation</a>
      <a onclick="filterGallery('3d', 'vrar')">VR/AR</a>
      <a onclick="filterGallery('3d', 'game')">Game</a>
      <a onclick="filterGallery('3d', 'archive')">Archive</a>
    `;
  }
}
function scrollToTop() {
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: 'smooth' });
  }
}
