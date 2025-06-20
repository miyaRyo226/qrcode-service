import "../../styles/globals.css";

// 事前に静的なページに生成する
export async function generateStaticParams() {
	return [{ lang: "ja" }, { lang: "en" }];
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: "ja" | "en" }>;
}>) {
	const { lang } = await params;

	return (
		<html lang={lang}>
			<body>{children}</body>
		</html>
	);
}
