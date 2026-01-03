function loadSection(section) {
  fetch(`sections/${section}.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;

      // Start slider ONLY after home loads
      if (section === "home") {
        startHeroSlider();
      }
      if (section === "services") {
        // Animate Services Part Images
        animateServices();
      }
    });
}

// AUTO LOAD HOME ON PAGE LOAD
window.onload = () => {
  loadSection("home");
};

function startHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide"); // works with your CSS
  if (!slides.length) return;

  let current = 0;

  // Ensure each slide is stacked on top of each other
  slides.forEach((slide, index) => {
    slide.style.position = "absolute"; // stack slides
    slide.style.top = "0";
    slide.style.left = "0";
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.transform = `translateX(${index * 100}%)`;
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.zIndex = index === 0 ? 2 : 1; // first slide on top
  });

  setInterval(() => {
    const total = slides.length;
    const prev = current;
    current = (current + 1) % total;

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - current) * 100}%)`;
      slide.style.zIndex = index === current ? 2 : 1; // bring current slide to top
    });
  }, 1500); // 1.5 seconds per slide
}
//Animate the Services Part Images
function animateServices() {
  const rows = document.querySelectorAll(".service-row");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  rows.forEach((row) => observer.observe(row));
}
