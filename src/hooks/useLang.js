import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext.jsx";

export const useLang = () => useContext(LanguageContext);
