import "server-only";
import type { Dictionary } from "../../types/dictionary";

const dictionaries: Record<string, () => Promise<Dictionary>> = {
	ja: () => import("./dictionaries/ja.json").then((module) => module.default),
	en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
	const dictionaryLoader = dictionaries[locale] ?? dictionaries["en"];
	if (dictionaryLoader) {
		return dictionaryLoader();
	}
	// Fallback for an unexpected case where 'en' is not in dictionaries.
	return Promise.resolve({} as Dictionary);
};
