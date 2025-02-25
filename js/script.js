document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".swiper-slide");

  cards.forEach(card => {
      card.addEventListener("mouseover", () => {
          card.style.transform = "scale(0.95)";
          card.style.transition = "0.3s ease-in-out";
      });

      card.addEventListener("mouseout", () => {
          card.style.transform = "scale(1)";
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
  });
});