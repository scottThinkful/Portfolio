import navTabs from "./navTabs.js";

let slideshow = document.querySelector('.project-slideshow-track');
let slides = Array.from(slideshow.children);

let dotsList = document.querySelector('.slideshow-nav');
let dots = Array.from(dotsList.children);

const nav = document.querySelector('.navigator');
const nextButton = document.querySelector('.slideshow-right-button');
const prevButton = document.querySelector('.slideshow-left-button');

const init = () => {
  slideshow.innerHTML = navTabs['older projects'];
  setupSlides();
  setupCircles();
  setupNav();
  getProjectName();
}

const setupNav = () => {
  nav.addEventListener('click', e => {
    const targetButton = e.target.closest('button');
    if (!targetButton) return;
  
    const buttonText = targetButton.children[0].text.toLowerCase();
  
    if (navTabs[buttonText]) {
      slideshow.innerHTML = navTabs[buttonText];
      setupSlides();
      setupCircles();
    }
    else {
      slideshow.innerHTML = '';
      setupSlides();
      setupCircles();
    }
  });
}

const setupSlides = () => {
  // slideshow = document.querySelector('.project-slideshow-track');
  slideshow.style.transform = `translateX(0)`;
  slides = Array.from(slideshow.children);
  // slideWidth = slideshow.offsetWidth;
  slides.forEach((slide, index) => {
    slide.style.left = 100 * index + '%';
  });
  getProjectName();
}

const setupCircles = () => {
  // dotsList = document.querySelector('.slideshow-nav');
  if (slides.length === 0) {
    dotsList.innerHTML = '';
    return;
  };
  let newDotsHtml = '';
  slides.forEach(slide => {
    newDotsHtml += `<button class='slideshow-circle'></button>`;
  });
  dotsList.innerHTML = newDotsHtml;
  Array.from(dotsList.children)[0].classList.add('selected-circle');
  dots = Array.from(dotsList.children);
  dotsList.addEventListener('click', e => {
    const targetCircle = e.target.closest('button');
    if (!targetCircle) return;
  
    const currentSlide = slideshow.querySelector('.current-slide');
    const currentCircle = dotsList.querySelector('.selected-circle');
  
    const targetIndex = dots.findIndex(circle => circle === targetCircle);
    const targetSlide = slides[targetIndex];
  
    moveToSlide(slideshow, currentSlide, targetSlide);
    moveToCircle(currentCircle, targetCircle);
    // getProjectName();
  });
}

const moveToSlide = (slideshow, currentSlide, targetSlide) => {
  if (!targetSlide) return;
  slideshow.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  getProjectName();
}

const moveToCircle = (currentCircle, targetCircle) => {
  if (!targetCircle) return;
  currentCircle.classList.remove('selected-circle');
  targetCircle.classList.add('selected-circle');
  // getProjectName();
}

const getProjectName = () => {
  const projectName = slideshow.querySelector('.current-slide .text-pointer').textContent;
  const projectHeader = document.querySelector('.display-container h3');
  projectHeader.textContent = projectName;
}

prevButton.addEventListener('click', e => {
  const currentSlide = slideshow.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling ? currentSlide.previousElementSibling : slides[slides.length - 1];
  moveToSlide(slideshow, currentSlide, prevSlide);
  const currentCircle = dotsList.querySelector('.selected-circle');
  const prevCircle = currentCircle.previousElementSibling ? currentCircle.previousElementSibling : dots[dots.length - 1];
  moveToCircle(currentCircle, prevCircle);
});
nextButton.addEventListener('click', e => {
  const currentSlide = slideshow.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling ? currentSlide.nextElementSibling : slides[0];
  moveToSlide(slideshow, currentSlide, nextSlide);
  const currentCircle = dotsList.querySelector('.selected-circle');
  const nextCircle = currentCircle.nextElementSibling ? currentCircle.nextElementSibling : dots[0];
  moveToCircle(currentCircle, nextCircle);
});


// dotsList.addEventListener('click', e => {
//   const targetCircle = e.target.closest('button');
//   if (!targetCircle) return;

//   const currentSlide = slideshow.querySelector('.current-slide');
//   const currentCircle = dotsList.querySelector('.selected-circle');

//   const targetIndex = dots.findIndex(circle => circle === targetCircle);
//   const targetSlide = slides[targetIndex];

//   moveToSlide(slideshow, currentSlide, targetSlide);
//   moveToCircle(currentCircle, targetCircle);
// });

// dots.forEach((dot, index) => {
//   dot.addEventListener('click', e => {
//     // const currentCircle = dotsList.querySelector('.selected-circle');
//     const currentSlide = slideshow.querySelector('.current-slide');
//     const targetSlide = slides[index];
//     const currentCircle = dotsList.querySelector('.selected-circle');
//     const targetCircle = dots[index];
//     moveToSlide(slideshow, currentSlide, targetSlide);
//     moveToCircle(currentCircle, targetCircle);
//   });
// });

init();