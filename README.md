# 🔮 سایت پایه کوارتز فارسی 🇮🇷

سلام 👋🏻

این مخزن یک **قالب پایه (starter template)** برای ساخت سریع وب‌سایت شخصی با [Quartz 5](https://quartz.jzhao.xyz/) است — با تنظیمات از پیش آماده برای زبان فارسی، راست‌چین (RTL)، و یادداشت‌های Obsidian.

## 🌐 سایت نمونه

[https://eledah.ir/quartz](https://eledah.ir/quartz)

## ✨ ویژگی‌های کلیدی

| ویژگی | توضیح |
|-------|--------|
| 🖋️ فونت وزیرمتن | `Vazirmatn` برای متن، `IBM Plex Mono` برای کد |
| ↔️ دو‌جهته هوشمند | پلاگین `bidi-text` برای تشخیص خودکار RTL/LTR در هر پاراگراف |
| 📅 بومی‌سازی فارسی | `locale: fa-IR` — منوها، تاریخ‌ها، پیام‌های خطا |
| 📐 RTL کامل | استایل‌های سفارشی برای Explorer، TOC، نقل‌قول‌ها و موبایل |
| 🎨 ۱۷ تم رنگی | قابل تعویض با یک خط در `theme/palettes.ts` |
| 🔌 Quartz 5 | سیستم پلاگین community + پلاگین محلی bidi-text |
| 🚀 GitHub Pages | استقرار خودکار با push به شاخه `v5` |

---

## 🚀 راه‌اندازی سریع

### پیش‌نیازها

- [Node.js](https://nodejs.org/) نسخه ۲۲ یا بالاتر
- [Git](https://git-scm.com/)

### نصب و اجرا

```bash
git clone https://github.com/eledah/quartz.git
cd quartz
git checkout v5
npm ci --registry https://registry.npmjs.org/
npx quartz plugin install
npx quartz build --serve
```

سایت روی `http://localhost:8080` باز می‌شود.

> **نکته:** قبل از هر `build`، پلاگین‌ها باید نصب باشند. در CI و استقرار هم همین دستور اجرا می‌شود:
> `npx quartz plugin install && npx quartz build`

### شخصی‌سازی اولیه

1. محتوا را در پوشه [`content/`](content/) قرار دهید
2. در [`quartz.config.yaml`](quartz.config.yaml): `pageTitle` و `baseUrl` را تنظیم کنید
3. تم رنگی را در [`theme/palettes.ts`](theme/palettes.ts) انتخاب کنید

---

## 📁 ساختار پروژه

```
quartz/
├── content/                  # یادداشت‌های شما (Markdown)
├── quartz.config.yaml        # تنظیمات سایت و لیست پلاگین‌ها
├── quartz.lock.json          # قفل نسخه پلاگین‌های نصب‌شده
├── quartz.ts                 # بارگذاری config + اعمال تم رنگی
├── theme/
│   └── palettes.ts           # ۱۷ پالت رنگی
├── plugins/
│   └── bidi-text/            # پلاگین محلی دو‌جهته (RTL/LTR)
├── quartz/
│   └── styles/
│       └── custom.scss       # استایل‌های RTL فارسی
└── .quartz/
    └── plugins/              # پلاگین‌های community (بعد از install)
```

---

## 🔌 سیستم پلاگین Quartz 5

در نسخه ۵، بیشتر قابلیت‌های Quartz به **پلاگین‌های مستقل** منتقل شده‌اند. هر پلاگین یک مخزن Git جداگانه است که با CLI نصب می‌شود.

### تفاوت با نسخه ۴

| نسخه ۴ | نسخه ۵ |
|--------|--------|
| `quartz.config.ts` (TypeScript) | `quartz.config.yaml` (YAML) |
| `quartz.layout.ts` | بلوک `layout:` داخل هر پلاگین در YAML |
| `Plugin.Explorer()` از هسته | `github:quartz-community/explorer` |
| ویرایش مستقیم `quartz/plugins/` | نصب از [quartz-community](https://github.com/quartz-community) |

### انواع پلاگین

| نوع | کاربرد | مثال |
|-----|--------|------|
| **Transformer** | پردازش Markdown/HTML | `obsidian-flavored-markdown`, `bidi-text` |
| **Filter** | فیلتر صفحات | `remove-draft` |
| **Emitter** | تولید فایل خروجی | `content-index`, `og-image` |
| **Page Type** | نوع صفحه | `content-page`, `folder-page` |
| **Component** | اجزای UI | `explorer`, `search`, `graph` |

### فایل‌های مهم

- **`quartz.config.yaml`** — فعال/غیرفعال کردن پلاگین‌ها، تنظیمات، چیدمان (layout)
- **`quartz.lock.json`** — نسخه دقیق هر پلاگین نصب‌شده (مشابه `package-lock.json`)
- **`.quartz/plugins/`** — کد پلاگین‌های دانلودشده (در git commit نمی‌شود)

### دستورات CLI

```bash
# نصب همه پلاگین‌های تعریف‌شده در config
npx quartz plugin install

# نصب از روی config (فقط موارد گم‌شده)
npx quartz plugin install --from-config

# افزودن پلاگین جدید
npx quartz plugin add github:quartz-community/recent-notes

# حذف پلاگین
npx quartz plugin remove recent-notes

# پاک‌سازی پلاگین‌های بدون استفاده
npx quartz plugin prune
```

### نمونه تنظیم پلاگین در YAML

```yaml
plugins:
  - source: github:quartz-community/explorer
    enabled: true
    layout:
      position: left      # left | right | beforeBody | afterBody
      priority: 50
  - source: github:quartz-community/search
    enabled: true
    layout:
      position: left
      group: toolbar      # گروه‌بندی کنار هم
      groupOptions:
        grow: true
  - source: ./plugins/bidi-text   # پلاگین محلی
    enabled: true
    order: 35            # ترتیب پردازش (برای transformerها)
```

### پلاگین‌های فعال در این قالب

این قالب پلاگین‌های استاندارد Obsidian را فعال کرده و چیدمان مشابه نسخه ۴ فارسی دارد:

- **پردازش محتوا:** `note-properties`, `created-modified-date`, `syntax-highlighting`, `obsidian-flavored-markdown`, **`bidi-text`**, `github-flavored-markdown`, `crawl-links`, `latex`
- **صفحات:** `content-page`, `folder-page`, `tag-page`, `canvas-page`, `bases-page`
- **رابط کاربری:** `page-title`, `search`, `darkmode`, `reader-mode`, `explorer`, `graph`, `table-of-contents`, `backlinks`, `breadcrumbs`, `article-title`, `content-meta`, `tag-list`, `footer`
- **خروجی:** `content-index`, `og-image`, `favicon`, `alias-redirects`

---

## ↔️ پلاگین bidi-text (دو‌جهته هوشمند)

یکی از مهم‌ترین تفاوت‌های این قالب با Quartz پیش‌فرض، پلاگین محلی **`bidi-text`** است.

### مشکل

وقتی سایت RTL است (`dir="rtl"` روی `<html>`)، **همه** متن‌ها راست‌چین می‌شوند — حتی جملات انگلیسی، کد، یا اصطلاحات لاتین داخل پاراگراف فارسی. این باعث نمایش نادرست می‌شود.

### راه‌حل

پلاگین `bidi-text` روی هر `<p>` و `<h1>`–`<h6>` بررسی می‌کند که اولین حرف معنادار فارسی است یا لاتین، و `dir="rtl"` یا `dir="ltr"` را **جداگانه** روی همان بلوک قرار می‌دهد.

**مثال خروجی HTML:**

```html
<html lang="fa" dir="rtl">
  ...
  <p dir="rtl">این یک پاراگراف فارسی است.</p>
  <p dir="ltr">This paragraph stays left-to-right.</p>
  <h2 dir="rtl">عنوان فارسی</h2>
```

### نحوه کار

```
Markdown → OFM (order: 30) → bidi-text (order: 35) → GFM (order: 40) → HTML
```

ترتیب `order: 35` عمدی است: بعد از Obsidian Flavored Markdown و قبل از GitHub Flavored Markdown.

### الگوریتم تشخیص

تابع `isFarsi()` در [`plugins/bidi-text/src/transformer.ts`](plugins/bidi-text/src/transformer.ts):

1. متن داخل هر پاراگراف/سرخط را می‌خواند
2. کاراکترهای خنثی (فاصله، ایموجی، علائم نگارشی) را رد می‌کند
3. اولین حرف معنادار را با محدوده Unicode فارسی/عربی مقایسه می‌کند
4. `dir` مناسب را روی همان element تنظیم می‌کند

### ساخت و توسعه

```bash
cd plugins/bidi-text
npm install
npm run build
```

پلاگین در [`plugins/bidi-text/`](plugins/bidi-text/) زندگی می‌کند و از طریق مسیر نسبی در config ارجاع داده می‌شود:

```yaml
- source: ./plugins/bidi-text
  enabled: true
  order: 35
```

برای غیرفعال کردن (مثلاً اگر فقط فارسی می‌نویسید):

```yaml
- source: ./plugins/bidi-text
  enabled: false
```

---

## 🎨 تم‌های رنگی

۱۷ پالت در [`theme/palettes.ts`](theme/palettes.ts) تعریف شده. تم پیش‌فرض: **`persianAzure`**.

```ts
export const currentPaletteName: keyof typeof colorPalettes = "persianAzure"
```

| نام تم | نام تم | نام تم |
|--------|--------|--------|
| `original` | `coolBlues` | `warmEarth` |
| `forestGreen` | `royalPurple` | `oceanicTeal` |
| `monochrome` | `vintageCream` | `devDark` |
| `oceanVibes` | `halloween` | `neon` |
| `sunset` | `persianAzure` ⭐ | `sakuraDreams` |
| `cyberpunkCity` | `autumnGrove` | |

رنگ‌ها از YAML خوانده می‌شوند اما در [`quartz.ts`](quartz.ts) با پالت انتخابی جایگزین می‌گردند — نیازی به کپی دستی رنگ‌ها در YAML نیست.

---

## 📐 استایل‌های RTL

علاوه بر `bidi-text` و `locale: fa-IR`، فایل [`quartz/styles/custom.scss`](quartz/styles/custom.scss) شامل:

- فونت Vazirmatn سراسری
- حاشیه و padding راست‌چین برای breadcrumbs، TOC، tags، explorer
- برچسب پانوشت‌ها → «پانوشت‌ها»
- border راست برای `blockquote`
- `direction: ltr` برای بلوک‌های `code`
- انیمیشن Explorer موبایل از سمت راست (`translateX` برای RTL)

---

## ⚙️ تنظیمات اصلی

فایل [`quartz.config.yaml`](quartz.config.yaml):

```yaml
configuration:
  pageTitle: "بلاگ من"
  locale: fa-IR
  baseUrl: your-domain.com    # دامنه خود را اینجا بگذارید
  theme:
    typography:
      header: Vazirmatn
      body: Vazirmatn
      code: IBM Plex Mono
```

---

## 🚀 استقرار (GitHub Pages)

Workflow در [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) با هر push به شاخه **`v5`**:

1. `npm ci`
2. `npx quartz plugin install`
3. `npx quartz build`
4. انتشار در GitHub Pages

برای فعال‌سازی: **Settings → Pages → Source: GitHub Actions**

---

## 🌿 شاخه‌ها

| شاخه | توضیح |
|------|--------|
| **`v5`** | نسخه فعلی — Quartz 5 + پلاگین community |
| **`v4`** | نسخه قدیمی — `quartz.config.ts` (برای مرجع) |

مهاجرت از v4: [MIGRATION.md](MIGRATION.md)

---

## 📚 منابع

- [مستندات Quartz 5](https://quartz.jzhao.xyz/)
- [راهنمای مهاجرت به v5](https://quartz.jzhao.xyz/getting-started/migrating)
- [پلاگین‌های community](https://github.com/quartz-community)
- [میان‌بر سایت‌سازی با کوارتز](https://blog.eledah.ir/projects/pkm/quartz-shortcut) — آموزش فارسی
- [از یادداشت به سایت با کوارتز](https://blog.eledah.ir/projects/pkm/%D8%A7%D8%B2-%DB%8C%D8%A7%D8%AF%D8%AF%D8%A7%D8%B4%D8%AA-%D8%A8%D9%87-%D8%B3%D8%A7%DB%8C%D8%AA-%D8%A8%D8%A7-%DA%A9%D9%88%D8%A7%D8%B1%D8%AA%D8%B2) — مقاله اولیه

---

## 🛠️ عیب‌یابی

| مشکل | راه‌حل |
|------|--------|
| `build` خطای پلاگین می‌دهد | `npx quartz plugin install --from-config` |
| پلاگین clone نشد (شبکه) | پروکسی git تنظیم کنید و دوباره `plugin add` بزنید |
| تم عوض نشد | `currentPaletteName` در `theme/palettes.ts` |
| متن انگلیسی RTL شده | `bidi-text` را `enabled: true` نگه دارید |
| `npm ci` خطا در ایران | `npm ci --registry https://registry.npmjs.org/` |

---

موفق باشید! 🔮
