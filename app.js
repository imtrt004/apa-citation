/* ============================================================
   CONFIG
   ============================================================ */

const S2_PROXY_URL =
  "https://s2-proxy.tusar-gads.workers.dev/api/s2-search";

/* ============================================================
   UTILITIES
   ============================================================ */

function clean(str) {
  return (str || "").toString().trim();
}

function extractDoi(str) {
  if (!str) return "";
  const t = str.trim();

  // DOI URL
  if (t.toLowerCase().includes("doi.org/")) {
    return t.split("doi.org/").pop().trim();
  }

  // Bare DOI
  if (/^10\.\S+\/\S+$/i.test(t)) return t;

  // Detect later in string
  const m = t.match(/10\.\S+\/\S+/);
  return m ? m[0] : "";
}

// Convert Title Case → APA sentence case (with colon/dash rules)
function toSentenceCase(str) {
  if (!str) return "";
  let s = str.trim();

  // Protect acronyms
  const tokens = s.split(/\s+/);
  const marked = tokens.map((w) => {
    if (w === w.toUpperCase() && w.length > 1) {
      return `§§${w}§§`;
    }
    return w.toLowerCase();
  });

  s = marked.join(" ");

  // Capitalize first letter of the whole title
  s = s.charAt(0).toUpperCase() + s.slice(1);

  // Capitalize first letter after ":" and "-"
  s = s.replace(/(:\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
  s = s.replace(/(-\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());

  // Restore acronyms
  s = s.replace(/§§(.*?)§§/g, (_, w) => w);

  return s;
}

/* ============================================================
   APA AUTHOR FORMATTING
   ============================================================ */

function toApaAuthorName(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts.pop();
  const initials = parts
    .map((p) => p.charAt(0).toUpperCase() + ".")
    .join(" ");
  return `${last}, ${initials}`;
}

function formatAuthorsFromMerged(dataAuthors) {
  if (!Array.isArray(dataAuthors) || dataAuthors.length === 0) return "";

  const formatted = dataAuthors.map((a) => toApaAuthorName(a.name));

  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) {
    return `${formatted[0]}, & ${formatted[1]}`;
  }

  // APA 7 rule: up to 20 authors → list all
  if (formatted.length <= 20) {
    const allButLast = formatted.slice(0, -1).join(", ");
    const last = formatted[formatted.length - 1];
    return `${allButLast}, & ${last}`;
  }

  // 21+ → first 19 + … + last
  const first19 = formatted.slice(0, 19).join(", ");
  const last = formatted[formatted.length - 1];
  return `${first19}, …, ${last}`;
}

/* ============================================================
   APA REFERENCE (FROM MERGED / S2 DATA)
   ============================================================ */

function apaReferenceFromPaper(paper) {
  const authors = formatAuthorsFromMerged(paper.authors || []);
  const year = paper.year || "n.d.";
  const title = toSentenceCase(paper.title || "");

  // Journal info – support both merged object and raw S2 search object
  const j = paper.journal || {};
  const journalName = j.name || paper.venue || "";
  const volume = j.volume || paper.volume || "";
  const issue = j.issue || paper.issue || "";
  const pages = j.pages || paper.pages || "";

  // DOI (from merged or raw externalIds)
  const rawDoi =
    paper.doi ||
    (paper.externalIds &&
      (paper.externalIds.DOI ||
        paper.externalIds.Doi ||
        paper.externalIds.doi));

  const doi = rawDoi
    ? `https://doi.org/${String(rawDoi).replace(
        /^https?:\/\/doi.org\//i,
        ""
      )}`
    : "";

  // URL – avoid Semantic Scholar URL when there is no DOI
  let url = paper.url || "";
  if (!doi && url && /semanticscholar\.org/i.test(url)) {
    url = "";
  }

  let ref = "";

  // Authors
  if (authors) ref += authors;
  ref += ` (${year}). `;

  // Title
  if (title) {
    ref += title.endsWith(".") ? `${title} ` : `${title}. `;
  }

  // Journal block → e.g. *Signals, 4*(1), 427–433
  if (journalName) {
    ref += `<i>${journalName}</i>`;
    if (volume) {
      ref += `, <i>${volume}`;
      if (issue) {
        ref += `(${issue})`;
      }
      ref += `</i>`;
    }
    if (pages) {
      ref += `, ${pages}`;
    }
  }

  // DOI / URL
  if (doi) {
    ref += `. ${doi}`;
  } else if (url) {
    ref += `. ${url}`;
  } else {
    ref += ".";
  }

  ref = ref.replace(/\.\s+(https?:\/\/)/, " $1");
  return ref.trim();
}

/* ============================================================
   MANUAL APA GENERATOR
   ============================================================ */

function buildManualApaReference() {
  const type = document.getElementById("source-type").value;
  const authors = clean(document.getElementById("authors-input").value);
  const year = clean(document.getElementById("year-input").value);
  const title = clean(document.getElementById("title-input").value);
  const container = clean(document.getElementById("container-input").value);
  const volIssue = clean(document.getElementById("vol-input").value);
  const pages = clean(document.getElementById("pages-input").value);
  const publisher = clean(document.getElementById("publisher-input").value);
  const doiUrl = clean(document.getElementById("doi-input").value);

  const errorBox = document.getElementById("manual-error");
  errorBox.style.display = "none";

  if (!authors || !year || !title) {
    errorBox.textContent =
      "Please fill in Author(s), Year, and Title at minimum.";
    errorBox.style.display = "block";
    return "";
  }

  let ref = `${authors} (${year}). `;
  ref += title.endsWith(".") ? `${title} ` : `${title}. `;

  if (type === "journal") {
    if (container) ref += `<i>${container}</i>`;
    if (volIssue) ref += `, <i>${volIssue}</i>`;
    if (pages) ref += `, ${pages}`;
    ref += doiUrl ? `. ${doiUrl}` : ".";
  } else if (type === "book") {
    if (container) ref += `<i>${container}</i>. `;
    if (publisher) ref += `${publisher}`;
    ref += doiUrl ? `. ${doiUrl}` : ".";
  } else if (type === "chapter") {
    if (container) ref += `In ${container}`;
    if (pages) ref += ` (pp. ${pages}). `;
    if (publisher) ref += publisher;
    ref += doiUrl ? `. ${doiUrl}` : ".";
  } else if (type === "webpage") {
    if (container) ref += `${container}. `;
    if (publisher) ref += `${publisher}. `;
    ref += doiUrl ? doiUrl : "";
  } else {
    if (container) ref += `${container}`;
    if (volIssue) ref += `, ${volIssue}`;
    if (pages) ref += `, ${pages}`;
    if (publisher) ref += `. ${publisher}`;
    ref += doiUrl ? `. ${doiUrl}` : ".";
  }

  ref = ref.replace(/\.\s+(https?:\/\/)/, " $1");
  return ref.trim();
}

function renderManualCitation(text) {
  const box = document.getElementById("manual-citation");
  const btn = document.getElementById("copy-btn");
  if (!text) {
    box.classList.add("empty");
    box.innerHTML = "Your formatted reference will appear here.";
    btn.disabled = true;
    return;
  }
  box.classList.remove("empty");
  box.innerHTML = `<span class="citation-line">${text}</span>`;
  btn.disabled = false;
}

/* ============================================================
   COPY BUTTONS
   ============================================================ */

async function copyTextFrom(elementId, buttonId) {
  const box = document.getElementById(elementId);
  const btn = document.getElementById(buttonId);

  if (box.classList.contains("empty")) return;

  const text = box.innerText || box.textContent;

  try {
    await navigator.clipboard.writeText(text);
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = old), 1200);
  } catch (e) {
    alert("Clipboard blocked. Copy manually.");
  }
}

