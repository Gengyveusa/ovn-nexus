/**
 * JSON-LD structured data for OVN Nexus.
 *
 * WHY THIS EXISTS
 * ---------------
 * The site previously emitted no structured data at all. For a platform whose
 * differentiator is that every scientific claim carries an explicit evidence
 * tier, that is the largest single gap: the tiers were a visual convention with
 * no machine-readable counterpart, so an answer engine had no way to know that
 * "Established" and "Hypothesis Under Active Testing" mean different things.
 *
 * @id values are stable URIs. Keep them constant across edits so the entity
 * graph accumulates rather than forking — they are the join keys that let a
 * crawler recognise the Organization on this page as the same Organization it
 * saw elsewhere.
 */

export const SITE_URL = "https://www.ovnnexus.com";

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** The founder. Credentials match the byline used on /science. */
export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Stephen Thaddeus Connelly",
  alternateName: [
    "S. Thaddeus Connelly",
    "Stephen Connelly",
    "Thaddeus Connelly",
    "Thad Connelly",
  ],
  honorificSuffix: "DDS, MD, PhD, FACS",
  jobTitle: "Founder",
  description:
    "Oral and maxillofacial surgeon-scientist. Residency Program Director in Oral and Maxillofacial Surgery at the San Francisco VA Health Care System and clinical faculty at the University of California, San Francisco.",
  affiliation: [
    { "@type": "Organization", name: "University of California, San Francisco" },
    { "@type": "Organization", name: "San Francisco VA Health Care System" },
  ],
  worksFor: { "@id": ORG_ID },
  knowsAbout: [
    "Oral and maxillofacial surgery",
    "Oral-systemic disease",
    "Bacterial extracellular vesicles",
    "Periodontal medicine",
    "Outer membrane vesicles",
  ],
  sameAs: [
    "https://www.linkedin.com/in/stephen-thaddeus-connelly-8954024b",
    "https://www.ucsfdentalcenter.org/providers/stephen-connelly-dds-md-phd",
    "https://thequantumdistillery.com/",
  ],
};

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "OVN Nexus",
  alternateName: "Oral-Vascular-Neural Nexus",
  url: SITE_URL,
  description:
    "The research platform behind Gengyve, mapping how oral disease reaches the heart, brain, and body. Every claim is graded against a three-tier evidence framework.",
  founder: { "@id": PERSON_ID },
  parentOrganization: { "@type": "Organization", name: "GengyveUSA" },
  knowsAbout: [
    "Oral-systemic disease",
    "The Oral-Vascular-Neural Axis",
    "Outer membrane vesicles",
    "Periodontal medicine",
    "Bacterial extracellular vesicles",
    "Evidence-based dentistry",
  ],
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "OVN Nexus",
  description: "The oral–systemic connection, studied deeper than anyone.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

/**
 * Terms from the Connelly Lexicon that this site defines. Emitting these as
 * DefinedTerm is what lets an answer engine treat "the OVN Axis" as a named
 * concept with an owner rather than an unattributed phrase.
 */
export const definedTermNodes = [
  {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/#ovn-axis`,
    name: "The Oral-Vascular-Neural Axis",
    alternateName: "OVN Axis",
    description:
      "The proposed pathway by which oral pathogens and their extracellular vesicles contribute to vascular, oncological, and neurodegenerative disease. Presented with explicit evidence tiers rather than as a settled mechanism.",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "The Connelly Lexicon",
      url: "https://corpus.gengyveusa.com/",
    },
  },
  {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/#biomineralization-hypothesis`,
    name: "The Biomineralization Hypothesis",
    description:
      "A hypothesis under active testing proposing that oral-pathogen-derived signals can drive pathological calcification in distant tissues, as one arm of a conserved cellular reprogramming program. Explicitly hypothesis-tier: biologically plausible, not clinically established.",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "The Connelly Lexicon",
      url: "https://corpus.gengyveusa.com/",
    },
  },
  {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/#network-medicine-mouth-outward`,
    name: "Network Medicine, Mouth Outward",
    description:
      "The framing that systemic diseases share upstream drivers and are best understood as a connected network, with the mouth as a uniquely accessible and modifiable entry point into that network.",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "The Connelly Lexicon",
      url: "https://corpus.gengyveusa.com/",
    },
  },
  {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/#terminal-event-pedagogy`,
    name: "Terminal Event Pedagogy",
    description:
      "A teaching method that begins at a clinical collapse or terminal event and works backward through progressively smaller biological scales to the originating mechanism, so the learner encounters the stakes before the biology.",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "The Connelly Lexicon",
      url: "https://corpus.gengyveusa.com/",
    },
  },
];

/** Site-wide graph, emitted once from the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode, personNode, websiteNode, ...definedTermNodes],
  };
}

/**
 * The research presentation at /science.
 *
 * MedicalWebPage rather than plain WebPage because the content is clinical, and
 * because it carries the fields that matter here: an identified author with
 * credentials, and an explicit statement of how the evidence is graded.
 */
export function sciencePageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/science#webpage`,
        url: `${SITE_URL}/science`,
        name: "The Oral-Vascular-Neural Axis — OVN Nexus",
        description:
          "Bacterial extracellular vesicles as a candidate oral-systemic disease interface. Every claim is graded as Established, Supported, or Hypothesis Under Active Testing.",
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en-US",
        about: [
          { "@id": `${SITE_URL}/#ovn-axis` },
          { "@id": `${SITE_URL}/#biomineralization-hypothesis` },
        ],
        // The three-tier framework, stated so a machine can read the epistemics
        // rather than inferring them from badge colours.
        significantLink: `${SITE_URL}/education`,
        mainContentOfPage: {
          "@type": "WebPageElement",
          description:
            "Claims are classified into three evidence tiers: Established (supported by meta-analyses and systematic reviews), Supported but Not Yet Settled (strong preclinical and mechanistic evidence, not confirmed in human prospective studies), and Hypothesis Under Active Testing (scientifically grounded but unproven, requiring prospective human data).",
        },
      },
    ],
  };
}

/** A single Oral Health Bulletin edition. */
export function bulletinArticleGraph(edition: {
  title: string;
  slug: string;
  url: string;
  published_at: string;
  excerpt: string;
  tags: string[];
  series: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}/blog/${edition.slug}#article`,
        headline: edition.title,
        description: edition.excerpt.slice(0, 300),
        datePublished: edition.published_at,
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
        keywords: edition.tags.join(", "),
        articleSection: edition.series,
        isPartOf: {
          "@type": "Periodical",
          name: "The Oral Health Bulletin",
          publisher: { "@id": ORG_ID },
        },
        // mainEntityOfPage tracks the <link rel="canonical"> on this route,
        // which currently points at the LinkedIn edition because that is where
        // the full text lives. If the full text moves onto this domain, both
        // this and the canonical should change together — they must not
        // disagree, or the two signals cancel out.
        mainEntityOfPage: edition.url,
      },
    ],
  };
}

/** Serialise for a <script type="application/ld+json"> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data) };
}
