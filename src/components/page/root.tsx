"use client";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import type { Dictionary } from "../../types/dictionary";

export default function HomeClient({
	dict,
	lang,
}: {
	dict: Dictionary;
	lang: string;
}) {
	const [ssid, setSsid] = useState("");
	const [password, setPassword] = useState("");
	const [canMakeQRCode, setCanMakeQRCode] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check for saved theme preference or default to light mode
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		setIsDarkMode(prefersDark);
	}, []);

	const toggleTheme = () => {
		const newTheme = !isDarkMode;
		setIsDarkMode(newTheme);

		if (newTheme) {
			document.documentElement.style.colorScheme = "dark";
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.style.colorScheme = "light";
			localStorage.setItem("theme", "light");
		}
	};

	const toggleLocale = () => {
		const newLang = lang === "ja" ? "en" : "ja";
		router.push(`/${newLang}`);
	};

	return (
		<>
			<div className={styles["headerControls"]}>
				<button
					type="button"
					className="theme-toggle"
					onClick={toggleTheme}
					aria-label={isDarkMode ? dict.lightMode : dict.darkMode}
				>
					{isDarkMode ? "☀️" : "🌙"}
				</button>
				<button
					type="button"
					className="locale-toggle"
					onClick={toggleLocale}
					aria-label={lang === "ja" ? "Switch to English" : "日本語に切り替え"}
				>
					{lang === "ja" ? "🇺🇸" : "🇯🇵"}
				</button>
			</div>
			<h1 className={styles["title"]}>{dict.title}</h1>
			<div className={styles["container"]}>
				<main className={styles["main"]}>
					<div className={styles["inputGroup"]}>
						<label htmlFor="ssid-input" className={styles["label"]}>
							{dict.ssid}
						</label>
						<input
							id="ssid-input"
							type="text"
							className={styles["inputField"]}
							placeholder={dict.ssidPlaceholder}
							value={ssid}
							onChange={(e) => setSsid(e.target.value)}
						/>
					</div>
					<div className={styles["inputGroup"]}>
						<label htmlFor="password-input" className={styles["label"]}>
							{dict.password}
						</label>
						<input
							id="password-input"
							type="password"
							className={styles["inputField"]}
							placeholder={dict.passwordPlaceholder}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={styles["buttonContainer"]}>
						<button
							type="button"
							className={`${styles["button"]} ${styles["clearButton"]}`}
							onClick={() => {
								setSsid("");
								setPassword("");
								setCanMakeQRCode(false);
							}}
						>
							{dict.clearButton}
						</button>
						<button
							type="button"
							className={`${styles["button"]} ${styles["generateButton"]}`}
							onClick={() => {
								if (ssid.length > 0 && password.length > 0) {
									setCanMakeQRCode(true);
								} else {
									alert(dict.alertMessage);
								}
							}}
						>
							{dict.generateButton}
						</button>
					</div>
					{canMakeQRCode && (
						<div className={styles["qrCodeContainer"]}>
							<QRCodeCanvas value={`WIFI:S:${ssid};T:WPA;P:${password};;`} />
						</div>
					)}
				</main>
			</div>
		</>
	);
}
