function createSlider() {
  const slides = document.querySelectorAll(".slide");
  const texts = document.querySelectorAll(".container-cards-3 .text");
  const nextButton = document.querySelector(".btn-next");
  const prevButton = document.querySelector(".btn-prev");
  let currentIndex = 0;
  const totalSlides = slides.length;
  const totalTexts = texts.length;

  setInitialSlide();

  function setInitialSlide() {
    if (totalSlides > 0) {
      slides.forEach((slide, index) => {
        if (slide.classList.contains("active")) currentIndex = index;
        slide.addEventListener("click", () => activeSlide(index));
      });
    }
  }

  function activeSlide(index) {
    if (currentIndex !== index) currentIndex = index;
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        texts[i].classList.remove("hidden");
      } else {
        slide.classList.remove("active");
        texts[i].classList.add("hidden");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    activeSlide(currentIndex);
  }
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    activeSlide(currentIndex);
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);
}

createSlider();
