document.addEventListener("DOMContentLoaded", () => {
  const radiobuttons = document.querySelectorAll(".box");

  radiobuttons.forEach(radio => {
    radio.addEventListener("mouseover", () => {
      radio.style.transform = "scale(1.05)";
      radio.style.transition = "0.3s ease-in-out";
      });

      radio.addEventListener("mouseout", () => {
        radio.style.transform = "scale(1)";
      });
  });
});