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
  /* ============ BOOKS ============ */
  "book-single": {
    label: "Book – single author",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Sendjaya, S.",
      year: "2015",
      title:
        "Personal and organizational excellence through servant leadership: Learning to serve, serving to lead, leading to transform.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Springer",
      doi: ""
    },
    example:
      "Sendjaya, S. (2015). <i>Personal and organizational excellence through servant leadership: Learning to serve, serving to lead, leading to transform</i>. Springer."
  },

  "book-2-authors": {
    label: "Book – 2 authors",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Kouzes, J. M., & Posner, B. Z.",
      year: "2008",
      title:
        "The student leadership challenge: Five practices for exemplary leaders.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Jossey-Bass",
      doi: ""
    },
    example:
      "Kouzes, J. M., & Posner, B. Z. (2008). <i>The student leadership challenge: Five practices for exemplary leaders</i>. Jossey-Bass."
  },

  "book-multi": {
    label: "Book – multiple authors",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors:
        "Sander, M. R., Downer, J. L., Quist, A. L., Lucas, C. L., Cline, J. K., & Campbell, D. R.",
      year: "2014",
      title: "Doing research in the university library.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Corbin Press",
      doi: ""
    },
    example:
      "Sander, M. R., Downer, J. L., Quist, A. L., Lucas, C. L., Cline, J. K., & Campbell, D. R. (2014). <i>Doing research in the university library</i>. Corbin Press."
  },

  "book-corporate": {
    label: "Book – corporate / publisher as author (with DOI)",
    group: "book",
    visibleFields: ["authors", "year", "title", "doi"],
    placeholders: {
      authors: "American Psychological Association.",
      year: "2020",
      title: "Publication manual of the American Psychological Association (7th ed.).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://doi.org/10.1037/0000165-000"
    },
    example:
      "American Psychological Association. (2020). <i>Publication manual of the American Psychological Association</i> (7th ed.). https://doi.org/10.1037/0000165-000"
  },

  "book-ebook-url": {
    label: "Book – ebook / audiobook with non-database URL",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher", "doi"],
    placeholders: {
      authors: "Twain, M.",
      year: "1885",
      title: "Adventures of Huckleberry Finn.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Charles L. Webster.",
      doi: "https://www.gutenberg.org/files/76/76-h/76-h.htm"
    },
    example:
      "Twain, M. (1885). <i>Adventures of Huckleberry Finn</i>. Charles L. Webster. https://www.gutenberg.org/files/76/76-h/76-h.htm"
  },

  "book-edition-later": {
    label: "Book – 2nd or later edition",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Jennings, J. H., Caldwell, J. S., & Lerner, J. W.",
      year: "2010",
      title:
        "Reading problems: Assessment and teaching strategies (6th ed.).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Allyn & Bacon",
      doi: ""
    },
    example:
      "Jennings, J. H., Caldwell, J. S., & Lerner, J. W. (2010). <i>Reading problems: Assessment and teaching strategies</i> (6th ed.). Allyn & Bacon."
  },

  "book-edition-revised": {
    label: "Book – revised edition",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Groarke, L. A., & Tindale, C. W.",
      year: "2008",
      title: "Good reasoning matters!: A constructive approach to critical thinking (Rev. ed.).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Oxford University Press",
      doi: ""
    },
    example:
      "Groarke, L. A., & Tindale, C. W. (2008). <i>Good reasoning matters!: A constructive approach to critical thinking</i> (Rev. ed.). Oxford University Press."
  },

  "book-edited": {
    label: "Edited book (no author)",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Hunnicutt, S. (Ed.).",
      year: "2009",
      title: "Corporate social responsibility.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Greenhaven Press",
      doi: ""
    },
    example:
      "Hunnicutt, S. (Ed.). (2009). <i>Corporate social responsibility</i>. Greenhaven Press."
  },

  "book-translation": {
    label: "Book – translation",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Hitler, A.",
      year: "2001",
      title: "Mein Kampf (R. Manheim, Trans.).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Houghton Mifflin. (Original work published 1943)",
      doi: ""
    },
    example:
      "Hitler, A. (2001). <i>Mein Kampf</i> (R. Manheim, Trans.). Houghton Mifflin. (Original work published 1943)."
  },

  "book-intro-preface": {
    label: "Book – foreword / introduction / preface / afterword",
    group: "chapter",
    visibleFields: ["authors", "year", "title", "container", "pages", "publisher"],
    placeholders: {
      authors: "Gregory, W. D.",
      year: "2001",
      title: "Foreword.",
      container:
        "In J. C. Cusick & K. F. DeVries, The basic guide to young adult ministry (pp. ix–x).",
      volume: "",
      issue: "",
      pages: "ix–x",
      publisher: "Orbis Books",
      doi: ""
    },
    example:
      "Gregory, W. D. (2001). Foreword. In J. C. Cusick & K. F. DeVries, <i>The basic guide to young adult ministry</i> (pp. ix–x). Orbis Books."
  },

  "book-multivol-all": {
    label: "Multivolume work – all volumes",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Pearson, P. D. (Ed.).",
      year: "1984–2000",
      title: "Handbook of reading research (Vol. 1–3).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Lawrence Erlbaum Associates",
      doi: ""
    },
    example:
      "Pearson, P. D. (Ed.). (1984–2000). <i>Handbook of reading research</i> (Vol. 1–3). Lawrence Erlbaum Associates."
  },

  "book-multivol-one": {
    label: "Multivolume work – one volume",
    group: "book",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Kamil, M. L., Mosenthal, P. B., Pearson, P. D., & Barr, R. (Eds.).",
      year: "2000",
      title: "Handbook of reading research (Vol. 3).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Lawrence Erlbaum Associates",
      doi: ""
    },
    example:
      "Kamil, M. L., Mosenthal, P. B., Pearson, P. D., & Barr, R. (Eds.). (2000). <i>Handbook of reading research</i> (Vol. 3). Lawrence Erlbaum Associates."
  },

  "book-anthology-work": {
    label: "Work in an anthology",
    group: "chapter",
    visibleFields: ["authors", "year", "title", "container", "pages", "publisher"],
    placeholders: {
      authors: "Shapiro, T. M.",
      year: "2010",
      title: "The hidden cost of being African American.",
      container:
        "In M. L. Andersen & P. H. Collins (Eds.), Race, class & gender: An anthology (7th ed., pp. 129–136).",
      volume: "",
      issue: "",
      pages: "129–136",
      publisher: "Wadsworth Cengage Learning",
      doi: ""
    },
    example:
      "Shapiro, T. M. (2010). The hidden cost of being African American. In M. L. Andersen & P. H. Collins (Eds.), <i>Race, class & gender: An anthology</i> (7th ed., pp. 129–136). Wadsworth Cengage Learning."
  },

  "encyclopedia-signed": {
    label: "Encyclopedia entry – signed (print)",
    group: "encyclopedia",
    visibleFields: ["authors", "year", "title", "container", "pages", "publisher"],
    placeholders: {
      authors: "Grossman, W. L.",
      year: "1996",
      title: "History of transportation.",
      container:
        "In L. S. Bahr, B. Johnston, & L. A. Bloomfield (Eds.), Collier’s encyclopedia (Vol. 22, pp. 416–439).",
      volume: "",
      issue: "",
      pages: "416–439",
      publisher: "Collier",
      doi: ""
    },
    example:
      "Grossman, W. L. (1996). History of transportation. In L. S. Bahr, B. Johnston, & L. A. Bloomfield (Eds.), <i>Collier’s encyclopedia</i> (Vol. 22, pp. 416–439). Collier."
  },

  "encyclopedia-unsigned": {
    label: "Encyclopedia entry – unsigned (print)",
    group: "encyclopedia",
    visibleFields: ["title", "container", "pages", "publisher"],
    placeholders: {
      authors: "",
      year: "1996",
      title: "Gulf of Thessaloniki.",
      container:
        "In L. S. Bahr, B. Johnston, & L. A. Bloomfield (Eds.), Collier’s encyclopedia (Vol. 22, p. 285).",
      volume: "",
      issue: "",
      pages: "285",
      publisher: "Collier",
      doi: ""
    },
    example:
      "Gulf of Thessaloniki. (1996). In L. S. Bahr, B. Johnston, & L. A. Bloomfield (Eds.), <i>Collier’s encyclopedia</i> (Vol. 22, p. 285). Collier."
  },

  /* ============ PERIODICALS ============ */
  "journal-with-doi": {
    label: "Journal article – with DOI",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "issue", "pages", "doi"],
    placeholders: {
      authors: "Milton, C. L.",
      year: "2009",
      title: "Leadership and ethics in nurse-nurse relationships.",
      container: "Nursing Science Quarterly",
      volume: "22",
      issue: "2",
      pages: "116–119",
      publisher: "",
      doi: "https://doi.org/10.1177/0894318409332569"
    },
    example:
      "Milton, C. L. (2009). Leadership and ethics in nurse-nurse relationships. <i>Nursing Science Quarterly, 22</i>(2), 116–119. https://doi.org/10.1177/0894318409332569"
  },

  "journal-without-doi": {
    label: "Journal article – without DOI",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "issue", "pages"],
    placeholders: {
      authors: "Hepworth, D., Littlepage, B., & Hancock, K.",
      year: "2018",
      title: "Factors influencing university student academic success.",
      container: "Educational Research Quarterly",
      volume: "42",
      issue: "1",
      pages: "45–61",
      publisher: "",
      doi: ""
    },
    example:
      "Hepworth, D., Littlepage, B., & Hancock, K. (2018). Factors influencing university student academic success. <i>Educational Research Quarterly, 42</i>(1), 45–61."
  },

  "journal-no-issue": {
    label: "Journal article – no issue number",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "pages", "doi"],
    placeholders: {
      authors: "Lessard, L. M., & Juvonen, J.",
      year: "2018",
      title:
        "Losing and gaining friends: Does friendship instability compromise academic functioning in middle school.",
      container: "Journal of School Psychology",
      volume: "69",
      issue: "",
      pages: "143–153",
      publisher: "",
      doi: "https://doi.org/10.1016/j.jsp.2018.05.003"
    },
    example:
      "Lessard, L. M., & Juvonen, J. (2018). Losing and gaining friends: Does friendship instability compromise academic functioning in middle school. <i>Journal of School Psychology, 69</i>, 143–153. https://doi.org/10.1016/j.jsp.2018.05.003"
  },

  "journal-21plus": {
    label: "Journal article – 21 or more authors",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "issue", "pages", "doi"],
    placeholders: {
      authors:
        "Cappella, E., Schwartz, K., Hill, J., Kim, H. Y., Seidman, E., ... [first 19] ... Smith, F.",
      year: "2019",
      title: "Use 19 authors, an ellipsis, and the final author.",
      container: "Example Journal",
      volume: "10",
      issue: "1",
      pages: "1–10",
      publisher: "",
      doi: ""
    },
    example:
      "Cappella, E., Schwartz, K., Hill, J., Kim, H. Y., Seidman, E., ... Smith, F. (2019). [Journal article with 21 or more authors]. <i>Example Journal, 10</i>(1), 1–10."
  },

  "newspaper-database": {
    label: "Newspaper article – from database",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "issue", "pages"],
    placeholders: {
      authors: "Stockman, F.",
      year: "2018, December 24",
      title: "Anti-Semitism accusations roil women’s march.",
      container: "New York Times",
      volume: "168",
      issue: "58186",
      pages: "A1–A13",
      publisher: "",
      doi: ""
    },
    example:
      "Stockman, F. (2018, December 24). Anti-Semitism accusations roil women’s march. <i>New York Times, 168</i>(58186), A1–A13."
  },

  "newspaper-web": {
    label: "Newspaper article – from web",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "Dvorak, P.",
      year: "2020, January 20",
      title:
        "Marching around with guns on your chest? That’s all about fear.",
      container: "Washington Post",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://www.washingtonpost.com/local/marching-around-with-guns-on-your-chest-thats-all-about-fear/2020/01/20/077f3af0-3bc2-11ea-baca-eb7ace0a3455_story.html"
    },
    example:
      "Dvorak, P. (2020, January 20). Marching around with guns on your chest? That’s all about fear. <i>Washington Post</i>. https://www.washingtonpost.com/local/marching-around-with-guns-on-your-chest-thats-all-about-fear/2020/01/20/077f3af0-3bc2-11ea-baca-eb7ace0a3455_story.html"
  },

  "magazine-database": {
    label: "Magazine article – from database",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "issue", "pages"],
    placeholders: {
      authors: "Zikmund, B. B., & Lummis, A. T.",
      year: "1998, May 6",
      title: "Women, men and styles of clergy leadership.",
      container: "Christian Century",
      volume: "115",
      issue: "14",
      pages: "478",
      publisher: "",
      doi: ""
    },
    example:
      "Zikmund, B. B., & Lummis, A. T. (1998, May 6). Women, men and styles of clergy leadership. <i>Christian Century, 115</i>(14), 478."
  },

  "magazine-web": {
    label: "Magazine article – from web",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "Schindler, J.",
      year: "2019, January 7",
      title: "Leading with ethics.",
      container: "Forbes",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://www.forbes.com/sites/forbescoachescouncil/2019/01/07/leading-with-ethics/"
    },
    example:
      "Schindler, J. (2019, January 7). Leading with ethics. <i>Forbes</i>. https://www.forbes.com/sites/forbescoachescouncil/2019/01/07/leading-with-ethics/"
  },

  "editorial": {
    label: "Editorial (journal)",
    group: "journal",
    visibleFields: ["authors", "year", "title", "container", "volume", "issue", "pages", "doi"],
    placeholders: {
      authors: "Vogus, T. J.",
      year: "2020",
      title:
        "Rethinking critical advancements: Taking stock and moving forward conceptually [Editorial].",
      container: "Health Care Management Review",
      volume: "45",
      issue: "1",
      pages: "1–2",
      publisher: "",
      doi: "https://doi.org/10.1097/HMR.0000000000000274"
    },
    example:
      "Vogus, T. J. (2020). Rethinking critical advancements: Taking stock and moving forward conceptually [Editorial]. <i>Health Care Management Review, 45</i>(1), 1–2. https://doi.org/10.1097/HMR.0000000000000274"
  },

  /* ============ DISSERTATIONS ============ */
  "thesis-database": {
    label: "Thesis / dissertation – from database",
    group: "thesis",
    visibleFields: ["authors", "year", "title", "publisher", "doi"],
    placeholders: {
      authors: "Berry, R. S.",
      year: "2001",
      title:
        "Children’s environmental print: Reliability, validity, and relationship to early reading.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher:
        "(Publication No. 3007766) [Doctoral dissertation, University of North Carolina at Chapel Hill]. ProQuest Dissertations and Theses Global.",
      doi: ""
    },
    example:
      "Berry, R. S. (2001). <i>Children’s environmental print: Reliability, validity, and relationship to early reading</i> (Publication No. 3007766) [Doctoral dissertation, University of North Carolina at Chapel Hill]. ProQuest Dissertations and Theses Global."
  },

  "thesis-unpublished": {
    label: "Thesis / dissertation – unpublished",
    group: "thesis",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Caballero, S.",
      year: "2004",
      title: "How to teach first graders.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher:
        "[Unpublished master’s thesis]. University of Wisconsin–Madison.",
      doi: ""
    },
    example:
      "Caballero, S. (2004). <i>How to teach first graders</i> [Unpublished master’s thesis]. University of Wisconsin–Madison."
  },

  "thesis-online": {
    label: "Thesis / dissertation – online (not in database)",
    group: "thesis",
    visibleFields: ["authors", "year", "title", "publisher", "doi"],
    placeholders: {
      authors: "Ries, N.",
      year: "2016",
      title:
        "A community youth organization’s contribution to immigrant students’ academic success and identity formation.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "[Master’s monograph, Stanford University]. SearchWorks Catalog.",
      doi: "https://searchworks.stanford.edu/view/11881782"
    },
    example:
      "Ries, N. (2016). <i>A community youth organization’s contribution to immigrant students’ academic success and identity formation</i> [Master’s monograph, Stanford University]. SearchWorks Catalog. https://searchworks.stanford.edu/view/11881782"
  },

  /* ============ MEETINGS / REPORTS ============ */
  "meeting-unpublished-paper": {
    label: "Conference / meeting paper – unpublished",
    group: "meeting",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Buchmann, R.",
      year: "2008, April",
      title:
        "Informal information seeking as done by college students.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher:
        "Poster session presented at the meeting of Wisconsin Association of Academic Librarians, Manitowoc, WI.",
      doi: ""
    },
    example:
      "Buchmann, R. (2008, April). Informal information seeking as done by college students. Poster session presented at the meeting of Wisconsin Association of Academic Librarians, Manitowoc, WI."
  },

  "annual-report": {
    label: "Annual report",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "doi"],
    placeholders: {
      authors: "Proctor & Gamble.",
      year: "2019",
      title: "2019 Annual report and proxy statement.",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://www.pginvestor.com/CustomPage/Index?KeyGenPage=1073748359"
    },
    example:
      "Proctor & Gamble. (2019). <i>2019 Annual report and proxy statement</i>. https://www.pginvestor.com/CustomPage/Index?KeyGenPage=1073748359"
  },

  "company-profile": {
    label: "Company profile",
    group: "webpage",
    visibleFields: ["authors", "year", "title"],
    placeholders: {
      authors: "MarketLine.",
      year: "2019, July 26",
      title: "Hallmark Cards, Inc. [Company profile].",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: ""
    },
    example:
      "MarketLine. (2019, July 26). Hallmark Cards, Inc. [Company profile]."
  },

  /* ============ ELECTRONIC / MEDIA ============ */
  "music-album": {
    label: "Music album",
    group: "music",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Holiday, B.",
      year: "2001",
      title: "Best of Billy Holiday [Album].",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Columbia",
      doi: ""
    },
    example:
      "Holiday, B. (2001). <i>Best of Billy Holiday</i> [Album]. Columbia."
  },

  "music-classical": {
    label: "Music album – classical works",
    group: "music",
    visibleFields: ["authors", "year", "title", "publisher"],
    placeholders: {
      authors: "Beethoven, L. van.",
      year: "1987",
      title:
        "Symphony no. 9 [Album recorded by the Chicago Symphony Orchestra].",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "Decca. (Original composition date 1824)",
      doi: ""
    },
    example:
      "Beethoven, L. van. (1987). <i>Symphony no. 9</i> [Album recorded by the Chicago Symphony Orchestra]. Decca. (Original composition date 1824)."
  },

  "encyclopedia-online": {
    label: "Encyclopedia entry – online",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "Grayson, K. A., Kotler, P., & Hibbard, J. D.",
      year: "2020, January 9",
      title: "Marketing.",
      container: "Encyclopaedia Britannica Online.",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://www.britannica.com/topic/marketing"
    },
    example:
      "Grayson, K. A., Kotler, P., & Hibbard, J. D. (2020, January 9). Marketing. <i>Encyclopaedia Britannica Online</i>. https://www.britannica.com/topic/marketing"
  },

  "eric-document": {
    label: "ERIC document (ED, non-journal)",
    group: "eric",
    visibleFields: ["authors", "year", "title", "doi"],
    placeholders: {
      authors: "Militante, D. A. K.",
      year: "2006",
      title:
        "Read aloud versus shared reading: The effects on vocabulary acquisition, comprehension, and fluency (ED491543).",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "http://files.eric.ed.gov/fulltext/ED491543.pdf"
    },
    example:
      "Militante, D. A. K. (2006). <i>Read aloud versus shared reading: The effects on vocabulary acquisition, comprehension, and fluency</i> (ED491543). ERIC. http://files.eric.ed.gov/fulltext/ED491543.pdf"
  },

  "blog-post": {
    label: "Blog post",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "Males, J.",
      year: "2020, January 20",
      title: "Introducing the future crops collection.",
      container: "Everyone.",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://blogs.plos.org/everyone/2020/01/20/introducing-the-future-crops-collection/"
    },
    example:
      "Males, J. (2020, January 20). Introducing the future crops collection. <i>Everyone</i>. https://blogs.plos.org/everyone/2020/01/20/introducing-the-future-crops-collection/"
  },

  "facebook-post": {
    label: "Facebook post",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "National Institutes of Health.",
      year: "2020, February 13",
      title:
        "Low-dose aspirin reduces preterm birth among first-time mothers.",
      container: "Facebook.",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://bit.ly/37rE1bU"
    },
    example:
      "National Institutes of Health. (2020, February 13). Low-dose aspirin reduces preterm birth among first-time mothers. <i>Facebook</i>. https://bit.ly/37rE1bU"
  },

  "video-youtube": {
    label: "Video – YouTube / streaming",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "doi"],
    placeholders: {
      authors: "School of Rock.",
      year: "2019, September 3",
      title:
        "School of Rock students perform “California Dreamin” by the Mamas & the Papas [Video].",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://www.youtube.com/watch?v=GlG-vN8i9Qc"
    },
    example:
      "School of Rock. (2019, September 3). School of Rock students perform “California Dreamin” by the Mamas & the Papas [Video]. YouTube. https://www.youtube.com/watch?v=GlG-vN8i9Qc"
  },

  "video-ted-site": {
    label: "TED Talk – viewed on ted.com",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "publisher", "doi"],
    placeholders: {
      authors: "Cuddy, A.",
      year: "2012, June",
      title:
        "Your body language may shape who you are [Video].",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "TED Conferences.",
      doi: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are"
    },
    example:
      "Cuddy, A. (2012, June). Your body language may shape who you are [Video]. TED Conferences. https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are"
  },

  "video-ted-youtube": {
    label: "TED Talk – viewed on YouTube",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "doi"],
    placeholders: {
      authors: "TED.",
      year: "2019, January 24",
      title:
        "Lydia Machová: The secrets of learning a new language [Video].",
      container: "",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://www.youtube.com/watch?v=o_XVt5rdpFY"
    },
    example:
      "TED. (2019, January 24). Lydia Machová: The secrets of learning a new language [Video]. YouTube. https://www.youtube.com/watch?v=o_XVt5rdpFY"
  },

  /* ============ WEBPAGE ============ */
  "webpage": {
    label: "Webpage on a website",
    group: "webpage",
    visibleFields: ["authors", "year", "title", "container", "doi"],
    placeholders: {
      authors: "Chi, C.",
      year: "2018, July 30",
      title:
        "4 management styles to strive for, and 4 to avoid.",
      container: "HubSpot.",
      volume: "",
      issue: "",
      pages: "",
      publisher: "",
      doi: "https://blog.hubspot.com/marketing/management-styles"
    },
    example:
      "Chi, C. (2018, July 30). 4 management styles to strive for, and 4 to avoid. <i>HubSpot</i>. https://blog.hubspot.com/marketing/management-styles"
  },

  "generic": {
    label: "Generic / custom",
    group: "generic",
    visibleFields: [
      "authors",
      "year",
      "title",
      "container",
      "volume",
      "issue",
      "pages",
      "publisher",
      "doi"
    ],
    placeholders: {
      authors: "Last, F. M.",
      year: "Year",
      title: "Title of work in sentence case.",
      container: "Source / journal / book name",
      volume: "22",
      issue: "2",
      pages: "116–119",
      publisher: "Publisher / institution",
      doi: "https://doi.org/10.xxxx/xxxxx"
    },
    example:
      "Author, A. A. (Year). Title of work in sentence case. <i>Source Title, 22</i>(2), xx–xx. https://doi.org/10.xxxx/xxxxx"
  }
};

