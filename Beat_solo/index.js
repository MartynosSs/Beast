const openBtn = document.querySelector(".burger");
const closeBtn = document.querySelector(".fullscreen-menu__close");
const overLay = document.querySelector(".fullscreen-menu");


openBtn.addEventListener("click", e => {
    e.preventDefault();
    overLay.classList.toggle('active');
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

// Отзывы

const findBlockAllyas = alias => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") == alias
    });
};

$(".reviews-switcher__link").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockAllyas(target);
    const curItem = $this.closest(".reviews-switcher__item");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
})


// Команда 

const openItem = item => {
    const container = item.closest('.team__item');
    const contentBlock = container.find('.team__content');
    const textBlock = contentBlock.find('.team__content-block');
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');
    itemContainer.removeClass('active');

    items.height(0);
}

$('.team__title').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass('active')) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this)
    }
});


// slider

const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const items = document.querySelector('#items');
const computedStyles = getComputedStyle(items);

let currentRight = 0;

rightBtn.addEventListener("click", e => {
    e.preventDefault();
    let currentRight = parseInt(computedStyles.right)

    if (currentRight < 940) {
        items.style.right = `${currentRight + 940}px`;
    } else {
        items.style.right = `${currentRight - 940}px`;
    }

});





leftBtn.addEventListener("click", e => {
    e.preventDefault();
    let currentRight = parseInt(computedStyles.right)

    if (currentRight > 0) {
        items.style.right = `${currentRight - 940}px`;
    } else {
        items.style.right = `${currentRight + 940}px`;
    }

})

/// modal 

