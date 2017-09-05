# gulp-project
Fast and effective environment for frontend development

## HTML
* автоматическая компиляция Pug (Jade) -> HTML

## IMG
* автоматическая оптимизация изображений без потерь качества

## CSS
* современный сброс стилей от postcss-css-reset (на основе normalize.css)
* автоматическая компиляция PreCSS в CSS
* автоматическое проставление вендорных префиксов (команды для разных браузеров)
* автоматическая сборка спрайтов (sprite.svg + sprite.png) на основе файла стилей, подстановка размеров изображений в соответствующие css правила
* объединение @media правил и минификация кода (build) 

## JS
* использование современного ECMAScript (Babel)
* оптимизация и минификация как собственных скриптов, так и js/css файлов сторонних вендоров (build)

## Сервер
* запуск приложения на локальном сервере с доступным другим устройствам IP-адресом (для тестов с других ЭВМ)
* при любом измении файла - автоматическая перезагрузка сервером вкладок браузера с разрабатываемым приложением   

## Рекомендуемый порядок действий
* установить yarn (https://yarnpkg.com/en/) - современный аналог npm и Bower от Google и Facebook
* открыть терминал в папке проекта, выполнить yarn install
* для старта проекта (с отслеживанием изменений в реальном времени) ввести gulp
* для получения минимизированной prodaction версии gulp build

## Нюансы
* приложение разбито на "Страницы" (файлы первого уровня в frontend/{html,css,js} и "Компоненты" (логические блоки: header, footer, head, slider/type1, slider/type2..)
* для максимальной скорости перекомпиляции при изменениях файлов (в особенности - CSS), за раз перекомпилируется лишь 1 "Страница" 
* так как автоматическая компиляция при любом изменении файлов всех "Страниц" может занимать от 5 секунд, вручную указываем страницу, которую нужно "пересобрать" - после внесения изменений в компонент необходимо пересохранить соответствующий файл тестируемой в данный момент страницы (поправили slider/type1.scss -> catalog.scss, header.pug -> catalog.pug)

## Размышляю над тем, чтобы
* отказаться от спрайтов в связи с HTTP/2, дублированием нескольких версий 1 изображения ради изменения размера и дольшей компиляцией
* располагать css/js содержимое компонент рядом с непосредственным объявлением html кода компонента (https://habrahabr.ru/company/yandex/blog/336952/.com)  
