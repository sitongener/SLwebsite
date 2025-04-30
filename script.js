const btn2d = document.getElementById('btn-2d');
const btn3d = document.getElementById('btn-3d');
const pages = document.querySelector('.pages');
const logoImg = document.getElementById('logo-img');
const aboutImg = document.getElementById('about-img');
const aboutLink = document.getElementById('about-link');
const aboutPopup = document.getElementById('about-popup');
const closePopup = document.getElementById('close-popup');

let currentPage = '2d'; // Track current active page

// Navigate to 2D
btn2d.addEventListener('click', () => {
  pages.style.transform = 'translateX(0)';
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  currentPage = '2d';
  resetGallery('2d');
});

// Navigate to 3D
btn3d.addEventListener('click', () => {
  pages.style.transform = 'translateX(-50%)';
  fadeSwapImage(logoImg, './img/logotest.png');
  fadeSwapImage(aboutImg, './img/abouttest.png');
  currentPage = '3d';
  resetGallery('3d');
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
