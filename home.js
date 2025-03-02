const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBtn.classList.toggle('active')
});

const btns = document.querySelectorAll('.nav-btn');
const slides = document.querySelectorAll('.video-slide');
const contents = document.querySelectorAll('.content');

var sliderNav = function( manual) {
    btns.forEach((btns) => {
        btns.classList.remove('active');
    });
    slides.forEach((slides) => {
        slides.classList.remove('active');
    });
    contents.forEach((contents) => {
        contents.classList.remove('active');
    });
    btns[manual].classList.add('active');
    slides[manual].classList.add('active');
    contents[manual].classList.add('active');
}
btns.forEach((btns, i) => {
    btns.addEventListener('click', () => {
        sliderNav(i);
});
});