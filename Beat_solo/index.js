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

const openItems = item => {
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
        openItems($this)
    }
});


// slider

const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const citems = document.querySelector('#items');
const computedStyles = getComputedStyle(citems);

let currentRight = 0;

rightBtn.addEventListener("click", e => {
    e.preventDefault();
    let currentRight = parseInt(computedStyles.right)

    if (currentRight < 940) {
        citems.style.right = `${currentRight + 940}px`;
    } else {
        citems.style.right = `${currentRight - 940}px`;
    }

});





leftBtn.addEventListener("click", e => {
    e.preventDefault();
    let currentRight = parseInt(computedStyles.right)

    if (currentRight > 0) {
        citems.style.right = `${currentRight - 940}px`;
    } else {
        citems.style.right = `${currentRight + 940}px`;
    }

})

/// player 

const playBtn = document.querySelector(".video__player-img");
const playerPlayBtn = document.querySelector(".duration__img");
const video = document.getElementById("player");
const durationControl = document.getElementById("durationlevel");
const soundControl = document.getElementById("miclevel");
const soundBtn = document.getElementById("soundbtn");
const dynamicBtn = document.getElementById("dynamic");
let intervalID;
let soundLevel;


window.addEventListener("load", function () {
    video.addEventListener("click", playStop);

    let playButtons = this.document.querySelectorAll(".play");

    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener("click", playStop);
    }

    durationControl.min = 0;
    durationControl.value = 0;
    durationControl.max = video.duration;
    durationControl.addEventListener("input", setVideoDuration);

    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;
    soundControl.addEventListener("input", changeSoundVolume);
    dynamicBtn.addEventListener("click", soundOf);


    video.addEventListener('ended', () => {
        playBtn.classList.toggle("video__player-img--active");
        playerPlayBtn.classList.remove("active");
        video.currentTime = 0;
    })



});


function playStop() {
    playBtn.classList.toggle("video__player-img--active");
    playerPlayBtn.classList.toggle("active");

    if (video.paused) {
        video.play();
        intervalID = setInterval(updateDuration, 1000 / 60);
    } else {
        clearInterval(intervalID);
        video.pause();
    }
}



function setVideoDuration() {
    video.currentTime = durationControl.value;

    updateDuration();
}


function updateDuration() {
    durationControl.value = video.currentTime;
    let step = video.duration / 35;
    let percent = video.currentTime / step;
    durationControl.style.background = `Linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #333333 ${percent}%)`;
}

function changeSoundVolume() {
    video.volume = soundControl.value / 10;

    if (video.volume === 0) {
        soundBtn.classList.add("active");
    } else {
        soundBtn.classList.remove("active");
    }
}

function soundOf() {
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
        soundBtn.classList.remove("active");
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
        soundBtn.classList.add("active");
    }
}

///ops 

const sections = $("section");
const display = $(".maincontent");

let inScroll = false;


sections.first().addClass("active");

const performTransition = (sectionEq) => {
    if (inScroll === false) {
        inScroll = true;
        const position = sectionEq * -100;


        display.css({
            transform: `translateY(${position}%)`

        })

        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

        setTimeout(() => {
            inScroll = false;
        }, 1300);
    }


};

const scrollViewPort = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length) {
        performTransition(nextSection.index())
    }

    if (direction === "prev" && prevSection.length) {
        performTransition(prevSection.index())
    }

}


$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewPort("next");
    }

    if (deltaY < 0) {
        scrollViewPort("prev");
    }

})