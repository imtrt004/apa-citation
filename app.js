/* ============================================================
   CONFIG
   ============================================================ */

const S2_PROXY_URL =
  "https://s2-proxy.tusar-gads.workers.dev/api/s2-search";

/**
 * Manual content types from the APA 7th quick guide (paraphrased),
 * each with:
 * - group: controls formatting logic
 * - visibleFields: which inputs to show for this type
 * - placeholders: example values for each field
 * - example: full example reference line from the guide
 */
const CONTENT_TYPES = {
  "book-single": {
    label: "Book (single author)",
    group: "book",
    visibleFields: ["authors", "year", "title", "container", "publisher"],
    placeholders: {
      authors: "Sendjaya, S.",
      year: "2015",
      title:
        "Personal and organizational excellence through servant leadership: Learning to serve, serving to lead, leading to transform.",
      container:
        "Personal and organizational excellence through servant leadership: Learning to serve, serving to lead, leading to transform.",
      volIssue: "",
      pages: "",
      publisher: "Springer",
      doi: ""
    },
    example:
      'Sendjaya, S. (2015). <i>Personal and organizational excellence through servant leadership: Learning to serve, serving to lead, leading to transform</i>. Springer.'
  },

  "book-multi": {
    label: "Book (multiple / corporate author)",
    group: "book",
    visibleFields: ["authors", "year", "title", "container", "publisher", "doi"],
    placeholders: {
      authors: "American Psychological Association.",
      year: "2020",
      title: "Publication manual of the American Psychological Association.",
      container: "Publication manual of the American Psychological Association.",
      volIssue: "",
      pages: "",
      publisher: "",
      doi: "https://doi.org/10.1037/0000165-000"
    },
    example:
      'American Psychological Association. (2020). <i>Publication manual of the American Psychological Association</i> (7th ed.). https://doi.org/10.1037/0000165-000'
  },

  "edited-book": {
    label: "Edited book",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Hunnicutt, S. (Ed.).",
      year: "2009",
      title: "Corporate social responsibility.",
      container: "",
      volIssue: "",
      pages: "",
      publisher: "Greenhaven Press",
      doi: ""
    },
    example:
      'Hunnicutt, S. (Ed.). (2009). <i>Corporate social responsibility</i>. Greenhaven Press.'
  },

  "chapter-edited-book": {
    label: "Chapter in edited book / anthology",
    group: "chapter",
    visibleFields: ["authors", "year", "title", "container", "pages", "publisher"],
    placeholders: {
      authors: "Hawthorne, J., Kelsch, A., & Steen, T.",
      year: "2010",
      title: "Making general education matter: Structures and strategies.",
      container:
        "In C. M. Wehlburg (Ed.), Integrated general education (2nd ed., pp. 23–34).",
      volIssue: "",
      pages: "23–34",
      publisher: "Jossey-Bass",
      doi: ""
    },
    example:
      'Hawthorne, J., Kelsch, A., & Steen, T. (2010). Making general education matter: Structures and strategies. In C. M. Wehlburg (Ed.), <i>Integrated general education</i> (2nd ed., pp. 23–34). Jossey-Bass.'
  },

  "journal-doi": {
    label: "Journal article (with DOI)",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volIssue", "pages", "doi"],
    placeholders: {
      authors: "Milton, C. L.",
      year: "2009",
      title: "Leadership and ethics in nurse-nurse relationships.",
      container: "Nursing Science Quarterly",
      volIssue: "22(2)",
      pages: "116–119",
      publisher: "",
      doi: "https://doi.org/10.1177/0894318409332569"
    },
    example:
      'Milton, C. L. (2009). Leadership and ethics in nurse-nurse relationships. <i>Nursing Science Quarterly, 22</i>(2), 116–119. https://doi.org/10.1177/0894318409332569'
  },

  "journal-no-doi": {
    label: "Journal article (no DOI)",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volIssue", "pages"],
    placeholders: {
      authors: "Hanif, M., & Retno, R. S.",
      year: "2019",
      title:
        "Akon-akon kambing as a methods of empowering disability: Local wisdom studies.",
      container: "International Journal of Scientific & Technology Research",
      volIssue: "8(11)",
      pages: "427–433",
      publisher: "",
      doi: ""
    },
    example:
      "Hanif, M., & Retno, R. S. (2019). Akon-akon kambing as a methods of empowering disability: Local wisdom studies. <i>International Journal of Scientific & Technology Research, 8</i>(11), 427–433."
  },

  "magazine-web": {
    label: "Magazine article (web)",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "pages", "doi"],
    placeholders: {
      authors: "Schindler, J.",
      year: "2019, January 7",
      title: "Leading with ethics.",
      container: "Forbes",
      volIssue: "",
      pages: "",
      publisher: "",
      doi: "https://www.forbes.com/sites/forbescoachescouncil/2019/01/07/leading-with-ethics/"
    },
    example:
      'Schindler, J. (2019, January 7). Leading with ethics. <i>Forbes</i>. https://www.forbes.com/sites/forbescoachescouncil/2019/01/07/leading-with-ethics/'
  },

  "encyclopedia-signed": {
    label: "Encyclopedia entry (signed)",
    group: "encyclopedia",
    visibleFields: ["authors", "year", "title", "container", "pages", "publisher"],
    placeholders: {
      authors: "Author, A. A.",
      year: "Year",
      title: "Entry title.",
      container: "In Editor, B. B. (Ed.), Collier’s encyclopedia (Vol. 22, pp. 416–439).",
      volIssue: "",
      pages: "416–439",
      publisher: "Collier",
      doi: ""
    },
    example:
      '<i>Collier’s encyclopedia</i> (Vol. 22, pp. 416–439). Collier.'
  },

  "encyclopedia-unsigned": {
    label: "Encyclopedia entry (unsigned)",
    group: "encyclopedia",
    visibleFields: ["title", "container", "pages", "publisher"],
    placeholders: {
      authors: "",
      year: "Year",
      title: "Entry title.",
      container: "Collier’s encyclopedia (Vol. 22, p. 285).",
      volIssue: "",
      pages: "285",
      publisher: "Collier",
      doi: ""
    },
    example:
      "<i>Collier’s encyclopedia</i> (Vol. 22, p. 285). Collier."
  },

  "thesis": {
    label: "Thesis / dissertation",
    group: "thesis",
    visibleFields: ["authors", "year", "title", "publisher", "doi"],
    placeholders: {
      authors: "Berry, R. S.",
      year: "2001",
      title:
        "Children’s environmental print: Reliability, validity, and relationship to early reading.",
      container: "",
      volIssue: "",
      pages: "",
      publisher:
        "Doctoral dissertation, University of North Carolina at Chapel Hill",
      doi: "https://search.proquest.com/…"
    },
    example:
      "Berry, R. S. (2001). <i>Children’s environmental print: Reliability, validity, and relationship to early reading</i> (Publication No. 3007766) [Doctoral dissertation, University of North Carolina at Chapel Hill]. ProQuest Dissertations and Theses Global."
  },

  "webpage": {
    label: "Webpage on a website",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "Proctor & Gamble.",
      year: "2019",
      title: "2019 Annual report and proxy statement.",
      container: "Proctor & Gamble",
      volIssue: "",
      pages: "",
      publisher: "",
      doi: "https://www.pginvestor.com/CustomPage/Index?KeyGenPage=1073748359"
    },
    example:
      "Proctor & Gamble. (2019). <i>2019 Annual report and proxy statement</i>. https://www.pginvestor.com/CustomPage/Index?KeyGenPage=1073748359"
  },

  "generic": {
    label: "Generic / custom",
    group: "generic",
    visibleFields: [
      "authors",
      "year",
      "title",
      "container",
      "volIssue",
      "pages",
      "publisher",
      "doi"
    ],
    placeholders: {
      authors: "Last, F. M., & Last, F. M.",
      year: "Year",
      title: "Title of work in sentence case.",
      container: "Journal / book / source name",
      volIssue: "volume(issue)",
      pages: "xx–xx",
      publisher: "Publisher / institution",
      doi: "https://doi.org/10.xxxx/xxxxx"
    },
    example:
      "Author, A. A. (Year). Title of work in sentence case. <i>Journal Title</i>, <i>volume</i>(issue), xx–xx. https://doi.org/10.xxxx/xxxxx"
  }
};

