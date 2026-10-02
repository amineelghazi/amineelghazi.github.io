import { useLang } from "./useLang.js";

/** Returns a function that picks the current language from a { fr, en } object. */
export function useTr() {
  const { lang } = useLang();
  return (field) => field[lang] ?? field.fr;
}
