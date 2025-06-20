import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const locales = ["ja", "en"];
const defaultLocale = "ja";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: Request) {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value;
	});

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	return match(languages, locales, defaultLocale);
}

export function middleware(request: Request) {
	// Check if there is any supported locale in the pathname
	const pathname = new URL(request.url).pathname;

	// トップページ（/）の場合は、ブラウザの言語設定に基づいてリダイレクト
	if (pathname === "/") {
		const locale = getLocale(request);
		const newUrl = new URL(request.url);
		newUrl.pathname = `/${locale}`;
		return NextResponse.redirect(newUrl);
	}

	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) {
		return;
	}

	// その他のパスの場合は、デフォルトロケールにリダイレクト
	const locale = getLocale(request);
	const newUrl = new URL(request.url);
	newUrl.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(newUrl);
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next).*)",
		// Optional: only run on root (/) URL
		// '/'
	],
};
