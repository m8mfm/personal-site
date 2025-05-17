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


document.addEventListener("DOMContentLoaded", function() {
  // بيانات المهارات
  const skillsData = [
    { name: "HTML5", description: "Semantic markup expert", level: "Advanced" },
    { name: "CSS3", description: "Modern layouts specialist", level: "Advanced" },
    { name: "JavaScript", description: "ES6+ features", level: "Intermediate" },
    { name: "React", description: "Component architecture", level: "Intermediate" },
    { name: "Python", description: "Scripting & automation", level: "Basic" },
    { name: "English", description: "Professional fluency", level: "Advanced" }
  ];

  // إنشاء العجلة
  function createWheel() {
    const wheel = document.getElementById('skills-wheel');
    wheel.innerHTML = ''; // تنظيف العجلة أولاً
    
    skillsData.forEach((skill, index) => {
      const segment = document.createElement('div');
      segment.className = `skill-segment segment-${index + 1}`;
      segment.innerHTML = `
        <span style="transform: skewY(-30deg) rotate(30deg); 
                    display: block;
                    width: 80px;
                    text-align: center;
                    margin-left: -40px;">
          ${skill.name}
        </span>`;
      
      segment.addEventListener('click', () => showSkillInfo(skill));
      wheel.appendChild(segment);
    });
  }

  // عرض معلومات المهارة
  function showSkillInfo(skill) {
    const infoBox = document.getElementById('skill-info');
    infoBox.innerHTML = `
      <h3>${skill.name}</h3>
      <p><strong>Level:</strong> ${skill.level}</p>
      <p>${skill.description}</p>
    `;
  }

  // تدوير العجلة
  let currentAngle = 0;
  const wheel = document.getElementById('skills-wheel');
  
  document.getElementById('spin-left').addEventListener('click', function() {
    currentAngle -= 60;
    wheel.style.transform = `rotate(${currentAngle}deg)`;
    updateActiveSkill();
  });
  
  document.getElementById('spin-right').addEventListener('click', function() {
    currentAngle += 60;
    wheel.style.transform = `rotate(${currentAngle}deg)`;
    updateActiveSkill();
  });

  // تحديث المهارة النشطة
  function updateActiveSkill() {
    const segmentIndex = Math.floor(((360 - (currentAngle % 360)) / 60) % skillsData.length;
    showSkillInfo(skillsData[segmentIndex]);
  }

  // التهيئة الأولية
  createWheel();
});
