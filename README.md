# قالب فارسی Quartz 5

سلام.

این مخزن یک starter برای ساخت وب‌سایت شخصی با [Quartz 5](https://quartz.jzhao.xyz/) است؛ از اول برای فارسی، راست‌چین و یادداشت‌های Obsidian تنظیم شده.

نمونه زنده: [eledah.ir/quartz](https://eledah.ir/quartz)

## چه چیزهایی از قبل آماده است

- فونت **وزیرمتن** برای متن و رابط، **IBM Plex Mono** برای کد
- پلاگین **`bidi-text`** برای تشخیص RTL/LTR در هر پاراگراف (مثلاً جمله انگلیسی وسط متن فارسی)
- `locale: fa-IR` برای تاریخ، منو و پیام‌ها
- استایل RTL در Explorer، فهرست مطالب، نقل‌قول‌ها و موبایل
- **تم‌های Obsidian** با `@quartz-themes/core` (پیش‌فرض: Things)
- استقرار خودکار روی GitHub Pages با push به شاخه `v5`

---

## راه‌اندازی

**پیش‌نیاز:** Node.js 22+ و Git

```bash
git clone https://github.com/eledah/quartz.git
cd quartz
git checkout v5
npm install
npx quartz build --serve
```

سایت روی `http://localhost:8080` بالا می‌آید.

قبل از `build` در CI هم همین مسیر را بروید: `npm install` و بعد `npx quartz build`.

### شخصی‌سازی اولیه

1. یادداشت‌ها را در [`content/`](content/) بگذارید
2. در [`quartz.config.yaml`](quartz.config.yaml) مقدارهای `pageTitle` و `baseUrl` را عوض کنید
3. اگر خواستید تم Obsidian دیگری بگذارید، بخش تم‌ها را پایین‌تر ببینید

---

## ساختار پروژه

```
quartz/
├── content/                  # یادداشت‌های Markdown
├── quartz.config.yaml        # تنظیمات سایت و پلاگین‌ها
├── quartz.ts                 # بارگذاری config (اختیاری برای override)
├── plugins/bidi-text/        # پلاگین محلی دو‌جهته
├── quartz/styles/custom.scss # استایل‌های RTL و فونت
└── .quartz/plugins/          # پلاگین‌های نصب‌شده (بعد از build)
```

---

## تم‌های Obsidian

از نسخه اخیر می‌توانید تم‌های Obsidian را مستقیم روی سایت بگذارید؛ همان تم‌هایی که در ویتاینر می‌شناسید (Catppuccin، Things، Minimal، Tokyo Night و خیلی‌های دیگر).

پلاگین [`@quartz-themes/core`](https://www.npmjs.com/package/@quartz-themes/core) تم را از npm می‌گیرد. اولین build معمولاً خودش پکیج تم را نصب می‌کند (مثلاً `@quartz-themes/things`).

در [`quartz.config.yaml`](quartz.config.yaml):

```yaml
plugins:
  - source: "@quartz-community/quartz-fonts"
    enabled: true
    options:
      useThemeFonts: false
      fontOrigin: googleFonts
      body: Vazirmatn
      header: Vazirmatn
      interface: Vazirmatn
      code: IBM Plex Mono
  - source: "@quartz-themes/core"
    enabled: true
    options:
      theme: things        # نام تم: catppuccin، minimal، nord، ...
      mode: both           # dark | light | both
```

چند نکته از تجربه خودم:

- برای فارسی معمولاً `useThemeFonts: false` بهتر است و فونت را دستی روی Vazirmatn می‌گذارم؛ تم‌های Obsidian اغلب برای انگلیسی طراحی شده‌اند.
- فایل [`quartz/styles/custom.scss`](quartz/styles/custom.scss) چند تا override دارد (فونت callout و search، فاصله checkbox در RTL و ...). اگر تم عوض کردید و چیزی به‌هم ریخت، اول همان‌جا را نگاه کنید.
- لیست تم‌ها را در [quartz-themes](https://github.com/quartz-themes) ببینید؛ بیش از ۸۰۰ تم هست.

تم پیش‌فرض این قالب الان **Things** است. برای عوض کردنش فقط `theme:` را در config عوض کنید و دوباره build بگیرید.

---

## پلاگین‌ها در Quartz 5

بیشتر قابلیت‌ها پلاگین جدا هستند و از npm با پیشوند `@quartz-community/` نصب می‌شوند (دیگر لازم نیست از GitHub clone شوند).

| نوع | کار |
|-----|-----|
| Transformer | پردازش Markdown |
| Filter | حذف یا فیلتر صفحات |
| Emitter | sitemap، OG image و ... |
| Page Type | صفحه محتوا، پوشه، تگ |
| Component | Explorer، Search، Graph |

دستورهای پرکاربرد:

```bash
npx quartz plugin install --from-config   # نصب پلاگین‌های config
npx quartz plugin prune                   # حذف پلاگین‌های اضافه
```

نمونه در YAML:

```yaml
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    layout:
      position: left
      priority: 50
  - source: ./plugins/bidi-text
    enabled: true
    order: 35
```

---

## پلاگین bidi-text

وقتی `<html dir="rtl">` باشد، همه‌چیز راست‌چین می‌شود؛ حتی یک جمله انگلیسی وسط پاراگراف فارسی.

`bidi-text` روی هر `<p>` و `<h1>`–`<h6>` نگاه می‌کند اولین حرف معنادار فارسی است یا لاتین، و `dir` همان بلوک را جدا تنظیم می‌کند:

```html
<p dir="rtl">این پاراگراف فارسی است.</p>
<p dir="ltr">This one stays LTR.</p>
```

ترتیب پردازش: OFM (۳۰) → bidi-text (۳۵) → GFM (۴۰).

کد در [`plugins/bidi-text/`](plugins/bidi-text/). برای غیرفعال کردن:

```yaml
- source: ./plugins/bidi-text
  enabled: false
```

---

## استایل RTL

[`quartz/styles/custom.scss`](quartz/styles/custom.scss) علاوه بر فونت:

- padding و margin راست‌چین برای breadcrumbs، TOC، tags، explorer
- برچسب «پانوشت‌ها» به‌جای Footnotes
- `direction: ltr` برای بلوک کد
- Explorer موبایل از سمت راست باز می‌شود

---

## تنظیمات اصلی

[`quartz.config.yaml`](quartz.config.yaml):

```yaml
configuration:
  pageTitle: "بلاگ من"
  locale: fa-IR
  baseUrl: eledah.ir/quartz
  theme:
    typography:
      header: Vazirmatn
      body: Vazirmatn
      code: IBM Plex Mono
```

---

## استقرار

Workflow در [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) با هر push به `v5`:

1. `npm install`
2. `npx quartz build`
3. انتشار در GitHub Pages

در تنظیمات مخزن: **Settings → Pages → Source: GitHub Actions**

هم‌زمان یک workflow روزانه هم upstream Quartz را merge می‌کند (`.github/workflows/sync-upstream.yaml`).

---

## شاخه‌ها

| شاخه | توضیح |
|------|--------|
| `v5` | Quartz 5 + پلاگین‌های npm (فعلی) |
| `v4` | نسخه قدیمی با `quartz.config.ts` |

مهاجرت از v4: [MIGRATION.md](MIGRATION.md)

---

## منابع

- [مستندات Quartz 5](https://quartz.jzhao.xyz/)
- [پلاگین‌های community](https://github.com/quartz-community)
- [Quartz Themes](https://github.com/quartz-themes)
- [میان‌بر سایت‌سازی با کوارتز](https://blog.eledah.ir/projects/pkm/quartz-shortcut)
- [از یادداشت به سایت با کوارتز](https://blog.eledah.ir/projects/pkm/%D8%A7%D8%B2-%DB%8C%D8%A7%D8%AF%D8%AF%D8%A7%D8%B4%D8%AA-%D8%A8%D9%87-%D8%B3%D8%A7%DB%8C%D8%AA-%D8%A8%D8%A7-%DA%A9%D9%88%D8%A7%D8%B1%D8%AA%D8%B2)

---

## اگر گیر کردید

| مشکل | چه کار کنید |
|------|-------------|
| خطای پلاگین در build | `npx quartz plugin install --from-config` |
| تم عوض نشد | `theme:` در `@quartz-themes/core` را چک کنید و دوباره build بگیرید |
| فونت تم با فارسی جور نیست | `useThemeFonts: false` و Vazirmatn در quartz-fonts |
| متن انگلیسی RTL شده | `bidi-text` را `enabled: true` بگذارید |
| `npm install` در ایران | `--registry https://registry.npmjs.org/` |

---

اگر سوالی بود، issue بزنید یا PR بفرستید.