/* ============================================================
   SEMANTIC SCHOLAR RESULTS RENDERING
   ============================================================ */

function renderS2Results(list) {
  const container = document.getElementById("s2-results");
  container.innerHTML = "";

  if (!list || list.length === 0) {
    container.innerHTML =
      '<span class="guide-text">No results found.</span>';
    return;
  }

  list.forEach((paper) => {
    const authorsShort = (paper.authors || [])
      .slice(0, 3)
      .map((a) => a.name)
      .join(", ");
    const extra = (paper.authors || []).length > 3 ? ", et al." : "";

    const journal =
      (paper.journal && paper.journal.name) || paper.venue || "";

    const div = document.createElement("div");
    div.className = "paper";

    div.innerHTML = `
      <div class="paper-header">
        <div>
          <div class="paper-title">${paper.title || "Untitled"}</div>
          <div class="paper-meta">
            ${paper.year || "n.d."}${journal ? " · " + journal : ""}
            <br/>
            ${authorsShort}${extra}
          </div>
        </div>
        <div class="paper-actions">
          <button class="btn secondary btn-small">APA Reference</button>
          ${
            paper.url
              ? `<a href="${paper.url}" class="paper-link" target="_blank" rel="noopener noreferrer">View</a>`
              : ""
          }
        </div>
      </div>
    `;

    div
      .querySelector("button")
      .addEventListener("click", () => generateS2Citation(paper));

    container.appendChild(div);
  });
}

