// Dark mode toggle with localStorage
document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode
  const toggleBtn = document.getElementById("toggle-mode");
  const savedMode = localStorage.getItem("mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedMode === "dark" || (!savedMode && prefersDark)) {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("mode", isDark ? "dark" : "light");
  });

  // شريط التقدم
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressContainer.appendChild(progressBar);
  document.body.prepend(progressContainer);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // زر العودة للأعلى
  const backToTopBtn = document.createElement('div');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // تأثيرات عند التحميل
  setTimeout(() => {
    document.querySelectorAll('.section').forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 500);
});

// بيانات الخبرات
const skillsData = [
  {
    name: "HTML",
    description: "3+ years experience building semantic and accessible web pages",
    level: "Advanced"
  },
  {
    name: "CSS",
    description: "Modern CSS including Flexbox, Grid, and animations",
    level: "Advanced"
  },
  {
    name: "JavaScript",
    description: "ES6+ features, DOM manipulation, and async programming",
    level: "Intermediate"
  },
  {
    name: "React",
    description: "Building reusable components with hooks and context API",
    level: "Intermediate"
  },
  {
    name: "Python",
    description: "Scripting and basic backend development",
    level: "Basic"
  },
  {
    name: "English",
    description: "Professional working proficiency",
    level: "Advanced"
  }
];

// إنشاء العجلة
function createWheel() {
  const wheel = document.getElementById('skills-wheel');
  const segmentAngle = 360 / skillsData.length;
  
  skillsData.forEach((skill, index) => {
    const segment = document.createElement('div');
    segment.className = `skill-segment segment-${index + 1}`;
    segment.style.transform = `rotate(${segmentAngle * index}deg) skewY(${90 - segmentAngle}deg)`;
    segment.style.width = '50%';
    segment.style.height = '50%';
    segment.innerHTML = `<span style="transform: skewY(${segmentAngle - 90}deg) rotate(${segmentAngle/2}deg); display: block;">${skill.name}</span>`;
    
    segment.addEventListener('click', () => {
      showSkillInfo(skill);
    });
    
    wheel.appendChild(segment);
  });
}

// عرض معلومات الخبرة
function showSkillInfo(skill) {
  const infoBox = document.getElementById('skill-info');
  infoBox.innerHTML = `
    <h3>${skill.name}</h3>
    <p><strong>Level:</strong> ${skill.level}</p>
    <p>${skill.description}</p>
  `;
  infoBox.classList.add('active');
  
  // إخفاء المعلومات بعد 5 ثواني
  setTimeout(() => {
    infoBox.classList.remove('active');
  }, 5000);
}

// تدوير العجلة بالماوس
let rotation = 0;
const wheel = document.getElementById('skills-wheel');

wheel.addEventListener('mousedown', (e) => {
  e.preventDefault();
  let startX = e.clientX;
  let startRotation = rotation;
  
  function moveHandler(e) {
    const deltaX = e.clientX - startX;
    rotation = startRotation + deltaX;
    wheel.style.transform = `rotate(${rotation}deg)`;
  }
  
  function upHandler() {
    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('mouseup', upHandler);
  }
  
  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('mouseup', upHandler);
});

// تهيئة العجلة عند تحميل الصفحة
window.addEventListener('load', () => {
  createWheel();
});
