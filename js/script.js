const loader = document.querySelector(".loader");
const loaderNumber = document.querySelector(".loader-number");
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let count = 0;
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

const counter = setInterval(() => {
    count += Math.floor(Math.random() * 8) + 4;

    if (count >= 100) {
        count = 100;
        clearInterval(counter);

        window.setTimeout(() => {
            loader.classList.add("loaded");
        }, 350);
    }

    loaderNumber.textContent = String(count).padStart(2, "0");
}, 30);

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    if (follower) {
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
    }

    window.requestAnimationFrame(animateCursor);
}

if (window.matchMedia("(pointer: fine)").matches) {
    animateCursor();
}

document.querySelectorAll("a, button, .service, .project-image, .skills-list li")
    .forEach((element) => {
        element.addEventListener("mouseenter", () => {
            follower?.classList.add("active");
        });

        element.addEventListener("mouseleave", () => {
            follower?.classList.remove("active");
        });
    });

const revealElements = document.querySelectorAll(
    ".intro, .work, .skills, .contact, .project, .service"
);

revealElements.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

revealElements.forEach((element) => revealObserver.observe(element));

const heroDecoration = document.querySelector(".hero-decoration");

window.addEventListener("scroll", () => {
    if (heroDecoration) {
        const scroll = window.scrollY;
        heroDecoration.style.marginTop = `${scroll * 0.08}px`;
    }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

const projectImages = document.querySelectorAll(".project-image");

projectImages.forEach((image) => {
    image.addEventListener("mousemove", (event) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 80;
        const rotateY = (rect.width / 2 - x) / 80;

        image.style.transform =
            `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });

    image.addEventListener("mouseleave", () => {
        image.style.transform =
            "perspective(1200px) rotateX(0) rotateY(0) scale(1)";
    });
});

const form = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#nombre").value.trim();

    formStatus.textContent =
        `Gracias${name ? `, ${name}` : ""}. Tu mensaje está listo para enviar.`;

    form.reset();
});
