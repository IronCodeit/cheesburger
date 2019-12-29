const menu = document.querySelector('.menu'),
    menuItem = document.querySelector('.menu__item'),
    menuItemLength = menuItem.length;

//menu.addEventListener('click', e => { });
//по клику в любую область меню нам нужно закрыть наш активный эл-т, а именно у конкретного item удалить активный класс.

menu.addEventListener('click', function (e) {
    for (let i = 0; i < menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
    }
});

for (let i = 0; i < menuItemLength; i++) {
    menuItem[i].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (menuItem[i].classList.contains('menu__item--active')) {
            menuItem[i].classList.remove('menu__item--active');
        } else {
            menuItem[i].classList.add('menu__item--active');
        }
    });
}
