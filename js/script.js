//Гамбургер меню!!!
const drop = document.querySelector('.drop');
const menuIcon = document.querySelector('.menu-icon');
const crosDrop = document.querySelector('.cros--drop');
const body = document.querySelector('body');


menuIcon.addEventListener('click', function (e) {
    drop.style.display = 'block';
});

crosDrop.addEventListener('click', function (e) {
    drop.style.display = 'none';
    drop.classList.add('drop--down');
});



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
    menuItemLength = menuItem.length;

menu.addEventListener('click', function (e) {
    for (let i = 0; i < menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
    }
}

);

for (let i = 0; i < menuItemLength; i++) {
    menuItem[i].addEventListener('click', function (e) {
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