const FIELD_IDS = {
  authors: "authors-input",
  year: "year-input",
  title: "title-input",
  container: "container-input",
  volume: "volume-input",
  issue: "issue-input",
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

function getInputValue(id) {
  const el = document.getElementById(id);
  return el ? clean(el.value) : "";
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
  // Ensure we never break if paper is weird
  if (!paper || typeof paper !== "object") {
    return "";
  }

  const authors = formatAuthorsFromMerged(paper.authors || []);
  const year = paper.year || "n.d.";
  const title = toSentenceCase(paper.title || "");

  // Journal info – support merged + raw S2
  const j = paper.journal || {};
  const journalName = j.name || paper.venue || "";
  const volume = j.volume || paper.volume || "";
  const issue = j.issue || paper.issue || "";
  const pagesRaw = j.pages || paper.pages || "";

  // Normalize pages: use en dash between numbers when written with hyphen
  const pages = pagesRaw
    ? pagesRaw.replace(/(\d)\-(\d)/g, "$1–$2")
    : "";

  // DOI
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

  // URL – do NOT use Semantic Scholar URL when there’s no DOI
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

  // Journal block – APA: Journal, volume(issue), pages.
  if (journalName) {
    ref += `${journalName}`;
    if (volume) {
      // volume italic, issue plain
      ref += `, <i>${volume}</i>`;
      if (issue) {
        ref += `(${issue})`;
      }
    }
    if (pages) {
      ref += `, ${pages}`;
    }
  }

  // End punctuation + DOI/URL
  if (doi) {
    ref += `. ${doi}`;
  } else if (url) {
    ref += `. ${url}`;
  } else {
    ref += ".";
  }

  // Only remove stray spaces before periods, not the period itself
  ref = ref.replace(/\s+\./g, ".");
  return String(ref).trim();
}



/* ============================================================
   MANUAL FORM: TYPE HANDLING
   ============================================================ */

function updateManualFormForType(type) {
  const cfg = CONTENT_TYPES[type] || CONTENT_TYPES["generic"];
  const needed = new Set(cfg.visibleFields || []);

  // Show/hide fields
  document.querySelectorAll(".field-group").forEach((group) => {
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

  // Show example from the manual
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

const authors   = getInputValue("authors-input");
const year      = getInputValue("year-input");
const title     = getInputValue("title-input");
const container = getInputValue("container-input");
const volume    = getInputValue("volume-input");
const issue     = getInputValue("issue-input");
const pages     = getInputValue("pages-input");
const publisher = getInputValue("publisher-input");
const doiUrl    = getInputValue("doi-input");


  const errorBox = document.getElementById("manual-error");
  errorBox.style.display = "none";

  if (group !== "encyclopedia" && group !== "generic") {
    if (!authors && cfg.visibleFields.includes("authors")) {
      errorBox.textContent = "Author(s) is required for this content type.";
      errorBox.style.display = "block";
      return "";
    }
    if (!year && cfg.visibleFields.includes("year")) {
      errorBox.textContent = "Year / date is required for this content type.";
      errorBox.style.display = "block";
      return "";
    }
    if (!title && cfg.visibleFields.includes("title")) {
      errorBox.textContent = "Title is required for this content type.";
      errorBox.style.display = "block";
      return "";
    }
  }

  let ref = "";

  if (authors) {
    ref += authors;
  }
  if (year) {
    ref += ` (${year}). `;
  } else if (authors) {
    ref += ". ";
  }

  if (title) {
    ref += title.endsWith(".") ? `${title} ` : `${title}. `;
  }

  if (group === "journal") {
    if (container) {
      ref += `<i>${container}</i>`;
    }
    if (volume) {
      ref += container ? `, <i>${volume}</i>` : `<i>${volume}</i>`;
      if (issue) {
        ref += `(${issue})`;
      }
    } else if (issue) {
      // rare case: issue only (unlikely, but just in case)
      ref += container ? `, (${issue})` : `(${issue})`;
    }
    if (pages) {
      ref += (container || volume || issue ? ", " : "") + pages;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else {
      ref += ".";
    }
  } else if (group === "book") {
    if (container) {
      ref += `<i>${container}</i>`;
      if (volume) {
        ref += ` (${volume})`;
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
  } else if (group === "meeting") {
    if (publisher) {
      ref += publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (publisher) {
      ref += ".";
    }
  } else if (group === "music") {
    if (publisher) {
      ref += publisher;
    }
    if (doiUrl) {
      ref += `. ${doiUrl}`;
    } else if (publisher) {
      ref += ".";
    }
  } else if (group === "eric") {
    if (doiUrl) {
      ref += `ERIC. ${doiUrl}`;
    } else {
      ref += ".";
    }
  } else if (group === "webpage") {
    if (container) {
      ref += `${container} `;
    }
    if (publisher) {
      ref += publisher + " ";
    }
    if (doiUrl) {
      ref += doiUrl;
    } else if (container || publisher) {
      ref = ref.trimEnd() + ".";
    }
  } else {
    if (container) {
      ref += `${container}`;
      if (volume) {
        ref += `, <i>${volume}</i>`;
        if (issue) {
          ref += `(${issue})`;
        }
      }
    }
    if (pages) {
      ref += (container || volume || issue ? ", " : "") + pages;
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

  // Clean up: remove extra spaces before periods, but keep the periods
  ref = ref.replace(/\s+\./g, ".");
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
  const rawRef = apaReferenceFromPaper(paper);
  const ref = String(rawRef || "").trim();

  const box = document.getElementById("s2-citation");
  const btn = document.getElementById("s2-copy-btn");

  if (!ref) {
    box.classList.remove("empty");
    box.innerHTML = "<span class=\"citation-line\">No reference could be generated.</span>";
    btn.disabled = true;
    return;
  }

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

/* ============================================================
   THEME TOGGLE + LOCAL STORAGE
   ============================================================ */

(function setupThemeToggle() {
  const THEME_KEY = "apa-7th-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    const normalized = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalized);
    localStorage.setItem(THEME_KEY, normalized);
  }

  // Initial theme: localStorage → system preference → dark
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else {
    const prefersLight = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  }

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
})();