/* map logical field → DOM id */
const FIELD_IDS = {
  authors: "authors-input",
  year: "year-input",
  title: "title-input",
  container: "container-input",
  volIssue: "vol-input",
  pages: "pages-input",
  publisher: "publisher-input",
  doi: "doi-input"
};

/* ============================================================
   UTILITIES
   ============================================================ */

function clean(str) {
  return (str || "").toString().trim();
}

function extractDoi(str) {
  if (!str) return "";
  const t = str.trim();

  if (t.toLowerCase().includes("doi.org/")) {
    return t.split("doi.org/").pop().trim();
  }

  if (/^10\.\S+\/\S+$/i.test(t)) return t;

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

  if (formatted.length <= 20) {
    const allButLast = formatted.slice(0, -1).join(", ");
    const last = formatted[formatted.length - 1];
    return `${allButLast}, & ${last}`;
  }

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

  const j = paper.journal || {};
  const journalName = j.name || paper.venue || "";
  const volume = j.volume || paper.volume || "";
  const issue = j.issue || paper.issue || "";
  const pages = j.pages || paper.pages || "";

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

  let url = paper.url || "";
  if (!doi && url && /semanticscholar\.org/i.test(url)) {
    url = "";
  }

  let ref = "";

  if (authors) ref += authors;
  ref += ` (${year}). `;

  if (title) {
    ref += title.endsWith(".") ? `${title} ` : `${title}. `;
  }

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
   MANUAL FORM: TYPE HANDLING
   ============================================================ */

function updateManualFormForType(type) {
  const cfg = CONTENT_TYPES[type] || CONTENT_TYPES["generic"];

  // Show/hide fields
  const needed = new Set(cfg.visibleFields || []);
  document
    .querySelectorAll(".field-group")
    .forEach((group) => {
      const field = group.getAttribute("data-field");
      group.style.display = needed.has(field) ? "" : "none";
    });

  // Update placeholders
  const ph = cfg.placeholders || {};
  Object.keys(FIELD_IDS).forEach((field) => {
    const el = document.getElementById(FIELD_IDS[field]);
    if (!el) return;
    el.placeholder = ph[field] || "";
  });

  // Show example
  const exampleBox = document.getElementById("type-example");
  exampleBox.innerHTML = cfg.example || "";
}

/* ============================================================
   MANUAL APA GENERATOR
   ============================================================ */

function buildManualApaReference() {
  const type = document.getElementById("source-type").value;
  const cfg = CONTENT_TYPES[type] || CONTENT_TYPES["generic"];
  const group = cfg.group || "generic";

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

  // Basic sanity: if the group normally has authors + year + title, require them
  if (group !== "encyclopedia" && group !== "generic") {
    if (!authors || !year || !title) {
      errorBox.textContent =
        "Please fill in Author(s), Year, and Title for this content type.";
      errorBox.style.display = "block";
      return "";
    }
  }

  let ref = "";

  // Authors + year
  if (authors) {
    ref += authors;
  }
  if (year) {
    ref += ` (${year}). `;
  } else if (authors) {
    ref += ". ";
  }

  // Title
  if (title) {
    ref += title.endsWith(".") ? `${title} ` : `${title}. `;
  }

  // Group-specific formatting
  if (group === "journal") {
    if (container) {
      ref += `<i>${container}</i>`;
    }
    if (volIssue) {
      ref += container ? `, <i>${volIssue}</i>` : `<i>${volIssue}</i>`;
    }
    if (pages) {
      ref += (container || volIssue ? ", " : "") + pages;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else {
      ref += ".";
    }
  } else if (group === "book") {
    if (container) {
      ref += `<i>${container}</i>`;
      if (volIssue) {
        ref += ` (${volIssue})`;
      }
      ref += ". ";
    }
    if (publisher) {
      ref += publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (container || publisher) {
      ref += ".";
    }
  } else if (group === "chapter") {
    if (container) {
      ref += `${container} `;
    }
    if (pages && !/pp\./i.test(container)) {
      ref += `(pp. ${pages}). `;
    }
    if (publisher) {
      ref += publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (container || publisher) {
      ref += ".";
    }
  } else if (group === "encyclopedia") {
    if (container) {
      ref += `${container}`;
    }
    if (pages && !container.includes("pp.") && !container.includes("p.")) {
      ref += container ? ` (pp. ${pages}). ` : `(pp. ${pages}). `;
    } else if (container) {
      ref += ". ";
    }
    if (publisher) {
      ref += publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (container || publisher) {
      ref += ".";
    }
  } else if (group === "thesis") {
    if (publisher) {
      ref += publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (publisher) {
      ref += ".";
    }
  } else if (group === "webpage") {
    if (container) {
      ref += `${container}. `;
    }
    if (publisher) {
      ref += `${publisher}. `;
    }
    if (doiUrl) {
      ref += doiUrl;
    }
  } else {
    // generic fallback
    if (container) {
      ref += `${container}`;
      if (volIssue) {
        ref += `, ${volIssue}`;
      }
    }
    if (pages) {
      ref += (container || volIssue ? ", " : "") + pages;
    }
    if (publisher) {
      ref += (container || pages ? ". " : "") + publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (container || publisher) {
      ref += ".";
    }
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
      generateS2Citation(data);
      renderS2Results([data]);
      status.textContent = "Merged reference generated.";
      return;
    }

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

// React to content type changes
document.getElementById("source-type").addEventListener("change", (e) => {
  updateManualFormForType(e.target.value);
});

// Initialize form on load
updateManualFormForType(document.getElementById("source-type").value);
