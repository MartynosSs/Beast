const openBtn = document.querySelector(".burger");
const closeBtn = document.querySelector(".fullscreen-menu__close");
const overLay = document.querySelector(".fullscreen-menu");
const body = document.body;


openBtn.addEventListener("click", e => {
    e.preventDefault();
    overLay.classList.toggle('active');
    body.classList.toggle('locked');
});

closeBtn.addEventListener("click", e => {
    e.preventDefault();
    overLay.classList.toggle('active');
});

overLay.addEventListener("click", e => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('menu__link')) {
        overLay.classList.remove('active');
    }
});