// Menu Icon Toggle
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Scroll Sections Active Link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky Navbar
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove Toggle Icon and Navbar when click navbar link
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Skills Animation on Scroll
const skillsSection = document.querySelector('.skills');
const skillsContainer = document.querySelector('.skills-container');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to animate skill bars
function animateSkills() {
  if (skillsSection && isInViewport(skillsSection)) {
    if (!skillsContainer.classList.contains('active')) {
      skillsContainer.classList.add('active');
      
      // Animate each progress bar
      skillProgressBars.forEach((bar) => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-width', progress + '%');
      });
    }
  }
}

// Check on scroll
window.addEventListener('scroll', animateSkills);

// Check on page load
window.addEventListener('load', animateSkills);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// CERTIFICATE MODAL FUNCTIONALITY
// ============================================

const certificateCards = document.querySelectorAll('.certificate-card');
const modal = document.getElementById('certificate-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalIssuer = document.getElementById('modal-issuer');
const modalDate = document.getElementById('modal-date');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

let currentCertificateIndex = 0;

// Certificate data array - UPDATE THIS WITH YOUR ACTUAL CERTIFICATE DATA
const certificatesData = [
  {
    image: 'certificates/promt-muhendisligi_page-0001.jpg',
    title: 'ChatGPT 2026: Prompt Mühendisliği',
    issuer: 'Udemy/Atil Samancioglu',
    date: 'February 2026'
  },
  {
    image: 'certificates/yuksekogretim-mezun-belgesi-sorgulama.jpg',
    title: 'Mezun Belgesi',
    issuer: 'Amasya University',
    date: 'January 2026'
  },
  {
    image: 'certificates/Siber_Güvenliğe_Giriş_Sertifika_page-0001.jpg',
    title: 'Siber Güvenlik Sertifikasi',
    issuer: 'T.C. Türkiye Bilgi Teknolojileri ve İletişim Kurumu',
    date: 'October 2025'
  },
  {
    image: 'certificates/ingilizce_page-0001.jpg',
    title: 'İngilizce Sertifikasi',
    issuer: 'Amasya University',
    date: 'December 2022'
  }
  {
    image: 'certificates/bilgiteknogiris_page-0001.jpg',
    title: 'Bilgi Teknolojileri Giriş Sertifikasi',
    issuer: 'T.C. Türkiye Bilgi Teknolojileri ve İletişim Kurumu',
    date: 'October 2025'
  },
  {
    image: 'certificates/Ağ_Temelleri_Sertifika_page-0001.jpg',
    title: 'Ağ Temelleri Sertifikasi',
    issuer: 'T.C. Türkiye Bilgi Teknolojileri ve İletişim Kurumu',
    date: 'October 2025'
  }
  // Add more certificates as needed
];

// Open modal when certificate card is clicked
certificateCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    currentCertificateIndex = index;
    showCertificate(currentCertificateIndex);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
});

// Function to show certificate in modal
function showCertificate(index) {
  const cert = certificatesData[index];
  modalImage.src = cert.image;
  modalTitle.textContent = cert.title;
  modalIssuer.textContent = cert.issuer;
  modalDate.textContent = cert.date;
  
  // Add fade-in animation
  modalImage.style.opacity = '0';
  setTimeout(() => {
    modalImage.style.opacity = '1';
  }, 100);
}

// Close modal
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Previous certificate
modalPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentCertificateIndex = (currentCertificateIndex - 1 + certificatesData.length) % certificatesData.length;
  showCertificate(currentCertificateIndex);
});

// Next certificate
modalNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentCertificateIndex = (currentCertificateIndex + 1) % certificatesData.length;
  showCertificate(currentCertificateIndex);
});

// Keyboard navigation (left/right arrows)
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'ArrowLeft') {
      currentCertificateIndex = (currentCertificateIndex - 1 + certificatesData.length) % certificatesData.length;
      showCertificate(currentCertificateIndex);
    } else if (e.key === 'ArrowRight') {
      currentCertificateIndex = (currentCertificateIndex + 1) % certificatesData.length;
      showCertificate(currentCertificateIndex);
    }
  }
});