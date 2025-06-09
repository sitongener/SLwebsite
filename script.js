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

// Get detail view elements
const detailView = document.getElementById('detail-view');
const backToGalleryBtn = document.getElementById('back-to-gallery');

const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailMedia = document.getElementById('detail-media');
const detailStatement = document.getElementById('detail-statement');
const detailAdditional = document.getElementById('detail-additional-images');

// Gallery containers
const gallery2d = document.getElementById('gallery-2d-section');
const gallery3d = document.getElementById('gallery-3d-section');

// Function to open detail view with data
function openDetailView(imgElement) {
  // Hide galleries and other content
  gallery2d.style.display = 'none';
  gallery3d.style.display = 'none';
  sideNav.style.display = 'none';

  // Show detail view container
  detailView.style.display = 'block';

  // Fill in detail info dynamically
  detailImage.src = imgElement.src;
  detailImage.alt = imgElement.alt || 'Detail Image';

  // You will want to store these as data attributes on the images:
  detailTitle.textContent = imgElement.dataset.title || 'Title missing';
  detailMedia.textContent = imgElement.dataset.media || '';
  detailStatement.textContent = imgElement.dataset.statement || '';

  // Clear additional images area for now
  detailAdditional.innerHTML = '';

  // If you have more detail images, you can add them here dynamically (optional)
}

// Attach click listeners to all gallery images
function setupGalleryClickListeners(section) {
  const gallery = document.getElementById(`gallery-${section}`);
  const images = gallery.querySelectorAll('img');
  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openDetailView(img));
  });
}

// Back button click hides detail view and shows gallery again
backToGalleryBtn.addEventListener('click', () => {
  detailView.style.display = 'none';
  sideNav.style.display = 'block';

  if (currentPage === '2d') {
    gallery2d.style.display = 'block';
    gallery3d.style.display = 'none';
  } else {
    gallery3d.style.display = 'block';
    gallery2d.style.display = 'none';
  }
});

// Call setup functions on page load and after gallery resets
document.addEventListener('DOMContentLoaded', () => {
  setupGalleryClickListeners('2d');
  setupGalleryClickListeners('3d');
});
