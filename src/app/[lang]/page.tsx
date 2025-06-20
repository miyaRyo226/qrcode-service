import HomeClient from "../../components/page/root";
import { getDictionary } from "./dictionaries";

export default async function Home({
	params,
}: {
	params: Promise<{ lang: "ja" | "en" }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return <HomeClient dict={dict} lang={lang} />;
}
