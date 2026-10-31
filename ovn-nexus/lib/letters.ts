/**
 * Thad's three letters, and where to subscribe to each.
 *
 * The Practice Ledger and 1840 are sent from one Ghost site, letters.ovnnexus.com,
 * where a single signup brings both and /newsletters/ lets a reader keep one.
 * That host sits under ovnnexus.com, which VA networks allow, so clinicians on
 * VA machines can subscribe from here. The Quantum Distillery is its own Ghost
 * site.
 */

export const LETTERS_SITE = "https://letters.ovnnexus.com";
export const LETTERS_SIGNUP = `${LETTERS_SITE}/#/portal/signup`;
export const LETTERS_CHOOSER = `${LETTERS_SITE}/newsletters/`;

export const ORCID = "0009-0003-4800-3913";
export const ORCID_URL = `https://orcid.org/${ORCID}`;

/** Channel ID URL rather than the handle, so it survives the channel rename. */
export const YOUTUBE_URL = "https://www.youtube.com/channel/UC3thFE5bh0MLD2ywJ1KQ-rg";

export interface Letter {
  id: "ledger" | "1840" | "pours";
  name: string;
  pitch: string;
  audience: string;
  cadence: string;
  readUrl: string;
  signupUrl: string;
}

export const LETTERS: Letter[] = [
  {
    id: "1840",
    name: "1840",
    pitch: "Undo 1840. The dispatch on putting the mouth back in the body.",
    audience: "Dentists, hygienists and physicians",
    cadence: "Thursdays",
    readUrl: `${LETTERS_SITE}/`,
    signupUrl: LETTERS_SIGNUP,
  },
  {
    id: "ledger",
    name: "The Practice Ledger",
    pitch: "What AI is changing in the economics of dental practice, and what it costs.",
    audience: "Dentists, practice owners and DSO leaders",
    cadence: "Sundays",
    readUrl: `${LETTERS_SITE}/`,
    signupUrl: LETTERS_SIGNUP,
  },
  {
    id: "pours",
    name: "The Quantum Distillery",
    pitch: "Quantum mechanics meets biology, one word per pour.",
    audience: "Curious minds in science and medicine",
    cadence: "Every other Wednesday",
    readUrl: "https://pours.thequantumdistillery.com/",
    signupUrl: "https://pours.thequantumdistillery.com/#/portal/signup",
  },
];
