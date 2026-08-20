export type SplitTextMode = "words" | "letters";

export type SplitTextOptions = {
  mode?: SplitTextMode;
};

export type SplitTextResult = {
  words: HTMLSpanElement[];
  letters: HTMLSpanElement[];
  revert: () => void;
};

type SplitBuckets = {
  words: HTMLSpanElement[];
  letters: HTMLSpanElement[];
};

function createUnitSpan(kind: "word" | "letter" | "space"): HTMLSpanElement {
  const span = document.createElement("span");
  span.dataset.split = kind;
  if (kind !== "space") {
    span.style.display = "inline-block";
  }
  return span;
}

function appendSpace(parent: HTMLElement, whitespace: string): void {
  const space = createUnitSpan("space");
  space.textContent = whitespace;
  parent.append(space);
}

function fillWordWithLetters(
  wordSpan: HTMLSpanElement,
  word: string,
  letters: HTMLSpanElement[],
): void {
  for (const character of word) {
    const letterSpan = createUnitSpan("letter");
    letterSpan.textContent = character;
    wordSpan.append(letterSpan);
    letters.push(letterSpan);
  }
}

function appendWord(
  parent: HTMLElement,
  word: string,
  mode: SplitTextMode,
  buckets: SplitBuckets,
): void {
  const wordSpan = createUnitSpan("word");
  if (mode === "letters") {
    fillWordWithLetters(wordSpan, word, buckets.letters);
  } else {
    wordSpan.textContent = word;
  }
  parent.append(wordSpan);
  buckets.words.push(wordSpan);
}

function fillElementFromText(
  element: HTMLElement,
  text: string,
  mode: SplitTextMode,
  buckets: SplitBuckets,
): void {
  for (const token of text.split(/(\s+)/)) {
    if (token.length === 0) {
      continue;
    }
    if (/^\s+$/.test(token)) {
      appendSpace(element, token);
      continue;
    }
    appendWord(element, token, mode, buckets);
  }
}

export function splitText(
  element: HTMLElement,
  options: SplitTextOptions = {},
): SplitTextResult {
  const mode = options.mode ?? "words";
  const originalHtml = element.innerHTML;
  const text = element.textContent ?? "";
  const buckets: SplitBuckets = { words: [], letters: [] };

  element.replaceChildren();
  fillElementFromText(element, text, mode, buckets);

  return {
    words: buckets.words,
    letters: buckets.letters,
    revert() {
      element.innerHTML = originalHtml;
    },
  };
}
