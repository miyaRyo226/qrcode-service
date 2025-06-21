import fs from "node:fs/promises";
import path from "node:path";
import { dictionarySchema } from "../src/types/dictionary.ts";

const dictionariesDir = path.join(
	process.cwd(),
	"src",
	"app",
	"[lang]",
	"dictionaries",
);

const checkFile = async (filePath) => {
	try {
		const fileContent = await fs.readFile(filePath, "utf-8");
		const json = JSON.parse(fileContent);
		dictionarySchema.parse(json);
		console.log(`✅ ${filePath} is valid.`);
	} catch (error) {
		console.error(`❌ ${filePath} is invalid:`, error);
		process.exit(1);
	}
};

const main = async () => {
	await checkFile(path.join(dictionariesDir, "en.json"));
	await checkFile(path.join(dictionariesDir, "ja.json"));
};

main();
