// Browser vs Node environment check
if (typeof window === "undefined" || typeof document === "undefined") {
    console.log("==================================================");
    console.log("🎉 Birthday Surprise Website Code!");
    console.log("==================================================");
    console.log("Yeh website file hai. Browser me open ki ja rahi hai...");
    try {
        const { exec } = require("child_process");
        exec('start "" "index.html"');
    } catch (e) { }
    console.log("Website aapke browser me open ho gayi hai!");
    process.exit(0);
}

// --- Floating Background Hearts Generator ---
function initFloatingHearts() {
    const heartsContainer = document.getElementById("floatingHearts");
    if (!heartsContainer) return;

    const heartSymbols = ["❤️", "💖", "💕", "🌸", "✨", "💗"];

    for (let i = 0; i < 18; i++) {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (6 + Math.random() * 6) + "s";
        heart.style.animationDelay = (Math.random() * 5) + "s";
        heart.style.fontSize = (16 + Math.random() * 18) + "px";
        heartsContainer.appendChild(heart);
    }
}

// --- Confetti & Celebration Burst System ---
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let confettiParticles = [];
let animationFrameId = null;

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
    if (!ctx) return;
    confettiParticles = [];

    const colors = ["#ff598f", "#fd8a5e", "#e0e300", "#01dddd", "#00bfaf", "#ff3366", "#fbb1bd"];
    const totalParticles = 140;

    for (let i = 0; i < totalParticles; i++) {
        confettiParticles.push({
            x: canvas.width / 2 + (Math.random() * 100 - 50),
            y: canvas.height * 0.45,
            w: Math.random() * 9 + 5,
            h: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 16,
            speedY: Math.random() * -14 - 6,
            gravity: 0.35,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animateConfetti();
}

function animateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    for (let i = 0; i < confettiParticles.length; i++) {
        const p = confettiParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.005;

        if (p.opacity > 0 && p.y < canvas.height + 50) {
            activeParticles++;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        }
    }

    if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(animateConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// --- Melodious Birthday Tune Fallback (Web Audio API) ---
// Agar user ki audio file empty ya corrupt ho, tab bhi sweet tune bajegi!
function playFallbackTune() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const audioCtx = new AudioContext();
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        const notes = [
            { f: 392.00, d: 0.35 }, // G4
            { f: 392.00, d: 0.35 }, // G4
            { f: 440.00, d: 0.6 },  // A4
            { f: 392.00, d: 0.6 },  // G4
            { f: 523.25, d: 0.6 },  // C5
            { f: 493.88, d: 1.1 },  // B4

            { f: 392.00, d: 0.35 }, // G4
            { f: 392.00, d: 0.35 }, // G4
            { f: 440.00, d: 0.6 },  // A4
            { f: 392.00, d: 0.6 },  // G4
            { f: 587.33, d: 0.6 },  // D5
            { f: 523.25, d: 1.1 },  // C5

            { f: 392.00, d: 0.35 }, // G4
            { f: 392.00, d: 0.35 }, // G4
            { f: 783.99, d: 0.7 },  // G5
            { f: 659.25, d: 0.7 },  // E5
            { f: 523.25, d: 0.6 },  // C5
            { f: 493.88, d: 0.6 },  // B4
            { f: 440.00, d: 1.1 },  // A4

            { f: 698.46, d: 0.35 }, // F5
            { f: 698.46, d: 0.35 }, // F5
            { f: 659.25, d: 0.7 },  // E5
            { f: 523.25, d: 0.7 },  // C5
            { f: 587.33, d: 0.7 },  // D5
            { f: 523.25, d: 1.3 }   // C5
        ];

        let time = audioCtx.currentTime + 0.1;

        notes.forEach(note => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(note.f, time);

            // Chime-like envelope
            gain.gain.setValueAtTime(0.001, time);
            gain.gain.exponentialRampToValueAtTime(0.2, time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(time);
            osc.stop(time + note.d);

            time += note.d + 0.08;
        });
    } catch (e) {
        console.log("Fallback tune error:", e);
    }
}

// --- Photo Memories Slider ---
let currentSlideIndex = 0;
let autoSlideInterval = null;

const photoCaptions = [
    "My Favorite Smile ❤️",
    "Unforgettable Moments ✨",
    "Every Second With You is Special 🌸",
    "Forever in My Heart 💖",
    "That Beautiful Day 📸",
    "Always Keep Smiling 🥹",
    "Happy Birthday Once Again, Babu 🎂"
];

function initSlider() {
    const slides = document.querySelectorAll(".memory-slide");
    const dotsContainer = document.getElementById("slideDots");
    if (!dotsContainer || slides.length === 0) return;
    dotsContainer.innerHTML = "";

    slides.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.className = "dot" + (idx === 0 ? " active" : "");
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll(".memory-slide");
    const dots = document.querySelectorAll(".dot");
    const captionEl = document.getElementById("activeCaption");
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlideIndex = (index + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add("active");
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add("active");
    }
    if (captionEl && photoCaptions[currentSlideIndex]) {
        captionEl.innerText = photoCaptions[currentSlideIndex];
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
    resetAutoSlide();
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
    resetAutoSlide();
}

function goToSlide(idx) {
    showSlide(idx);
    resetAutoSlide();
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 3500);
}

function resetAutoSlide() {
    startAutoSlide();
}

// --- Main Surprise Reveal Handler ---
function showSurprise() {
    const surprise = document.getElementById("surprise");
    const surpriseBtn = document.getElementById("surpriseBtn");

    if (surprise) {
        surprise.classList.remove("hidden");
        surprise.scrollIntoView({
            behavior: "smooth"
        });
    }

    if (surpriseBtn) {
        surpriseBtn.innerHTML = "<span>💖</span> Revealed!";
        surpriseBtn.style.opacity = "0.85";
    }

    // Launch celebratory confetti burst
    launchConfetti();

    // Try playing the audio file; if not ready or empty, play sweet fallback chime!
    const audio = document.getElementById("birthdayAudio");
    const musicBtn = document.getElementById("floatingMusicBtn");

    if (audio) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Audio playing successfully!");
                if (musicBtn) musicBtn.classList.add("playing");
            }).catch(err => {
                console.log("Audio play error, using fallback tune:", err);
                playFallbackTune();
                if (musicBtn) musicBtn.classList.add("playing");
            });
        }
    } else {
        playFallbackTune();
        if (musicBtn) musicBtn.classList.add("playing");
    }

    // Start photo auto-slider
    startAutoSlide();

    // Show sweet celebratory modal popup
    setTimeout(() => {
        openModal();
    }, 600);
}

// --- Toggle Music Floating Button ---
function toggleMusic() {
    const audio = document.getElementById("birthdayAudio");
    const musicBtn = document.getElementById("floatingMusicBtn");
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            if (musicBtn) musicBtn.classList.add("playing");
        }).catch(() => {
            playFallbackTune();
            if (musicBtn) musicBtn.classList.add("playing");
        });
    } else {
        audio.pause();
        if (musicBtn) musicBtn.classList.remove("playing");
    }
}

// --- Modal Popup Controls ---
function openModal() {
    const modal = document.getElementById("customModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeModal() {
    const modal = document.getElementById("customModal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initFloatingHearts();
    initSlider();
});