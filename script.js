const indicator = document.querySelector('.nav-indicator');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

function moveIndicator(element) {
    if (element) {
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
    }
}

const options = {
    threshold: 0.6 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);

            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
                moveIndicator(activeLink);
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        moveIndicator(e.target);
    });
});

window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.navbar a.active');
    moveIndicator(currentActive);
});

window.addEventListener('load', () => {
    const firstActive = document.querySelector('.navbar a.active');
    if (firstActive) moveIndicator(firstActive);
});

const projectDetails = {
    "lapor-kan": {
        title: "Lapor.Kan",
        images: ["images/laporkan1.png", "images/laporkan2.png", "images/laporkan3.png"],
        tech: ["HTML", "CSS", "MySQL"],
        description: "Lapor.Kan adalah platform berbasis web yang dirancang khusus untuk mempermudah mahasiswa dalam melaporkan kerusakan fasilitas di area kampus.",
        features: [
            "Autentikasi akun mahasiswa & admin kampus resmi.",
            "Formulir aduan beserta unggah foto bukti kerusakan fisik.",
            "Dashboard tracking status laporan (Pending, Diproses, Selesai)."
        ]
    },
    "cineflix": {
        title: "CineFlix.id",
        images: ["images/cineflix1.png", "images/cineflix2.png", "images/cineflix3.png"],
        tech: ["HTML", "CSS", "JavaScript", "API Integration"],
        description: "CineFlix.id merupakan website rekomendasi film interaktif yang menyajikan daftar film populer dan rating.",
        features: [
            "Pencarian film instan secara real-time berdasarkan judul.",
            "Filter kategori lengkap (Action, Horror, Comedy, Sci-Fi)."
        ]
    },
    "carent": {
        title: "CARENT",
        images: ["images/carent1.png", "images/carent2.png", "images/carent3.png"], 
        tech: ["HTML", "MySQL", "Bootstrap"],
        description: "CARENT adalah solusi manajemen persewaan mobil yang mempermudah proses booking kendaraan secara online.",
        features: [
            "Katalog mobil aktif lengkap dengan informasi harga.",
            "Form pemesanan sewa lepas kunci atau dengan pengemudi."
        ]
    },
    "barberbooking": { 
        title: "Barbershop",
        images: ["images/barber.png"], 
        tech: ["Flutter", "Dart"],
        description: "Solusi digital yang mempermudah proses booking jadwal potong rambut secara online.",
        features: [
            "Katalog gaya rambut tren terbaru",
            "Form reservasi online untuk memilih jadwal kunjungan"
        ]
    },
};

const modal = document.getElementById("projectModal");
const modalSlider = document.getElementById("modalSlider"); 
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalFeatures = document.getElementById("modalFeatures");
const projectCards = document.querySelectorAll(".project-card");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentSlideIndex = 0;
let totalSlides = 0;

function updateSliderPosition() {
    modalSlider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project");
        const details = projectDetails[projectId];

        if (details) {
            modalTitle.textContent = details.title;
            modalDesc.textContent = details.description;

            currentSlideIndex = 0;
            totalSlides = details.images.length;

            if (totalSlides <= 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }

            modalSlider.innerHTML = "";
            details.images.forEach(imgUrl => {
                const img = document.createElement("img");
                img.src = imgUrl;
                img.alt = details.title;
                modalSlider.appendChild(img);
            });
            updateSliderPosition();

            modalTags.innerHTML = "";
            details.tech.forEach(t => {
                const span = document.createElement("span");
                span.classList.add("tag");
                span.textContent = t;
                modalTags.appendChild(span);
            });

            modalFeatures.innerHTML = "";
            details.features.forEach(f => {
                const li = document.createElement("li");
                li.textContent = f;
                modalFeatures.appendChild(li);
            });

            modal.style.display = "flex";
            setTimeout(() => modal.classList.add("show"), 10);
        }
    });
});

nextBtn.addEventListener("click", () => {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
    } else {
        currentSlideIndex = 0; 
    }
    updateSliderPosition();
});

prevBtn.addEventListener("click", () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
    } else {
        currentSlideIndex = totalSlides - 1; 
    }
    updateSliderPosition();
});

function closeModal() {
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }
}

document.querySelector(".close-btn").addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });