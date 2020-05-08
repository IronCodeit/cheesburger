//Гамбургер меню!!!
const drop = document.querySelector('.drop');
const menuIcon = document.querySelector('.menu-icon');
const crosDrop = document.querySelector('.cros--drop');
const body = document.querySelector('body');


menuIcon.addEventListener('click', function (e) {
    drop.style.display = 'block';
    body.style.overflow = 'hidden';
    body.classList.remove('drop--down');
}

);

crosDrop.addEventListener('click', function (e) {
    drop.style.display = 'none';
    body.style.overflow = 'visible';
    body.classList.add('drop--down');
}

);



//Вертикальный аккордион.
const teamContent = document.querySelector('.team-content');
const teamItem = document.querySelectorAll('.team__item');
const teamItemLength = teamItem.length;

teamContent.addEventListener('click', function (e) {
    for (let i = 0; i < teamItemLength; i++) {
        teamItem[i].classList.remove('team__item--active');
    }
}

);

for (let i = 0; i < teamItemLength; i++) {
    teamItem[i].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (teamItem[i].classList.contains('team__item--active')) {
            teamItem[i].classList.remove('team__item--active');
        }

        else {
            for (let i = 0; i < teamItemLength; i++) {
                teamItem[i].classList.remove('team__item--active');
            }

            teamItem[i].classList.add('team__item--active');
        }
    }

    );
}



//Горизонтальный аккордион.
const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    //Если бы мы не указали бы All, то обратились бы только к первому .menu__item из всех.
    menuItemLength = menuItem.length;

menu.addEventListener('click', e => {
    for (let i = 0; i < menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
    }
}

);

for (let i = 0; i < menuItemLength; i++) {
    menuItem[i].addEventListener('click', e => {
        //когда мы кликаем на menuItem[i] - у нас происходит всплытие нашего события.
        e.preventDefault();
        e.stopPropagation(); //Отменяет всплытие(применяем потому что на menu навешено событие, к-е удаляет класс и когда всплытие дойдёт до section.menu )

        if (menuItem[i].classList.contains('menu__item--active')) {
            menuItem[i].classList.remove('menu__item--active');
        }

        else {
            for (let i = 0; i < menuItemLength; i++) {
                menuItem[i].classList.remove('menu__item--active');
            }

            //если я не напишу этот цикл тут, то при клике на лишки одновременно откроются оба элемента.
            menuItem[i].classList.add('menu__item--active');
        }
    }

    );
}

//menuItemLength - длина массива menuItem.
//вместо i < menuItemLength можно написать i < menuItem.length, но в таком случае при работе с большими данными если делать цикл по 3 000 000 записей через for, то он будет работать медленно, т.к. будет пересчитывать длину на каждой итерации цикла
//menu.addEventListener('click', e => { });
//по клику в любую область меню нам нужно закрыть наш активный эл-т, а именно у конкретного item удалить активный класс.



//Слайдер
const left = document.querySelector(".burgers__scroll--btn-left"),
    right = document.querySelector(".burgers__scroll--btn-right"),
    burgersContent = document.querySelector(".burgers__content");

right.addEventListener('click', e => {
    loop("right", e);

    const activeEl = document.querySelector('.burgers__slide--active');

    if (activeEl.nextElementSibling) {
        activeEl.nextElementSibling.classList.add('burgers__slide--active');
        activeEl.classList.remove('burgers__slide--active');
    }
}

);

left.addEventListener('click', e => {
    loop("left", e);

    const activeEl = document.querySelector('.burgers__slide--active');

    if (activeEl.previousElementSibling) {
        activeEl.previousElementSibling.classList.add('burgers__slide--active');
        activeEl.classList.remove('burgers__slide--active');
    }
}

);

function loop(direction, e) {
    e.preventDefault();

    if (direction === "right") {
        burgersContent.appendChild(burgersContent.firstElementChild);
    }

    else {
        burgersContent.insertBefore(burgersContent.lastElementChild, burgersContent.firstElementChild);
    }
}



//Оverlay.
const faces = document.querySelector('.face__list'),
    overlay = document.querySelector('.overlay'),
    popupText = document.querySelector('.popup__text');

faces.addEventListener('click', e => {
    let elem = e.target;
    console.log(elem.tagName);

    if (elem.tagName === 'BUTTON') {
        let modalText = elem.previousElementSibling.innerHTML;
        popupText.innerHTML = modalText;
        popupText.style.boxShadow = "10px 10px 50px white";
        overlay.style.display = 'block';
        body.style.overflow = 'hidden';
    }
});

document.addEventListener('keyup', e => {
    console.log(e.key);
    let keyName = e.key;

    if (keyName === 'Escape') {
        overlay.style.display = 'none';
        body.style.overflow = 'visible';
    }
});

const closeElement = overlay.querySelector(".close");

closeElement.addEventListener("click", e => {
    e.preventDefault();
    overlay.style.display = "none";
    body.style.overflow = 'visible';
});



//Форма
const formBlock = document.querySelector('#form-block'),
    btnIn = document.querySelector('#btn-in');

btnIn.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(formBlock)) {
        let formData = new FormData();
        formData.append('name', formBlock.elements.name.value);
        formData.append('name', formBlock.elements.phone.value);
        formData.append('name', formBlock.elements.comment.value);
        formData.append('to', 'e: mail: maluda223@gmail.com');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);

        xhr.addEventListener('load', () => {
            if (xhr.response) {
                alert('Отправка удалась');
            } else {
                alert('Произошла ошибка');
            }
        });
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }

    if (!validateField(form.elements.phone)) {
        valid = false;
    }

    if (!validateField(form.elements.comment)) {
        valid = false;
    }

    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
}

//Метод send ещё выполняет ф-ию отправки конкретных(указанных) данных.
//Перед тем, как отправлять данные на сервер получим данные в формате JSON.
//GET - получать данные с сервера.
//POST - отправлять данные на сервер.


//Обработка input.
let inputs = document.querySelectorAll('input[data-rule]');

for (let input of inputs) {
    input.addEventListener('keydown', function (e) {
        let check;

        if (event.key >= 0 || event.key >= 9 || event.key === 'Backspace' || event.key === 'Delete') {
            check = true;
        }

        if (!check) {
            e.preventDefault();
        }
    });
}

//////////////////////////////////////////////////////////////////
const sections = $(".section");
const display = $(".maincontent");

let inScroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const countSectionPosition = (sectionEq) => {

    const position = sectionEq * -100;
    if (isNaN(position))
        console.error("передано не верное значение в countSectionPositon");

    return position;
};

const resetActiveClass = (item, eq) => {
    item
        .eq(eq)
        .addClass("active")
        .siblings()
        .removeClass("active");
};

const performTransition = (sectionEq) => {
    if (inScroll) return;

    inScroll = true;

    const position = countSectionPosition(sectionEq);
    const trasitionOver = 1000;
    const mouseInertionOver = 300;

    resetActiveClass(sections, sectionEq);

    display.css({
        transform: `translateY(${position}%)`
    });

    setTimeout(() => {
        resetActiveClass($(".scroll-menu__item"), sectionEq);
        inScroll = false;

        $('.scroll-menu__item')
            .eq(sectionEq)
            .addClass("scroll-menu__item--active")
            .siblings()
            .removeClass("scroll-menu__item--active");

    }, trasitionOver + mouseInertionOver);
};

const scroller = () => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        }
    };
};

$(window).on("wheel", (e) => {
    const deltaY = e.originalEvent.deltaY;
    const windowScroller = scroller();

    if (deltaY > 0) {
        windowScroller.next();
    }

    if (deltaY < 0) {
        windowScroller.prev();
    }
});

$(document).on("keydown", (e) => {
    const tagName = e.target.tagName.toLowerCase();
    const windowScroller = scroller();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    switch (e.keyCode) {
        case 38:
            windowScroller.prev();
            break;
        case 40:
            windowScroller.next();
            break;
    }
});

$('[data-scroll-to]').on("click", e => {

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");

    performTransition(target);
});

if (isMobile) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe({
        swipe: (event, direction) => {
            let scrollDirection;
            const windowScroller = scroller();

            if (direction === "up") scrollDirection = "next";
            if (direction === "down") scrollDirection = "prev";

            windowScroller[scrollDirection]();
        },
    });
}





/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//Работа видеоплеера на HTML Audio/Video API 

/*Получение элементов плеера */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const mute = player.querySelector('.mute');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const range = player.querySelector('.player__slider');
let isMuted = 'false';

/* Построение функций */
function togglePlay() {

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    };
}
function updateButton() {
    const icon = this.paused;
    if (icon) {
        toggle.innerHTML = '<svg class="play-pic"><use xlink:href="../img/sprite.svg#play"></use></svg>';
    } else {
        toggle.innerHTML = '<img src="../img/pause.png" style="height:1.5rem; width:1.5rem">';
        // toggle.innerHTML = '<svg class="play-pic"><use xlink:href="./img/icons/sprite.svg#pause"></use></svg>'; 
    }
    // console.log('Update the button');
    // console.log(icon);
}

function handleRangeUpdate(e) {
    // console.log(e.currentTarget.value);
    
    video.volume = this.value / 100;
    if(isMuted) {
        mute.innerHTML = '<svg class="play-pic"><use xlink:href="../img/sprite.svg#volume"></use></svg>';
    } 
    else {
        mute.innerHTML = '<svg class="play-pic"><use xlink:href="../img/sprite.svg#volume"></use></svg>';
    }
    
    // isMuted = !isMuted;
    console.log(isMuted);
    
    // let currentVolume = e.currentTarget.value;
    // return currentVolume
    // return currentVolume;
    // console.log(this.value);
    // return console.log(this.value);
}

function muteButton() {
    // let muteIcon=this.muted;
    // console.log(muteIcon);
    console.log(isMuted);
    if (!isMuted) {
        mute.innerHTML = '<svg class="play-pic"><use xlink:href="../img/sprite.svg#volume"></use></svg>';
        video.volume = range.value/100; // 
        // video.volume = 1;
    } else {
        mute.innerHTML = '<img src="../img/mute.png" style="height:30px; width:28px">';
        video.volume = 0;
        // toggle.innerHTML = '<svg class="play-pic"><use xlink:href="./img/icons/sprite.svg#pause"></use></svg>'; 
    }
    isMuted = !isMuted;
    // console.log(muteIcon);
}



function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.left = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

/* Построение обработчиков событий */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
mute.addEventListener('click', muteButton);


video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);

range.addEventListener('change', handleRangeUpdate);
// range.addEventListener('mousemove', handleRangeUpdate);

// let mousedown = false
progress.addEventListener('click', scrub);
