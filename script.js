// Dark Mode الصحيح
document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("toggle-mode");
  const savedMode = localStorage.getItem("mode");
  
  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }
  
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("mode", isDark ? "dark" : "light");
  });
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


// بيانات الخبرات المحسنة
const skillsData = [
  {
    name: "HTML5",
    description: "Semantic markup, accessibility, modern APIs",
    level: "Expert",
    years: "3+",
    details: "Extensive experience building responsive and accessible web pages using latest HTML5 standards."
  },
  {
    name: "CSS3",
    description: "Flexbox, Grid, Animations",
    level: "Expert",
    years: "3+",
    details: "Advanced CSS skills including custom properties, transitions, and complex layouts."
  },
  {
    name: "JavaScript",
    description: "ES6+, DOM, Async",
    level: "Advanced",
    years: "2+",
    details: "Modern JavaScript development with focus on clean code and performance."
  },
  {
    name: "React",
    description: "Hooks, Context, Redux",
    level: "Intermediate",
    years: "1+",
    details: "Building reusable components and state management in React applications."
  },
  {
    name: "Python",
    description: "Scripting, Automation",
    level: "Basic",
    years: "<1",
    details: "Basic scripting for automation and backend development."
  },
  {
    name: "English",
    description: "Professional",
    level: "Fluent",
    years: "",
    details: "Professional working proficiency in technical communication."
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
    segment.innerHTML = `
      <span style="transform: skewY(${segmentAngle - 90}deg) rotate(${segmentAngle/2}deg); 
                  display: block;
                  width: 100px;
                  text-align: center;
                  margin-left: -50px;">
        ${skill.name}
      </span>`;
    
    segment.addEventListener('click', () => {
      showSkillInfo(skill, false);
    });
    
    wheel.appendChild(segment);
  });
}

// عرض معلومات الخبرة
function showSkillInfo(skill, isExpanded) {
  const infoBox = document.getElementById('skill-info');
  const expandBtn = document.getElementById('expand-btn');
  
  infoBox.innerHTML = `
    <h3>${skill.name}</h3>
    <p><strong>Level:</strong> ${skill.level} ${skill.years ? `(${skill.years} years)` : ''}</p>
    <p>${skill.description}</p>
    ${isExpanded ? `<div class="skill-details">${skill.details}</div>` : ''}
  `;
  
  expandBtn.style.display = isExpanded ? 'none' : 'block';
  expandBtn.onclick = () => showSkillInfo(skill, true);
}

// تدوير العجلة
let currentAngle = 0;
const wheel = document.getElementById('skills-wheel');
const spinLeft = document.getElementById('spin-left');
const spinRight = document.getElementById('spin-right');

function spinWheel(angle) {
  currentAngle += angle;
  wheel.style.transform = `rotate(${currentAngle}deg)`;
  
  // إظهار المهارة الحالية بعد الدوران
  setTimeout(() => {
    const segmentIndex = Math.floor(((360 - (currentAngle % 360)) / (360 / skillsData.length))) % skillsData.length;
    showSkillInfo(skillsData[segmentIndex], false);
  }, 1000);
}

spinLeft.addEventListener('click', () => spinWheel(-60));
spinRight.addEventListener('click', () => spinWheel(60));

// التهيئة
window.addEventListener('load', () => {
  createWheel();
});
