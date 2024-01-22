# Начало работы

Перед тем как приступить к работе, учтите, что проект состоит из двух частей: library - здесь находится код библиотеки, и sandbox - это специальное пространство для тестирования и разработки компонентов. Не забудьте ознакомиться с файлами README в каждом из этих разделов, прежде чем начать разработку.


## Требования

Для работы с проектом требуется Node.js v18.13.0 и npm v8.19.3. Рекомендуется использовать
[nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) для управления версиями Node.js.
**Не используйте другие менеджеры пакетов!**

### Установка

1. Установите nvm, следуя инструкциям в
   [официальном репозитории nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

2. Установите необходимую версию Node.js, выполнив следующую команду:

```bash
nvm install 18.13.0
```

3. Установите установленную версию Node.js как версию по умолчанию:

```bash
nvm alias default 18.13.0
```

4. Установите требуемую версию npm:

```bash
npm install -g npm@8.19.3
```

## Гайд для работы с git

Git - это система контроля версий, которая позволяет разработчикам управлять изменениями в исходном коде и работать совместно над проектами. Вот несколько основных команд и понятий, которые вам необходимо знать, чтобы начать работу с Git:

1. **Клонирование репозитория**: Чтобы получить копию удаленного репозитория на свой локальный компьютер, используйте команду `git clone <URL-репозитория>`.

2. **Создание ветки**: Вместо работы непосредственно в основной ветке проекта (обычно `master`), создайте новую ветку для каждой задачи или функции, над которой вы работаете. Используйте команду `git checkout -b <имя-ветки>` для создания и переключения на новую ветку.

3. **Добавление изменений**: После внесения изменений в файлы добавьте их в индекс Git с помощью команды `git add <файл>` или `git add .` для добавления всех измененных файлов.

4. **Фиксация изменений**: Зафиксируйте изменения с описательным сообщением с помощью команды `git commit -m "Описание изменений"`.

5. **Загрузка изменений**: Загрузите изменения в удаленный репозиторий с помощью команды `git push origin <имя-ветки>`.

6. **Обновление вашей ветки**: Чтобы обновить вашу ветку с последними изменениями из основной ветки, используйте команду `git rebase <основная-ветка>`.

   **Важно**: Использование `git rebase` может привести к конфликтам, которые нужно будет разрешить. Во время процесса `rebase`, Git укажет на конфликты, и вам нужно будет их исправить вручную. После исправления конфликтов, используйте `git add <файл>` для добавления исправленных файлов, а затем продолжите процесс `rebase` с помощью команды `git rebase --continue`.

7. **Слияние изменений**: После того, как задача или функция завершена, создайте merge request (MR) в интерфейсе GitLab для слияния изменений из вашей ветки в основную ветку (master). Убедитесь, что ваш код прошел ревью и тестирование, прежде чем сливать изменения.

8. **Обновление рабочей ветки**: Перед созданием MR, обновите свою рабочую ветку с последними изменениями из основной ветки (master). Для этого выполните следующие команды:

   ```
   git checkout master
   git pull origin master
   git checkout <имя-рабочей-ветки>
   git rebase master
   ```

   Разрешите возможные конфликты и отправьте изменения с помощью `git push -f`.

9. **Ревью кода**: Прежде чем сливать MR, убедитесь, что ваш код был проверен другими разработчиками. Ревью кода помогает улучшить качество кода, находить ошибки и делиться знаниями между членами команды.

10. **Удаление веток**: После успешного слияния MR в основную ветку (master), вам необходимо удалить свою рабочую ветку. В интерфейсе GitLab можно выбрать опцию удаления ветки после слияния. Чтобы удалить локальную ветку, используйте команду `git branch -d <имя-ветки>`.

11. **Обновление локальной копии**: После слияния изменений в основную ветку (master), обновите свою локальную копию проекта, выполнив команду `git pull origin master`.

Следуя этим шагам и рекомендациям, вы сможете эффективно использовать Git для совместной работы над проектами и поддержания качества кода.


## Подключение линтеров на проектах из библиотеки (к прочтению не обязательно)

Библиотека `@whitelist/wl-fluent-library`,  включает файлы `.eslintrc.base.cjs`, , `tsconfig.base.json` расположенные `node_modules`.


### Подключение tsconfig к проекту

Чтобы импортировать и использовать `tsconfig.base.json` в проектах, нужно добавить следующий код в свой `tsconfig.json`:

```json
{
  "extends": "./node_modules/@whitelist/wl-fluent-library/tsconfig.base.json"
}
```
### Подключение ESLint конфигурации к проекту

В вашем `.eslintrc.cjs` или `.eslintrc.js` файле добавьте следующий код:

```javascript

module.exports = {
    extends: ['./node_modules/@whitelist/wl-fluent-library/.eslintrc.base.cjs', /* ... остальные расширения */],
    root: true,
    env: {
        node: true
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']], // Обновите путь к папке src, если он отличается
                extensions: ['.js', '.ts', '.vue']
            }
        }
    }
};
```

```bash
### Установите слудующие зависимости

npm i --save-dev eslint \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
eslint-plugin-vue \
eslint-plugin-prettier \
eslint-config-prettier

```

### Подключение Stylelint конфигурации к проекту

В вашем `.stylelintrc.cjs` или `.stylelintrc.js` файле добавьте следующий код:

```javascript

module.exports = {
    extends: ['./node_modules/@whitelist/wl-fluent-library/.stylelintrc.base.cjs', /* ... остальные расширения */],
};
```
```bash
### Установите слудующие зависимости

npm i --save-dev --dev stylelint \
stylelint-config-standard-scss \
stylelint-config-recommended-vue \
stylelint-config-prettier-scss \
stylelint-config-idiomatic-order \
stylelint-config-prettier \
stylelint-config-rational-order \
stylelint-config-standard \
stylelint-order \
stylelint-prettier \
stylelint-scss
```

### Подключение Prettier конфигурации к проекту

В вашем `.prettierrc.cjs` или `.prettierrc.js` файле добавьте следующий код:

```javascript

module.exports = {
   ...require('./node_modules/@whitelist/wl-fluent-library/prettierrc.base.cjs')
  // ... ваш собственный список настроек, если требуется
};
````

```bash
### Установите слудующие зависимости

npm i --save-dev prettier
```
(Редми дополняется)