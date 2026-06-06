# مهاجرت از Quartz 4 به Quartz 5

این مخزن اکنون دو شاخه دارد:

- **`v4`** — نسخه قبلی با `quartz.config.ts` و `quartz.layout.ts`
- **`v5`** — نسخه جدید با `quartz.config.yaml` و سیستم پلاگین community

## برای کاربران جدید

مستقیماً شاخه `v5` را clone کنید:

```bash
git clone https://github.com/eledah/quartz.git
cd quartz
git checkout v5
npm ci
npx quartz plugin install
npx quartz build --serve
```

## برای کاربرانی که از v4 استفاده می‌کنند

1. محتوای `content/` را پشتیبان بگیرید
2. به شاخه `v5` بروید: `git checkout v5`
3. وابستگی‌ها و پلاگین‌ها را نصب کنید:
   ```bash
   npm ci
   npx quartz plugin install
   ```
4. محتوای خود را در `content/` قرار دهید
5. `quartz.config.yaml` را برای `baseUrl` و `pageTitle` شخصی‌سازی کنید
6. تم رنگی را در `theme/palettes.ts` انتخاب کنید

## تغییرات مهم

| v4                    | v5                              |
| --------------------- | ------------------------------- |
| `quartz.config.ts`    | `quartz.config.yaml`            |
| `quartz.layout.ts`    | بلوک‌های `layout:` در YAML      |
| `Plugin.X()`          | `github:quartz-community/x`     |
| RTL در `ofm.ts`       | پلاگین محلی `plugins/bidi-text` |
| استقرار روی شاخه `v4` | استقرار روی شاخه `v5`           |

شاخه `v4` همچنان در دسترس است و حذف نمی‌شود.
