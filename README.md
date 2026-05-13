# 🏠 GetHome – Grocery Delivery App

A fast, modern grocery delivery web app inspired by Blinkit. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. Ready to deploy on GitHub Pages.

## ✨ Features

- 🛒 **Shopping Cart** — Add/remove items, quantity controls, persistent cart via localStorage
- 🔍 **Live Search** — Instant product search from the navbar
- 📍 **Location Picker** — Set delivery address with quick-select options
- 🏷️ **Category Filter** — Browse by Fruits, Dairy, Snacks, Bakery, Beverages, Household, Personal Care, Frozen
- ⚡ **Checkout Flow** — Order summary, payment method selection (UPI/Card/Cash)
- 📦 **Order Tracking** — Confirmation screen with live delivery stages
- 📱 **Fully Responsive** — Works great on mobile, tablet, and desktop
- 🎨 **Beautiful UI** — Dark navy + red accent design with smooth animations

## 🚀 Quick Start

Just open `index.html` in your browser — no installation needed!

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/gethome.git
cd gethome

# Open in browser
open index.html
```

## 📁 Project Structure

```
gethome/
├── index.html          # Main app page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # Product & category data
│   └── app.js          # App logic (cart, search, modals)
└── README.md
```

## 🌐 Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your app will be live at `https://YOUR_USERNAME.github.io/gethome`

## 🛠️ Customisation

- **Add products** → Edit `js/data.js`, add entries to the `PRODUCTS` array
- **Add categories** → Add to `CATEGORIES` array in `data.js` + filter button in `index.html`
- **Change colours** → Edit CSS variables in `css/style.css` (`:root` block)

## 📦 Products Included (43 items)

| Category | Count |
|---|---|
| Fruits & Veggies | 8 |
| Dairy & Eggs | 6 |
| Snacks | 6 |
| Bakery | 5 |
| Beverages | 6 |
| Household | 5 |
| Personal Care | 4 |
| Frozen Foods | 3 |

---

Made with ❤️ in India | © 2026 GetHome
