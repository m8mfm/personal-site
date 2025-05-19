// ===== Modern Particle Background =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = window.innerWidth < 768 ? 30 : 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== Skills Generator =====
const skillsData = [
    { name: "JavaScript (ES6+)", level: 95, icon: "🟨" },
    { name: "HTML5 & CSS3", level: 98, icon: "🟧" },
    { name: "Responsive Design", level: 90, icon: "📱" },
    { name: "UI/UX Principles", level: 85, icon: "🎨" },
    { name: "Performance Optimization", level: 88, icon: "⚡" },
    { name: "Web Accessibility", level: 82, icon: "♿" },
    { name: "Cross-Browser Testing", level: 80, icon: "🌐" },
    { name: "Git Version Control", level: 85, icon: "🔀" }
];

function generateSkills() {
    const container = document.getElementById('skillsContainer');
    
    skillsData.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-card';
        skillElement.innerHTML = `
            <div class="skill-header">
                <span class="skill-icon">${skill.icon}</span>
                <h3 class="skill-name">${skill.name}</h3>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%" data-level="${skill.level}"></div>
            </div>
            <span class="skill-percent">0%</span>
        `;
        container.appendChild(skillElement);
    });
}

// ===== Animate Skills on Scroll =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillPercents = document.querySelectorAll('.skill-percent');
    
    skillBars.forEach((bar, index) => {
        const level = bar.dataset.level;
        let width = 0;
        const interval = setInterval(() => {
            if (width >= level) {
                clearInterval(interval);
            } else {
                width++;
                bar.style.width = `${width}%`;
                skillPercents[index].textContent = `${width}%`;
            }
        }, 20);
    });
}

// ===== Intersection Observer =====
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.id === 'about') {
                    animateCounter(document.getElementById('projectsCompleted'), 120);
                    animateCounter(document.getElementById('clientsServed'), 45);
                }
                
                if (entry.target.id === 'expertise') {
                    animateSkills();
                }
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ===== CTA Button Effect =====
document.getElementById('exploreBtn').addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.target.style.setProperty('--mouse-x', `${x}px`);
    e.target.style.setProperty('--mouse-y', `${y}px`);
});

document.getElementById('exploreBtn').addEventListener('click', function () {
  document.getElementById('endOfPage').scrollIntoView({
    behavior: 'smooth'
  });
});

const exploreBtn = document.getElementById('exploreBtn');
const topBtn = document.getElementById('topBtn');

// تابع يراقب الزر الأصلي
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });
}, {
    threshold: 0
});

observer.observe(exploreBtn);

// لما تضغط زر Top يرجعك لفوق
topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ===== Initialize Everything =====
window.addEventListener('load', () => {
    initParticles();
    animateParticles();
    generateSkills();
    setupIntersectionObserver();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
