// ===== Modern Particle Background =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bgParticles = [];
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
        bgParticles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bgParticles.length; i++) {
        bgParticles[i].update();
        bgParticles[i].draw();

        for (let j = i; j < bgParticles.length; j++) {
            const dx = bgParticles[i].x - bgParticles[j].x;
            const dy = bgParticles[i].y - bgParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(bgParticles[i].x, bgParticles[i].y);
                ctx.lineTo(bgParticles[j].x, bgParticles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current);
    }, 16);
}

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

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillPercents = document.querySelectorAll('.skill-percent');

    skillBars.forEach((bar, index) => {
        const level = parseInt(bar.dataset.level);
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

function setupIntersectionObserver() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
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
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.getElementById('exploreBtn').addEventListener('mousemove', e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.target.style.setProperty('--mouse-x', `${x}px`);
    e.target.style.setProperty('--mouse-y', `${y}px`);
});

// ===== 3D Background with Three.js =====
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x00f7ff, wireframe: true, transparent: true, opacity: 0.7 });

const meshParticles = [];
for (let i = 0; i < 20; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
    scene.add(mesh);
    meshParticles.push(mesh);
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    meshParticles.forEach(particle => {
        particle.rotation.x += 0.005;
        particle.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}
animate();

document.getElementById('magicBtn').addEventListener('mouseenter', function() {
    const hoverSound = document.getElementById('hoverSound');
    hoverSound.currentTime = 0;
    hoverSound.play();

    const stars = this.querySelector('.star-particles');
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 0.5}s`;
        stars.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const colors = ['#0f0a1a', '#1a0f2e', '#0a1a1a', '#1a0a17'];
let currentColor = 0;
setInterval(() => {
    document.body.style.backgroundColor = colors[currentColor];
    currentColor = (currentColor + 1) % colors.length;
}, 10000);

window.addEventListener('load', () => {
    initParticles();
    animateParticles();
    generateSkills();
    setupIntersectionObserver();
});
