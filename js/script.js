const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    menuItemLength = menuItem.length;

menu.addEventListener('click', function (e) {
    for (let i = 0; i < menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
    }
});

//menuItemLength - длина массива menuItem.
//вместо i < menuItemLength можно написать i < menuItem.length, но в таком случае при работе с большими данными если делать цикл по 3 000 000 записей через for, то он будет работать медленно, т.к. будет пересчитывать длину на каждой итерации цикла
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

//menu.addEventListener('click', e => { });
//по клику в любую область меню нам нужно закрыть наш активный эл-т, а именно у конкретного item удалить активный класс.


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


//Слайдер
/* const btnRight = document.querySelector('.burgers__scroll--btn-right'),
    burgersSlide = document.querySelector('.burgers__slide'),
    burgersSlideLength = burgersSlide.length;

btnRight.addEventListener('click', function (e) {
    e.preventDefault();

    if (burgersSlide[i].classList.contains('burgers__slide--active')) {
        burgersSlide[i].style.display = 'block';
    } else {
        for (let i = 0; i < menuItemLength; i++) {
            burgersSlide[i].style.display = 'none';
        }
    }
}); */