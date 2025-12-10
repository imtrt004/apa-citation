---

# 📚 APA 7th Edition Reference Generator

**Semantic Scholar + Crossref Powered • Modern UI • GitHub Pages / Cloudflare Pages Ready**

A clean, fast, and accurate APA 7th edition reference generator that combines:

* ⚡ **Semantic Scholar Academic Graph API**
* ⚡ **Crossref Metadata API**
* ⚡ **Your Cloudflare Worker** (to merge and purify data)

Designed to produce **fully authenticated, APA-correct citations**, including hanging indents, sentence-case titles, accurate author formatting, and complete journal metadata (volume, issue, pages).

---

## ✨ Features

### 🔹 **1. Manual APA Reference Builder**

* Build APA 7 references by entering:

  * Authors
  * Year
  * Title
  * Journal/book/site
  * Volume, issue, pages
  * DOI/URL
* Auto-formatted with hanging‐indent.
* One-click **Copy to Clipboard**.

---

### 🔹 **2. DOI Lookup (Crossref + Semantic Scholar Merged)**

When a user pastes a DOI:

1. The frontend sends it to your Cloudflare Worker.
2. The worker fetches **Crossref** metadata (precise journal info).
3. Also fetches **Semantic Scholar** metadata (URLs, IDs, fallback info).
4. Merges both into a **canonical paper object**.
5. Returns one clean result to the frontend.

This ensures:

* Correct **volume**, **issue**, **pages** (Crossref)
* Accurate **title**, **authors**, **year**
* Stable **DOI → URL form**
* APA-7 compliant **author formatting**

---

### 🔹 **3. Keyword Search (Semantic Scholar)**

* Query by keywords, title, or author.
* Displays matching papers.
* Click → auto-generate APA reference.

---

### 🔹 **4. Beautiful, Modern UI**

* Fully responsive
* Dark, elegant gradients
* Rounded cards
* Professional typography
* Smooth user experience

---

## 🏗️ Tech Stack

### **Frontend**

* HTML
* CSS (custom modern design)
* JavaScript (modular `app.js`)
* Hanging-indents via pure CSS

### **Backend (Proxy Layer)**

* **Cloudflare Worker** for:

  * CORS-free API access
  * Semantic Scholar request signing
  * Crossref calls
  * Data merging & normalization

### **External APIs**

| API                                 | Purpose                                                            |
| ----------------------------------- | ------------------------------------------------------------------ |
| **Semantic Scholar Academic Graph** | High-quality paper metadata, authors, links                        |
| **Crossref REST API**               | Reliable journal metadata (volume, issue, pages, publication date) |

---

## 📂 Project Structure

```
/
├── index.html       # Main UI
├── styles.css       # Full UI styling
├── app.js           # All logic: APA generator, DOI search, S2 search
└── README.md        # This file
```

## 📝 APA Formatting Rules Implemented

### ✔ Sentence case title conversion

`The Title Of The Paper` → `The title of the paper`

### ✔ APA 7 author logic

* 1 author → `Smith, J.`
* 2 authors → `Smith, J., & Doe, M.`
* Up to 20 authors → list all
* 21+ authors → first 19 + `…` + last

### ✔ Hanging indent (true APA structure)

Rendered in the browser exactly like a references page.

### ✔ Publisher / container rules based on source type:

* Journal
* Book
* Edited chapter
* Webpage
* Generic fallback

---

## 📸 Screenshots

*(later)*

```

```

---

## 💡 Roadmap / Possible Future Improvements

* Add **BibTeX / RIS export**
* Add **Chrome extension** for “Cite this page”
* Auto-detect APA metadata from webpage content
* Add **editable reference list** with PDF export
* AI-based **citation fixer** (GPT-assisted)

---

## 🤝 Contributions

Pull requests and suggestions are always welcome.
If you find unexpected metadata issues, feel free to open an issue — Crossref vs Semantic Scholar discrepancies are common, and we can improve merge logic together.

---

## 🧑‍💻 Author

Developed by **Md Tusar Akon**
Colorado State University
Department of Design & Merchandising

---

## ⭐ If you find this useful, give the repo a star!

---

If you want a **light version**, a **more playful version**, or documentation for **students using the tool**, I can generate those too.
