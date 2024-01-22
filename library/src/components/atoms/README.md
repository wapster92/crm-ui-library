# Атомы

Атомы являются самыми маленькими строительными блоками нашей UI-библиотеки. Они представляют собой базовые HTML-элементы
с пользовательской стилизацией и объединяются для создания более сложных компонентов (молекул и организмов). Атомы
должны быть простыми, многоразовыми и иметь одну ответственность.

## Доступные атомы

- `input`: Настраиваемое поле ввода для текста, числа, пароля и т. д.
- `button`: Многоразовый компонент кнопки с пользовательской стилизацией.
- `blockquote`: Стилизованный элемент blockquote для цитирования текста.
- `icon`: Иконки для описания функций, подсказок и т. д., обычно представлены в виде SVG или шрифтовых иконок.
- `badge`: Маленькие компоненты, обычно отображающие количество или статус, прикрепленные к другим элементам.
- `tooltip`: Всплывающая подсказка, появляющаяся при наведении курсора на элемент, отображает краткую информацию или
  описание.
- `spinner`: Индикатор загрузки, обычно используется для отображения статуса выполнения длительных процессов.
- `progress-bar`: Горизонтальный индикатор выполнения, отображающий процент выполнения задачи.
- `avatar`: Изображение, обычно фотография пользователя, используется для представления учетной записи пользователя.
- `switch`: Компонент переключателя, обычно используется для переключения состояний включено/выключено.

## Внесение изменений

Чтобы добавить новый атом в библиотеку, создайте новый компонент Vue в папке atoms, следуя соглашениям об именовании и
структуре существующих атомов. Убедитесь, что вы документировали его использование и параметры настройки.