/* ============================================================
   GENERATE & SEARCH (S2 + CROSSREF)
   ============================================================ */

function generateS2Citation(paper) {
  const ref = apaReferenceFromPaper(paper);
  const box = document.getElementById("s2-citation");
  const btn = document.getElementById("s2-copy-btn");

  box.classList.remove("empty");
  box.innerHTML = `<span class="citation-line">${ref}</span>`;
  btn.disabled = false;
}

async function searchSemanticScholar() {
  const query = clean(document.getElementById("s2-query").value);
  const status = document.getElementById("s2-status");
  const errorBox = document.getElementById("s2-error");
  const btn = document.getElementById("s2-search-btn");

  errorBox.style.display = "none";
  status.textContent = "";
  btn.disabled = true;

  if (!query) {
    errorBox.textContent = "Enter keywords or DOI first.";
    errorBox.style.display = "block";
    btn.disabled = false;
    return;
  }

  const doi = extractDoi(query);
  const isDoiLookup = !!doi;

  status.textContent = isDoiLookup
    ? "Fetching metadata via Worker (Crossref + S2)…"
    : "Searching Semantic Scholar…";

  try {
    const url = isDoiLookup
      ? `${S2_PROXY_URL}?doi=${encodeURIComponent(doi)}`
      : `${S2_PROXY_URL}?q=${encodeURIComponent(query)}`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(JSON.stringify(data));
    }

    if (isDoiLookup) {
      // Worker returns merged object
      generateS2Citation(data);
      renderS2Results([data]);
      status.textContent = "Merged reference generated.";
      return;
    }

    // Search results (raw Semantic Scholar)
    const results = data.data || data.results || [];
    renderS2Results(results);
    status.textContent = `Found ${results.length} paper(s).`;
  } catch (e) {
    console.error(e);
    errorBox.textContent =
      "Could not fetch data. Check Worker, API key, or CORS.";
    errorBox.style.display = "block";
  } finally {
    btn.disabled = false;
  }
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

document.getElementById("generate-btn").addEventListener("click", () => {
  const ref = buildManualApaReference();
  renderManualCitation(ref);
});

document
  .getElementById("copy-btn")
  .addEventListener("click", () => copyTextFrom("manual-citation", "copy-btn"));

document
  .getElementById("s2-copy-btn")
  .addEventListener("click", () => copyTextFrom("s2-citation", "s2-copy-btn"));

document
  .getElementById("s2-search-btn")
  .addEventListener("click", searchSemanticScholar);

document.getElementById("s2-query").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchSemanticScholar();
  }
});
