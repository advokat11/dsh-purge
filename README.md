<div align="center">

# dsh-purge Community

**Пусть AI сосредоточеннее помогает вашей учёбе и практическим экспериментам.**

Самоконтролируемая надстройка для DeepSeek Harness (в обиходе — плагин «снятие брони») · 80 патчей хоста · 25 уровней самопроверки состояния · полноэкранные настройки в левой панели

[![Release](https://img.shields.io/github/v/release/kingcharleslzy-ai/dsh-purge?label=release)](https://github.com/kingcharleslzy-ai/dsh-purge/releases)
[![Checks](https://github.com/kingcharleslzy-ai/dsh-purge/actions/workflows/community.yml/badge.svg)](https://github.com/kingcharleslzy-ai/dsh-purge/actions/workflows/community.yml)

Текущая версия **1.6.60** · совместимость с **DSH Desktop 0.2.1-rc.3** (rc.1 / rc.2 тоже проходят) · [English](docs/README.en.md)

1.6.56 устраняет подвисания страницы состояния и не кэширует устаревшие данные хоста; ошибка чтения больше не выдаётся за «не установлено», исправлен контраст кнопок в тёмной теме. [Примечания к выпуску](docs/releases/1.6.56.md) · [Установка из маркетплейса и миграция](docs/MARKET-MIGRATION.md).

**Оригинальный проект и автор**: поддерживается независимо на основе [dsh-purge от Сяо Яна / YuJunZhiXue](https://github.com/YuJunZhiXue/dsh-purge). Исходный репозиторий восстановлен; указание авторства, копирайт и лицензия MIT сохранены. Community-версия поддерживается этим репозиторием и не является официальным релизом оригинального автора.

</div>

---

## В паре: генерация картинок на своей машине (Qwen Studio)

После снятия брони самое очевидное применение — перенести «генерацию картинок» на свою машину: без веб-сайтов, без подписки, без отправки промптов на чужие серверы.

Парный плагин **Qwen Studio** (`dsh-qwen-studio`) подключает Qwen Image 2.1 к DSH:

- **Apple Silicon Mac**: локальный инференс на MLX / MFLUX, модель загружается по требованию и выгружается в простое;
- **Windows / Linux + NVIDIA**: подключение к вашему собственному GPU-шлюзу (ComfyUI или протокол vLLM-Omni), а также запуск по требованию через SSH;
- поддерживается редактирование по референсу (смена стиля и материалов по картинке), LoRA, ControlNet, маски, готовые наборы пресетов, галерея и пакетные задачи;
- после установки достаточно сказать в сессии «нарисуй…» или «сделай из этого акварель» — агент вызывает `qwen_generate_image` и возвращает картинку в диалог.

**Совместный эффект**: снятие брони избавляет агента от бесконечных уточнений «рисовать ли», а плагин генерации действительно рисует — и всё это на вашей машине.

**Репозиторий**: [kingcharleslzy-ai/dsh-qwen-studio](https://github.com/kingcharleslzy-ai/dsh-qwen-studio) · **Загрузка**: [последние Releases](https://github.com/kingcharleslzy-ai/dsh-qwen-studio/releases/latest) · **Установка и проверка железа**: [docs/SETUP.md](https://github.com/kingcharleslzy-ai/dsh-qwen-studio/blob/main/docs/SETUP.md) (сначала посмотрите, «потянет ли эта машина», потом беритесь)

## Что это

dsh-purge Community — надстройка к Harness, работающая на вашей собственной машине. Она собирает в одном месте то, что в повседневной работе съедает больше всего внимания:

- **Видно состояние**: готова ли установка, патчи и инъекция — вывод одной командой или на одном экране панели;
- **Меньше кругов**: повторяющиеся подтверждения и прерывания сводятся к одной настройке;
- **Всегда можно откатиться**: применение, откат и переключатели фиксируются, перед операцией автоматически снимается снимок;
- **Удобно экспериментировать**: промпты, правила и пресеты управляются централизованно, испорченное можно отменить.

Цель проста: **чтобы помощник последовательнее поддерживал вашу учёбу и практические эксперименты**, а не останавливался с вопросом на каждом шаге.

В сообществе его обычно называют плагином «снятие брони» или «режим без ограничений» — имеется в виду, что он снижает трение на уровне взаимодействия и позволяет агенту выполнять задачи непрерывно; он не меняет саму модель и не меняет того, что вы делаете.

### При загрузке пишет `fetch failed`?

Начиная с 1.6.39 автономный установщик показывает этап сбоя и код ошибки, а после ограниченного числа повторов может переключиться на системный curl; в обоих каналах сохраняются проверки источника, сертификата и SHA256. Сначала заново скачайте скрипт установки и запустите dry-run; если ошибка осталась, пришлите обезличенные строки диагностики. См. [разбор проблем с загрузкой](docs/maintenance-issue-52.md). Прокси не меняется и DSH не перезапускается автоматически.

### Пусть разные пресеты сохраняют свои промпты

В 1.6.40 добавлен `excludePresets`: по умолчанию список пуст и поведение прежнее; можно исключить такие пресеты, как `roleplay` и `minimal`, из инъекции промпта Purge, сохранив команды, панель и инструменты. Переключение пресетов, параллельные сессии и дочерние агенты решают это по отдельности, хостовая подстраховка тоже соблюдает исключения. Пример конфигурации, порядок обновления и границы — в [описании исключения по пресетам](docs/maintenance-issue-53.md). Это не отменяет глобальные патчи хоста.

## Принципы дизайна

| Принцип | Смысл |
| --- | --- |
| Локальность прежде всего | Вся логика работает на машине, облачный аккаунт не меняется, промпты и конфигурация никуда не отправляются |
| Наблюдаемость | У каждого действия есть состояние и доказательство, без рассуждений «должно уже работать» |
| Возможность отката | Перед применением / установкой / откатом автоматически снимается снимок, оригинальные файлы и контрольные списки сохраняются |
| Решения остаются за вами | Снижается только трение, ваша цель не меняется; что менять и что включать — подтверждаете вы |

## Область применения

Учёба на своей машине, личные проекты, автоматизационные эксперименты и работы по обслуживанию. Используйте в средах, которыми владеете или на которые у вас есть разрешение; если затрагиваются чужие системы, сначала получите согласие.

## Обновление 1.6.39

Исправлена проблема, когда автономный установщик показывал только `fetch failed`: поэтапная диагностика, ограниченное число повторов и резервная загрузка системным curl при строгой проверке официального источника, сертификата и SHA256. Неудачная загрузка не затрагивает текущую установку. [Примечания к выпуску](docs/releases/1.6.48.md) · [Конфигурация и приёмка](docs/maintenance-issue-52.md)

## Установка

**Плагин ставится через официальный вход DSH; описанный ниже community-установщик поддерживается этим репозиторием и не является официальным скриптом DeepSeek.** При первой установке можно использовать официальный интерфейс или CLI; если `dsh-purge` / старый автономный плагин уже установлен, переносите на месте через community-установщик, не удаляйте его предварительно. Установка, применение патчей хоста и ручной перезапуск — независимые действия.

### Способ 1: официальный интерфейс DSH (первая установка)

1. Сначала откройте DSH и дождитесь инициализации. По текущей официальной документации перейдите в «Плагины», нажмите «Ещё» рядом с «Экспериментальные плагины» и включите «Пользовательский маркетплейс плагинов»; затем откройте «Обзор → Добавить источник индекса».
2. **Community-индекс** этого проекта: `https://kingcharleslzy-ai.github.io/dsh-purge/index.json`.
3. Выберите dsh-purge Community, сверьте источник `kingcharleslzy-ai/dsh-purge` и имя пакета `dsh-purge-community`, затем подтвердите установку.

Интерфейс и протокол установки предоставляет DSH, индекс и плагин поддерживает сообщество. В разных версиях DSH надписи на входе могут отличаться; сторонний `dsh-market` тоже может добавлять свои фильтры и ограничения миграции. Если старый пакет уже есть, используйте способ 3. [Официальное описание маркетплейса](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/plugin-market.zh.md)

### Способ 2: официальный CLI DSH (первая установка)

Команды ниже предназначены для **пользователей CLI/Web, у которых уже установлена команда `dsh` и используется профиль `web`**; выполняйте их в терминале macOS/Linux или в Windows PowerShell. Пользователям десктопной версии лучше воспользоваться интерфейсом выше; не скачивайте через `npx` ещё один хост ради установки плагина.

```sh
dsh plugin --profile web add "https://github.com/kingcharleslzy-ai/dsh-purge/releases/download/v1.6.60/dsh-purge-community-1.6.60.tgz"
```

`web` должен совпадать с фактически запущенным профилем; для нестандартного каталога данных нужно использовать `DSH_HOME` этого экземпляра. Команда использует фиксированный URL версии текущего релиза; это не `npm install -g` и не установка по «голому» имени npm-пакета. Проект распространяется через GitHub-релизы, **не заменяйте на `add dsh-purge` или `add dsh-purge-community`**. Официальная установка через CLI не выполняет дополнительно сравнение SHA256 релиза из нашего установщика и не делает миграционный снимок; если это нужно, выберите способ 3. [Официальная инструкция по установке через CLI](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.zh.md)

### Способ 3: community-установщик (резервные копии, миграция со старой версии, восстановление)

Сначала установите и один раз откройте DSH, чтобы инициализировался фактический профиль. Приведённые команды скачивают **скрипт из этого репозитория**, проверяют его и затем устанавливают; успешный `dry-run` означает лишь, что пройдены предварительные проверки, загрузка и SHA256, но не что пройдены установка зависимостей, миграция или запуск. Прочитайте скачанный скрипт заранее.

#### macOS Desktop

По умолчанию приложение лежит в `/Applications/DeepSeek Harness.app`, каталог данных `~/.dsh`, профиль `desktop`. Выполните оба блока ниже в одном сеансе терминала:

```sh
PURGE_INSTALL_DIR="$(mktemp -d)"
curl -fSL --connect-timeout 20 --max-time 90 "https://raw.githubusercontent.com/kingcharleslzy-ai/dsh-purge/master/scripts/install.sh" -o "$PURGE_INSTALL_DIR/install.sh"
sh "$PURGE_INSTALL_DIR/install.sh" --dry-run
```

После успешной проверки и сверки целевого экземпляра выполните:

```sh
sh "$PURGE_INSTALL_DIR/install.sh"
```

При нестандартном приложении или home сначала задайте `DSH_APP` / `DSH_HOME`; для нестандартного профиля добавляйте `--profile=фактическое_имя` в обе команды. Не копируйте чужие пути. macOS умеет читать настоящее имя исполняемого файла из XML/бинарного plist; при некорректных метаданных работа останавливается и другой bundle не подставляется. Подробнее — [границы поиска](docs/INSTALLATION.md#%E5%BA%94%E7%94%A8%E5%AE%9A%E4%BD%8D%E8%BE%B9%E7%95%8Cpr-78).

#### Windows Desktop · PowerShell 5.1 / 7

Скрипт пытается найти единственный DSH Desktop; home по умолчанию — пользовательский `.dsh`, профиль — `desktop`. Права администратора не требуются; пути с пробелами поддерживаются.

```powershell
$PurgeInstaller = Join-Path $env:TEMP ('purge-install-' + [guid]::NewGuid().ToString('N') + '.ps1')
Invoke-WebRequest -UseBasicParsing -TimeoutSec 90 -Uri 'https://raw.githubusercontent.com/kingcharleslzy-ai/dsh-purge/master/scripts/install.ps1' -OutFile $PurgeInstaller
powershell -NoProfile -ExecutionPolicy Bypass -File "$PurgeInstaller" -DryRun
```

Если код выхода предыдущей команды равен 0 и целевой экземпляр сверен, выполните в том же сеансе PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "$PurgeInstaller"
```

Если приложение не найдено или копий несколько, добавляйте в обе команды `-DshExe 'полный путь к фактическому DeepSeek Harness.exe'`; для нестандартного каталога — `-DshHome`, для профиля — `-Profile`. `ExecutionPolicy Bypass` действует только на этот дочерний процесс и не меняет постоянную политику выполнения; организационные политики всё ещё могут запрещать запуск — в этом случае сообщите об ошибке, не меняя системные политики.

#### Linux · CLI / Web

Сначала установите Node ≥18 и DSH CLI и инициализируйте фактически используемый профиль. Ниже всё начинается с загрузки; предварительный clone этого репозитория не нужен:

```sh
PURGE_INSTALL_DIR="$(mktemp -d)"
curl -fSL --connect-timeout 20 --max-time 90 "https://raw.githubusercontent.com/kingcharleslzy-ai/dsh-purge/master/scripts/install.sh" -o "$PURGE_INSTALL_DIR/install.sh"
sh "$PURGE_INSTALL_DIR/install.sh" --dry-run
```

После успешной проверки выполните в том же терминале `sh "$PURGE_INSTALL_DIR/install.sh"`. По умолчанию используются `node` / `dsh` из PATH и профиль `web`. Для нестандартного экземпляра сохраняйте одинаковые значения `DSH_NODE`, `PURGE_DSH_CLI`, `DSH_HOME`, `--profile=имя` в обоих вызовах.

### Что меняет установка и как это подтвердить

- Community-установщик делает резервную копию перед миграцией, вызывает официальную `dsh plugin --profile … add …` текущего экземпляра, затем сверяет установленную версию и точку входа; промпты, правила, предпочтения обновления и настройки других плагинов сохраняются.
- **Это не «полностью без вмешательства в каталог хоста»**: при распаковке десктопной раскладки отсутствующие или повреждённые ссылки `app/runtime` сохраняются как старые и чинятся на runtime этой установки; при конфликте работа останавливается. Если системный хост в Linux доступен только для чтения, может быть создана пользовательская копия, а после успеха переключён пользовательский лаунчер. Подробнее — [руководство по установке](docs/INSTALLATION.md).
- Если установка из маркетплейса не удалась до загрузки плагина (issue #7), сам плагин ещё не запускался; сначала прочитайте обезличенную ошибку и сверьте источник зависимостей — установщик не обещает исправить любые ошибки маркетплейса или сети.
- Патчи хоста не применяются автоматически, перезапуск не выполняется, прокси не меняется, глобальный npm-реестр не правится, кэш не очищается. Скрипты и bootstrap скачиваются из ветки `master` этого репозитория; для Release-пакета дополнительно проверяется SHA256 — это не независимая проверка подписи скачанного скрипта.
- Ненулевой код выхода команды считается неудачей. После успешной установки записывается `backup_id`, версия на диске сверяется; работающий DSH всё ещё может показывать старую версию — закройте и откройте его вручную, когда будет удобно. Успешный `dry-run`, наличие резервной копии или появившаяся карточка в маркетплейсе не заменяют доказательства успешной установки.
- Для отката сначала используйте «Purge → Состояние → Локальные резервные копии» и выбирайте копию, снятую до этой установки; без интерфейса следуйте [откату через CLI в руководстве по установке](docs/INSTALLATION.md#cli-rollback). Не считайте, что `purge-community` уже добавлен в системный PATH.

Полные шаги выбора экземпляра, отката и восстановления после сбоя — в [руководстве по установке](docs/INSTALLATION.md); агент обязан сначала прочитать [AGENTS.md §12](AGENTS.md#installation).

## Панель

Целая страница в левой панели, без плавающих кнопок:

- сверху одна строка о текущем состоянии, главное действие — «Применить»;
- остальные разделы свёрнуты, пояснения убраны под `?` и раскрываются при необходимости;
- на странице обслуживания видны последние действия, занятое место под резервные копии и предпочтения обновления;
- неиспользуемые входы (например, кнопку отката) можно скрыть — это влияет только на отображение.

## Основные команды

| Команда | Назначение |
| --- | --- |
| `purge-community selfcheck [--json]` | Состояние и доказательства по уровням; неприменимые пункты помечаются отдельно |
| `purge-community status` | Пути хоста и счётчики |
| `purge-community host-status` | Только чтение: раскладка установки и текущая точка входа (без смены пакета и перезапуска) |
| `purge-community diagnose` | Диагностика дрейфа якорей: файл, номер строки и варианты нового места |
| `purge-community reanchor …` | Закрепляет подтверждённый новый якорь как локальное переопределение, обратимо |
| `purge-community probe [new]` | Создаёт runtime-пробу и проверяет, что инъекция действительно дошла до модели |
| `purge-community audit [--limit n]` | Журнал последних действий |
| `purge-community boost [on\|off]` | Переключатель хвостового усиливающего блока |
| `purge-community preset [status\|install]` | Установка пресета «режим без ограничений» |
| `purge-community retry [on\|off]` | Переключатель однократного повтора при прерванном ответе |
| `purge-community usage` / `prune` | Занятое место под копии и очистка |
| `purge-community backup` / `rollback <id>` | Снимок / откат плагина |

## Обновление

На странице обслуживания отдельно настраиваются «Автопроверка» и «Автоустановка»; по умолчанию выполняется только проверка, интервал — 6 часов. После установки перезапуск не происходит — когда перезапускать, решаете вы.

## Совместимость

| Компонент | Значение |
| --- | --- |
| Плагин | `dsh-purge-community` 1.6.60 |
| Проверенный хост | DSH Desktop 0.2.1-rc.1 / 0.2.1-rc.2 / 0.2.1-rc.3 |
| Другие хосты | Установка разрешена, самопроверка помечает «не проверено»; начните с `diagnose` |
| Node | ≥18 (встроенного рантайма десктопной версии достаточно) |

## Что делать при проблемах

```sh
purge-community selfcheck --json     # сначала смотрим, какой уровень не ok
purge-community diagnose             # при дрейфе якорей — смотрим варианты нового места
purge-community audit --limit 20     # последние действия
```

Если панель не открывается, сначала убедитесь, что версии совпадают, затем восстанавливайте по [документации по обслуживанию](docs/MAINTENANCE.md); не перезаписывайте `Resources/app` напрямую.

## Разработка и проверка

```sh
npm test                 # модульные и контрактные тесты
npm run check:docs       # согласованность версий и документации
npm run check:client     # соответствие bundle панели и исходников
npm run test:electron    # реальное окружение Electron (временный каталог, установка не меняется)
npm run smoke            # smoke-тест релизного пакета
```

Инструкции для AI-агентов — в [AGENTS.md](AGENTS.md); при расхождении приоритет у него.

**Ключевые слова**: снятие брони · режим без ограничений · unrestricted · prompt injection · jailbreak · плагин DSH · самопроверка состояния · резервные копии и откат

## Участники

Благодарим оригинального автора, контрибьюторов кода и всех, кто помогал воспроизводить проблемы, анализировать и проверять. Ссылки с аватарами ведут прямо на страницы GitHub; конкретный вклад — в [списке вклада](CONTRIBUTORS.md), сторонние источники — в [NOTICE.md](NOTICE.md).

<!-- CONTRIBUTORS:START -->
<table>
  <tr>
    <td align="center" width="120"><a href="https://github.com/YuJunZhiXue"><img src="https://avatars.githubusercontent.com/u/188421097?s=112" width="56" height="56" alt="YuJunZhiXue" /><br /><sub>YuJunZhiXue</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/kingcharleslzy-ai"><img src="https://avatars.githubusercontent.com/u/260348840?s=112" width="56" height="56" alt="kingcharleslzy-ai" /><br /><sub>kingcharleslzy-ai</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/luowang-ui"><img src="https://avatars.githubusercontent.com/u/62333101?s=112" width="56" height="56" alt="luowang-ui" /><br /><sub>luowang-ui</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/heigit"><img src="https://avatars.githubusercontent.com/u/8845668?s=112" width="56" height="56" alt="heigit" /><br /><sub>heigit</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/OGHong"><img src="https://avatars.githubusercontent.com/u/130678941?s=112" width="56" height="56" alt="OGHong" /><br /><sub>OGHong</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/Wangxiaolu0716"><img src="https://avatars.githubusercontent.com/u/110671501?s=112" width="56" height="56" alt="Wangxiaolu0716" /><br /><sub>Wangxiaolu0716</sub></a></td>
  </tr>
  <tr>
    <td align="center" width="120"><a href="https://github.com/wtfsb19"><img src="https://avatars.githubusercontent.com/u/70636030?s=112" width="56" height="56" alt="wtfsb19" /><br /><sub>wtfsb19</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/MingShi350"><img src="https://avatars.githubusercontent.com/u/47762455?s=112" width="56" height="56" alt="MingShi350" /><br /><sub>MingShi350</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/loLollipop"><img src="https://avatars.githubusercontent.com/u/168881978?s=112" width="56" height="56" alt="loLollipop" /><br /><sub>loLollipop</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/youki258"><img src="https://avatars.githubusercontent.com/u/177468176?s=112" width="56" height="56" alt="youki258" /><br /><sub>youki258</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/SimonQvQ"><img src="https://avatars.githubusercontent.com/u/154972131?s=112" width="56" height="56" alt="SimonQvQ" /><br /><sub>SimonQvQ</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/alexopenfan-xiaxin"><img src="https://avatars.githubusercontent.com/u/267281196?s=112" width="56" height="56" alt="alexopenfan-xiaxin" /><br /><sub>alexopenfan-xiaxin</sub></a></td>
  </tr>
  <tr>
    <td align="center" width="120"><a href="https://github.com/Minervaowl7"><img src="https://avatars.githubusercontent.com/u/127482476?s=112" width="56" height="56" alt="Minervaowl7" /><br /><sub>Minervaowl7</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/ShiTan-677"><img src="https://avatars.githubusercontent.com/u/91113050?s=112" width="56" height="56" alt="ShiTan-677" /><br /><sub>ShiTan-677</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/0xnuu"><img src="https://avatars.githubusercontent.com/u/113989865?s=112" width="56" height="56" alt="0xnuu" /><br /><sub>0xnuu</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/21hbguo"><img src="https://avatars.githubusercontent.com/u/139569698?s=112" width="56" height="56" alt="21hbguo" /><br /><sub>21hbguo</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/cracer4869"><img src="https://avatars.githubusercontent.com/u/46320829?s=112" width="56" height="56" alt="cracer4869" /><br /><sub>cracer4869</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/fomaper"><img src="https://avatars.githubusercontent.com/u/38674512?s=112" width="56" height="56" alt="fomaper" /><br /><sub>fomaper</sub></a></td>
  </tr>
  <tr>
    <td align="center" width="120"><a href="https://github.com/Kilig1058674225"><img src="https://avatars.githubusercontent.com/u/68159061?s=112" width="56" height="56" alt="Kilig1058674225" /><br /><sub>Kilig1058674225</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/Legeo969"><img src="https://avatars.githubusercontent.com/u/79903511?s=112" width="56" height="56" alt="Legeo969" /><br /><sub>Legeo969</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/lyufeng000"><img src="https://avatars.githubusercontent.com/u/168790556?s=112" width="56" height="56" alt="lyufeng000" /><br /><sub>lyufeng000</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/Musan-34"><img src="https://avatars.githubusercontent.com/u/279201993?s=112" width="56" height="56" alt="Musan-34" /><br /><sub>Musan-34</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/qianxuno"><img src="https://avatars.githubusercontent.com/u/179305118?s=112" width="56" height="56" alt="qianxuno" /><br /><sub>qianxuno</sub></a></td>
    <td align="center" width="120"><a href="https://github.com/TLcmmmm"><img src="https://avatars.githubusercontent.com/u/167976723?s=112" width="56" height="56" alt="TLcmmmm" /><br /><sub>TLcmmmm</sub></a></td>
  </tr>
  <tr>
    <td align="center" width="120"><a href="https://github.com/Tofu707"><img src="https://avatars.githubusercontent.com/u/178003727?s=112" width="56" height="56" alt="Tofu707" /><br /><sub>Tofu707</sub></a></td>
  </tr>
</table>
<!-- CONTRIBUTORS:END -->

Список объединяет коммиттеров GitHub и записи о ручной благодарности, автоматически обновляется каждый день и сохраняет исторических участников. Порядок аватаров не отражает рейтинг вклада, а авторов сообщений об ошибках не записывают как авторов кода.
