# ⚡ Pulse — Modern Expense Tracker

> A lightweight, modular financial dashboard built with **Pure Vanilla JavaScript (ES6+ Modules)**, **Chart.js**, and custom **Bento Grid CSS**.

🔗 **[Live Demo](https://rk1774589-web.github.io/Expense-Tracker/)**

---

## 🚀 Overview

**Pulse** is a clean, responsive financial tracking application designed to provide instant visibility into spending trends, income, and category breakdowns. 

Instead of relying on heavy frontend frameworks, this project was engineered using **Vanilla JavaScript with a modular architecture**, implementing a strict **Unidirectional Data Flow** (State → Render → Storage Sync) and proper separation of concerns.

---

## ✨ Key Features

* **📊 Interactive Visual Analytics:** Dynamic spending trend area chart built with Chart.js, featuring smooth curves, dynamic canvas gradients, and custom tooltips.
* **🏷️ Category Breakdown Progress Bars:** Automatic expenditure grouping by category with percentage calculations and color-coded progress bars.
* **🔍 Search & Date Filtering:** Real-time filtering by keyword and timeframe (`1W`, `1M`, `3M`, `YTD`).
* **💾 Data Persistence:** Seamless sync with browser `localStorage`, featuring safe fallbacks and `try...catch` error handling.
* **⚡ Event Delegation:** High-performance DOM interaction using single event listener delegation for dynamic elements (e.g., transaction deletion).
* **🎨 Modern Bento Grid UI:** Fully responsive dark-mode UI designed with CSS grid and custom glassmorphism styling.

---

## 🛠️ Tech Stack

* **Language:** JavaScript (ES6+ Modules)
* **Styling:** CSS3 (Variables, Flexbox, Grid, Bento-card layout)
* **Markup:** HTML5 (Semantic elements, `<dialog>` modal)
* **Libraries:** [Chart.js](https://www.chartjs.org/) (via CDN)
* **Hosting:** GitHub Pages

---

## 🏗️ Architecture & Module Structure

The application follows a clean **Single Responsibility Principle (SRP)** across five distinct JavaScript modules:

```text
Expense-Tracker/
├── index.html          # Semantic structure & modal definition
├── css/
│   ├── main.css        # Core layout & CSS custom properties
│   └── components.css  # Cards, buttons, & transaction items
└── js/
    ├── app.js          # Entry point & event listener orchestrator
    ├── state.js        # Central state object & calculation getters
    ├── ui.js           # DOM rendering functions & form handling
    ├── chart.js        # Chart.js initialization & gradient rendering
    └── storage.js      # LocalStorage helper with JSON parsing safety
