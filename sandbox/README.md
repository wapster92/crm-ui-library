### Инструкция
Хотя код из этого раздела не проходит код-ревью, каждый разработчик должен следить за тем, чтобы песочница корректно запускалась. Чтобы избежать конфликтов, каждый новый разработчик должен создать свою страницу. Для этого в папке src/pages необходимо создать компонент страницы и зарегистрировать его в файле src/app/providers/router/routes.ts.

Использование компонентов из библиотеки:

Чтобы использовать компонент из библиотеки, просто импортируйте его на свою страницу следующим образом:

```javascript
import { NameForm } from '@whitelist/wl-ui-library/main.ts';
```

Запустите приложение с помощью команды `npm run dev`, и компонент будет доступен для использования.

Пожалуйста, обратите внимание на то, что изменения в разделе sandbox не следует вносить в систему контроля версий (git). Это поможет избежать конфликтов между разработчиками и облегчит работу в песочнице.