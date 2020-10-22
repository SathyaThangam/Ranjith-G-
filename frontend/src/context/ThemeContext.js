import React, { useState, useEffect } from "react";
//Context to pass around the user login session
//Used in: HeaderComponent,AuthenticateModalComponent
const ThemeContext = React.createContext(false);
function ThemeContextProvider(props) {
	// 264653,2a9d8f,e9c46a,f4a261,e76f51
	const initialTheme = {
		"primary-color": "#264653",
		"secondary-color": "#2a9d8f",
		"accent-color": "#e9c46a",
		color: "#000000",
		"background-color": "#FFFFFF",
	};
	const [theme, setTheme] = useState(initialTheme);

	// const set

	// const contrastColor = (hex) =>
	// 	(Number(`0x1${hex.substr(1).toUpperCase()}`) ^ 0xffffff)
	// 		.toString(16)
	// 		.substr(1)
	// 		.toUpperCase();

	useEffect(() => {
		for (const key in theme) {
			if (theme.hasOwnProperty(key)) {
				document.documentElement.style.setProperty(
					`--${key}`,
					theme[key]
				);
			}
		}
		return () => {
			for (const key in theme) {
				if (theme.hasOwnProperty(key)) {
					document.documentElement.style.removeProperty(`--${key}`);
				}
			}
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export { ThemeContext, ThemeContextProvider };
