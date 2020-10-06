### Task

Для задачи испольльзовать next+react+material-ui
1) Реализовать дизайн как показано вот здесь https://www.figma.com/file/JMtlCyH30D3Q8jeDXD6cuU/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5?node-id=0%3A1
2) Добавить валидацию ФИО, телефона и email
3) После сохранения записывать все данные в Local Storage
4) При сохранение сделать POST запрос с сервера на http://jsonplaceholder.typicode.com/posts c заголовком Content-Type: application/json и x-token-access: random, а в теле передать все данные из формы. В Network не должно быть видно запроса на конечный URL.

### How to run

Development server

```
npm run dev
```

Production build and server run

```
npm run build
npm run start
```