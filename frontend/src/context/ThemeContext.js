import React, { useState, useEffect } from "react";
//Context to pass around the user login session
//Used in: HeaderComponent,AuthenticateModalComponent
const ThemeContext = React.createContext(false);
function ThemeContextProvider(props) {
	const initialTheme = {
		"primary-color": "#b1ffd1",
		"secondary-color": "#2660a4",
		"accent-color": "#fa8334",
		"color": "#000000",
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
			document.documentElement.style.setProperty(
				"--primary-color",
				`#b1ffd0`
			);
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export { ThemeContext, ThemeContextProvider };
