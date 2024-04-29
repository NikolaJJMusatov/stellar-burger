# Проектная работа 12-го спринта

Проект представляет из себя веб-приложение магазин по заказу космических бургеров. При посещении приложения пользователь может просматривать
ленту заказов и список ингредиентов из которых может собрать бургер. Оформление заказа доступно только авторизованным пользователям. Приложение позволяет зарегистрировать пользователя, которому станет доступен личный кабинет с возможностью редактирования данных своего
профиля и просмотра истории своих заказов.
Проект выполнен в рамках учебного курса **Яндекс Практикум**.

Стек технологий: HTML, CSS, TS, React, Redux, Webpack.

## В ходе работы были выполнены следующие задачи:
1. Реализовано глобальное состояние средствами библиотеки **Redux**;
2. Настроен роутинг (данные пользователя защищены безопасными роутами);
3. Интерфейс приложения подключен к **API**;
4. Выстроена логика получения/отправки запросов на сервер;
5. Настроены запросы авторизации пользователя
6. Написаны тесты на Cypress и Jest, проверяющие функциональность приложения.

### Запуск проекта:
npm run start

### Запуск тестов Jest:
npm run test

### Запуск тестов Cypress:
npm run cypress:open
