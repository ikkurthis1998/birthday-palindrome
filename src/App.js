import React, { useState } from "react";
import "./App.css";
import loadingGIF from "./tenor.gif";
import noGIF from "./no.gif";
import yesGIF from "./yes.gif";

const App = () => {
	const [birthday, setBirthday] = useState(null);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);

	const isPalindrome = (string) => {
		for (let i = 0; i < parseInt(string.length / 2); i++) {
			if (string[i] !== string[string.length - (i + 1)]) {
				return false;
			}
		}
		return true;
	};

	const isBirthdayPalindrome = (birthday) => {
		const [year, month, day] = birthday.split("-");

		if (isPalindrome(day + month + year)) {
			return true;
		}

		if (isPalindrome(year + month + day)) {
			return true;
		}

		if (isPalindrome(month + day + year)) {
			return true;
		}

		if (isPalindrome(month + day + year[2] + year[3])) {
			return true;
		}

		return false;
	};

	const nextPalindrome = (date) => {
		let [year, month, day] = date.split("-");
		const newDate = new Date(date);
		while (!isBirthdayPalindrome(day + "-" + month + "-" + year)) {
			newDate.setDate(newDate.getDate() + 1);
			[year, month, day] = newDate.toISOString().split("-");
			day = day[0] + day[1];
		}
		console.log([year, month, day]);
		return [year, month, day];
	};

	const previousPalindrome = (date) => {
		let [year, month, day] = date.split("-");
		const newDate = new Date(date);
		while (!isBirthdayPalindrome(day + "-" + month + "-" + year)) {
			newDate.setDate(newDate.getDate() - 1);
			[year, month, day] = newDate.toISOString().split("-");
			day = day[0] + day[1];
		}
		return [year, month, day];
	};

	const checkBirthdayPalindrome = (birthday) => {
		setSuccess(null);
		setLoading(true);

		setTimeout(() => {
			if (isBirthdayPalindrome(birthday)) {
				setLoading(false);
				setSuccess("yes");
				setMessage("Your birthday is a palindrome");
				return;
			} else {
				const nextPalindromeDate = nextPalindrome(birthday);
				const previousPalindromeDate = previousPalindrome(birthday);

				if (
					new Date(birthday) -
						new Date(
							previousPalindromeDate[0],
							previousPalindromeDate[1] - 1,
							previousPalindromeDate[2]
						) <
					new Date(
						nextPalindromeDate[0],
						nextPalindromeDate[1] - 1,
						nextPalindromeDate[2]
					) -
						new Date(birthday)
				) {
					setLoading(false);
					setSuccess("no");
					setMessage(
						`Your birthday is not a palindrome. Nearest Palindrome: ${new Date(
							previousPalindromeDate[0],
							previousPalindromeDate[1] - 1,
							previousPalindromeDate[2]
						).toDateString()}. You missed it by ${Math.floor(
							(new Date(birthday) -
								new Date(
									previousPalindromeDate[0],
									previousPalindromeDate[1] - 1,
									previousPalindromeDate[2]
								)) /
								(1000 * 3600 * 24)
						)} days`
					);
					return;
				} else {
					setSuccess("no");
					setLoading(false);
					setMessage(
						`Your birthday is not a palindrome. Nearest Palindrome: ${new Date(
							nextPalindromeDate[0],
							nextPalindromeDate[1] - 1,
							nextPalindromeDate[2]
						).toDateString()}. You missed it by ${Math.floor(
							(new Date(
								nextPalindromeDate[0],
								nextPalindromeDate[1] - 1,
								nextPalindromeDate[2]
							) -
								new Date(birthday)) /
								(1000 * 3600 * 24)
						)} days`
					);
					return;
				}
			}
		}, 2000);
	};

	console.log(success);
	return (
		<div className="main-container">
			<h1>Birthday Palindrome</h1>
			<input
				type="date"
				onChange={(e) => {
					setBirthday(e.target.value);
					setMessage(null);
				}}
				className="input"
			/>
			<button
				onClick={() => checkBirthdayPalindrome(birthday)}
				className="button"
			>
				Check
			</button>
			{loading && <img src={loadingGIF} className="loading" />}
			<span className="message">{message}</span>
			{success === "yes" && <img src={yesGIF} className="yes" />}
			{success === "no" && <img src={noGIF} className="no" />}
		</div>
	);
};

export default App;
