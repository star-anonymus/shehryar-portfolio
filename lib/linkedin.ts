import { absoluteUrl } from "./site";

/**
 * LinkedIn's public share intent.
 *
 * It takes a URL and nothing else — LinkedIn scrapes the target page's
 * Open Graph tags for the title, description and image. Any `text`/`summary`
 * parameter you may have seen in older snippets has been ignored since 2021,
 * which is why every shareable page here ships its own `opengraph-image`.
 *
 * No API key, no OAuth, no app review.
 */
export function linkedInShareUrl(path: string) {
  const url = absoluteUrl(path);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

/** Opens the LinkedIn composer with the post text already in the box. */
export function linkedInComposeUrl(text: string) {
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
}

export const SHARE_WINDOW_FEATURES =
  "width=680,height=640,menubar=no,toolbar=no,resizable=yes,scrollbars=yes";
