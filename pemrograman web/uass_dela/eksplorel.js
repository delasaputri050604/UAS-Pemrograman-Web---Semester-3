// Fitur Scroll-to-Top Button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.textContent = "⬆️ Kembali ke Atas";
scrollToTopBtn.style.position = "fixed";
scrollToTopBtn.style.bottom = "20px";
scrollToTopBtn.style.right = "20px";
scrollToTopBtn.style.padding = "10px 15px";
scrollToTopBtn.style.fontSize = "14px";
scrollToTopBtn.style.backgroundColor = "#2575fc";
scrollToTopBtn.style.color = "white";
scrollToTopBtn.style.border = "none";
scrollToTopBtn.style.borderRadius = "5px";
scrollToTopBtn.style.cursor = "pointer";
scrollToTopBtn.style.display = "none";
document.body.appendChild(scrollToTopBtn);

// Scroll-to-Top Logic
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Hover Animation pada Navigasi
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.transform = "scale(1.1)";
    });
    link.addEventListener("mouseout", () => {
        link.style.transform = "scale(1)";
    });
});

// Alert ketika mengklik link pada "Daftar Materi"
const materiLinks = document.querySelectorAll(".card a");
materiLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        alert(`Kamu membuka link: ${link.getAttribute("href")}`);
    });
});
