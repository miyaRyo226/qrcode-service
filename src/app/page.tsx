"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [ssid, setSsid] = useState("");
	const [password, setPassword] = useState("");
	const [canMakeQRCode, setCanMakeQRCode] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
			setIsDarkMode(true);
			document.documentElement.style.colorScheme = "dark";
		} else {
			document.documentElement.style.colorScheme = "light";
		}
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

	return (
		<>
			<button
				type="button"
				className="theme-toggle"
				onClick={toggleTheme}
				aria-label={
					isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"
				}
			>
				{isDarkMode ? "☀️" : "🌙"}
			</button>
			<h1 className={styles["title"]}>QRコード作成</h1>
			<div className={styles["container"]}>
				<main className={styles["main"]}>
					<div className={styles["inputGroup"]}>
						<label htmlFor="ssid-input" className={styles["label"]}>
							SSID
						</label>
						<input
							id="ssid-input"
							type="text"
							className={styles["inputField"]}
							placeholder="SSIDを入力"
							value={ssid}
							onChange={(e) => setSsid(e.target.value)}
						/>
					</div>
					<div className={styles["inputGroup"]}>
						<label htmlFor="password-input" className={styles["label"]}>
							WIFIパスワード
						</label>
						<input
							id="password-input"
							type="password"
							className={styles["inputField"]}
							placeholder="パスワードを入力"
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
							入力クリア
						</button>
						<button
							type="button"
							className={`${styles["button"]} ${styles["generateButton"]}`}
							onClick={() => {
								if (ssid.length > 0 && password.length > 0) {
									setCanMakeQRCode(true);
								} else {
									alert("SSIDとパスワードを入力してください");
								}
							}}
						>
							QRコードを作成
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
