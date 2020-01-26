//Гамбургер меню!!!
const drop = document.querySelector('.drop');
const menuIcon = document.querySelector('.menu-icon');
const crosDrop = document.querySelector('.cros--drop');
const body = document.querySelector('body');


menuIcon.addEventListener('click', function (e) {
    drop.style.display = 'block';
    body.style.overflow = 'hidden';
});

crosDrop.addEventListener('click', function (e) {
    drop.style.display = 'none';
    body.style.overflow = 'visible';
});



//Вертикальный аккордион.
const teamContent = document.querySelector('.team-content');
const teamItem = document.querySelectorAll('.team__item');
const teamItemLength = teamItem.length;

teamContent.addEventListener('click', function (e) {
    for (let i = 0; i < teamItemLength; i++) {
        teamItem[i].classList.remove('team__item--active');
    }
});

for (let i = 0; i < teamItemLength; i++) {
    teamItem[i].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (teamItem[i].classList.contains('team__item--active')) {
            teamItem[i].classList.remove('team__item--active');
        } else {
            for (let i = 0; i < teamItemLength; i++) {
                teamItem[i].classList.remove('team__item--active');
            }
            teamItem[i].classList.add('team__item--active');
        }
    });
}



//Горизонтальный аккордион.
const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    menuItemLength = menuItem.length;

menu.addEventListener('click', function (e) {
    for (let i = 0; i < menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
    }
});

for (let i = 0; i < menuItemLength; i++) {
    menuItem[i].addEventListener('click', function (e) {//когда мы кликаем на menuItem[i] - у нас происходит всплытие нашего события.
        e.preventDefault();
        e.stopPropagation();//Отменяет всплытие(применяем потому что на menu навешено событие, к-е удаляет класс и когда всплытие дойдёт до section.menu )

        if (menuItem[i].classList.contains('menu__item--active')) {
            menuItem[i].classList.remove('menu__item--active');
        } else {
            for (let i = 0; i < menuItemLength; i++) {
                menuItem[i].classList.remove('menu__item--active');
            }//если я не напишу этот цикл тут, то при клике на лишки одновременно откроются оба элемента.
            menuItem[i].classList.add('menu__item--active');
        }
    });
}
//menuItemLength - длина массива menuItem.
//вместо i < menuItemLength можно написать i < menuItem.length, но в таком случае при работе с большими данными если делать цикл по 3 000 000 записей через for, то он будет работать медленно, т.к. будет пересчитывать длину на каждой итерации цикла
//menu.addEventListener('click', e => { });
//по клику в любую область меню нам нужно закрыть наш активный эл-т, а именно у конкретного item удалить активный класс.



//Слайдер
//1 способ реал-ии слайдера
const left = document.querySelector(".burgers__scroll--btn-left");
const right = document.querySelector(".burgers__scroll--btn-right");
const burgersContent = document.querySelector(".burgers__content");
const computed = getComputedStyle(burgersContent);
const burgersSlide = document.querySelector(".burgers__slide");
const burgersSlideLength = burgersSlide.length;

//console.log(computed.right);

for (let i = 0; i < burgersSlideLength; i++) {
    right.addEventListener('click', function (e) {//когда мы кликаем на menuItem[i] - у нас происходит всплытие нашего события.
        e.preventDefault();
        e.stopPropagation();//Отменяет всплытие(применяем потому что на menu навешено событие, к-е удаляет класс и когда всплытие дойдёт до section.menu )

        if (burgersSlide[i].classList.contains('burgers__slide--active')) {
            burgersSlide[i].classList.remove('burgers__slide--active');
        } else {
            for (let i = 0; i < burgersSlideLength; i++) {
                burgersSlide[i].classList.remove('burgers__slide--active');
            }//если я не напишу этот цикл тут, то при клике на лишки одновременно откроются оба элемента.
            burgersSlide[i].classList.add('burgers__slide--active');
        }
    });

    left.addEventListener('click', function (e) {//когда мы кликаем на menuItem[i] - у нас происходит всплытие нашего события.
        e.preventDefault();
        e.stopPropagation();//Отменяет всплытие(применяем потому что на menu навешено событие, к-е удаляет класс и когда всплытие дойдёт до section.menu )

        if (burgersSlide[i].classList.contains('burgers__slide--active')) {
            burgersSlide[i].classList.remove('burgers__slide--active');
        } else {
            for (let i = 0; i < burgersSlideLength; i++) {
                burgersSlide[i].classList.remove('burgers__slide--active');
            }//если я не напишу этот цикл тут, то при клике на лишки одновременно откроются оба элемента.
            burgersSlide[i].classList.add('burgers__slide--active');
        }
    });

}

right.addEventListener('click', function (event) {
    event.preventDefault();
    let currentRight = parseInt(computed.right);//Текущ. знач. css св-ва right прогоняем ч/з parseInt и получаем число.
    if (!currentRight) {
        currentRight = 0;
    }
    if (currentRight < 848) {
        burgersContent.style.right = currentRight + 848 + "px";
    }
    //Это условие необх-0 для того, чтобы огранич-ь максимальные координаты нашего эл-та.
});

left.addEventListener('click', function (event) {
    event.preventDefault();
    let currentRight = parseInt(computed.right);

    if (!currentRight) {
        currentRight = 0;
    }

    if (currentRight > 0) {
        burgersContent.style.right = currentRight - 848 + "px";// - это аналог items.style.right = ${currentRight - 100}px;
    }
});
//getComputedStyle - переводит все в числа.
//!currentRight - проверка, не обязательная. Т.е. если в !currentRight что-то не похожее на число, то мы в currentRight записываем 0.
//В совр-х брауз-х можно обойтись и без проверки.
