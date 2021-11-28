/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll('.promo__adv img'), 
           poster = document.querySelector('.promo__bg'),
           genre = poster.querySelector('.promo__genre'),
           movielist = document.querySelector('.promo__interactive-list'),
           addForm = document.querySelector('form.add'),
           addInput = addForm.querySelector('.adding__input'), //это класс, поэтому ставим точку перед
           checkBox = addForm.querySelector('[type = "checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); //при нажатии "отправить" страничка не  перезагружается: отменяем стандартное поведение браузера

        let newFilm = addInput.value; //содержится то, что ввел пользователь (addInput)
        const favorite = checkBox.checked; //есть в HTML свойство

        //проверка на непустой ввод и количество символов 
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;  //22 позиция НЕ включается
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); //добавляем в список фильмов (запушить)
            sortArr(movieDB.movies);  //сортировка
    
            createMovieList(movieDB.movies, movielist);
        }
        event.target.reset(); //сбросить форму методом reset

    });    

    
    const deleteAdv = (arr) => {
        arr.forEach(item => {  
            item.remove();
        });
    };

    

    const makeChanges = () => {
        genre.textContent = 'Драма';
        
        poster.style.backgroundImage = 'url("img/bg.jpg")'; //путь к новой картинке
    };
    
    
    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) { //аргументы - какой родительский блок на странице будет использовать эти фильмы
        parent.innerHTML = "";
        sortArr(films); //сортировка по алфавиту

        films.forEach((film, i) => {
            //в родительский элемент помещаем новые фильмы
            parent.innerHTML += `  
            <li class="promo__interactive-item">${i + 1}. ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        //вешаем обработчик событий на каждую их корзинок. Корзина CSS
        //при клике на корзине удаляем РОДИТЕЛЯ корзины
        //удаленный фильм вырезаем из базы данных методом splice

        //получаем все корзины и перебираем через forEach
        //btn, i - это каждая отдельная корзина и нумерация
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); //обращение к родительскому элементу и удаление со страницы
                movieDB.movies.splice(i, 1); //splice - метод, который вырезает определенный элемент c аргументами
                createMovieList(films, parent);  //рекурсия для перенумерации строк в списке фильмов
            });
        });


    }

    //соединяем рабочую логику здесь

    deleteAdv(adv); //удаление рекламы справа
    makeChanges(); //замена фона и наименования фильма
    //sortArr(movieDB.movies); //сортировка по алфавиту списка фильмов
    createMovieList(movieDB.movies, movielist); //добавление элемента (нового фильма) в массив 
    

});