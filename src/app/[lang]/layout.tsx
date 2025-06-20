import "../../styles/globals.css";

// 事前に静的なページに生成する
export function generateStaticParams() {
	return [{ lang: "ja" }, { lang: "en" }];
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { lang: "ja" | "en" };
}>) {
	const { lang } = params;

	return (
		<html lang={lang}>
			<body>{children}</body>
		</html>
	);
}
