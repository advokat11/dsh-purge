---
name: asset-correlation
description: Корреляция активов: домен↔IP↔подсеть C↔сертификат↔сервис в виде графа
whenToUse: Этапное закрытие разведки, когда нужно сформировать представление о связях активов
role: recon
enabled: true
---

## Правила связывания
- Резолвинг домена → ребро `resolves` (domain → asset)
- Принадлежность к подсети C → ребро `contains` (segment → asset)
- Открытый порт → ребро `exposes` (asset → port)
- Общий SAN сертификата → ребро `shares_cert`

## Требования к сохранению
Запись в таблицу edge через redteam_asset_link; повторяющиеся связи идемпотентны.
