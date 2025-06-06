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

let currentPage = '2d'; // Track current active page

//button on slideshowgallery
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn2d = document.getElementById('scroll-to-gallery');
  const scrollBtn3d = document.getElementById('scroll-to-gallery-3d');
  const target2d = document.getElementById('gallery-2d');
  const target3d = document.getElementById('gallery-3d');

  document.getElementById('scroll-to-gallery').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent it from triggering 3D switch
    document.getElementById('gallery-2d-section').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.getElementById('scroll-to-gallery-3d').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('gallery-3d-section').scrollIntoView({ behavior: 'smooth' });
  });
});

// Navigate to 2D
btn2d.addEventListener('click', () => {
  pages.style.transform = 'translateX(0)';
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  currentPage = '2d';
  resetGallery('2d');

  // Show slideshow, hide video
  heroSlideshow.style.display = 'block';
  heroVideo.style.display = 'none';
});

// Navigate to 3D
btn3d.addEventListener('click', () => {
  pages.style.transform = 'translateX(-50%)';
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  currentPage = '3d';
  resetGallery('3d');

  // Show video, hide slideshow
  heroSlideshow.style.display = 'none';
  heroVideo.style.display = 'block';
});

// Prevent arrow key or touchpad horizontal scroll
window.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener('wheel', function(e) {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
}, { passive: false });

//background top
document.addEventListener('DOMContentLoaded', () => {
  // Slideshow logic
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  let current = 0;
  slides[current].style.opacity = 1;

  setInterval(() => {
    slides[current].style.opacity = 0;
    current = (current + 1) % slides.length;
    slides[current].style.opacity = 1;
  }, 4000); // Change slide every 4 seconds

  // Fade-in on scroll logic
  const fadeTargets = document.querySelectorAll('.fade-in-on-scroll');
fadeTargets.forEach(target => {
  observer.observe(target);
});
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fadeTarget.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(fadeTarget);
});


// Fade swap helper
function fadeSwapImage(imgElement, newSrc) {
  imgElement.style.opacity = '0';
  setTimeout(() => {
    imgElement.src = newSrc;
    imgElement.style.opacity = '1';
  }, 300);
}

// Open popup
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  aboutPopup.style.display = 'flex';
});

// Close popup
closePopup.addEventListener('click', () => {
  aboutPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === aboutPopup) {
    aboutPopup.style.display = 'none';
  }
});

// Filter function
function filterGallery(section, category) {
  const gallery = document.getElementById(`gallery-${section}`);
  const images = gallery.querySelectorAll('img');
  images.forEach(img => {
    img.style.display = img.dataset.category === category ? 'block' : 'none';
  });
}

// Reset gallery
function resetGallery(section) {
  const gallery = document.getElementById(`gallery-${section}`);
  const images = gallery.querySelectorAll('img');
  images.forEach(img => {
    img.style.display = 'block';
  });
}

// Logo click = reset current page's gallery (stay on same page)
logoImg.addEventListener('click', () => {
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  resetGallery(currentPage);
});
