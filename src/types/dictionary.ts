import { z } from "zod";

export const dictionarySchema = z.object({
	title: z.string(),
	ssid: z.string(),
	password: z.string(),
	ssidPlaceholder: z.string(),
	passwordPlaceholder: z.string(),
	clearButton: z.string(),
	generateButton: z.string(),
	alertMessage: z.string(),
	lightMode: z.string(),
	darkMode: z.string(),
});

export type Dictionary = z.infer<typeof dictionarySchema>;
