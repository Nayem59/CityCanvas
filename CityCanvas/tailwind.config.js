/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// main colour
				pink: "#C13584",
				// input field & nav icons
				"light-gray": "#BDBABA",
				//headings
				"md-gray": "#9B9B9B",
				//text colour
				black: "#000000",
				//text colour
				white: "#FFFFFF",
				//pins on map
				blue: "#0476D0",
			},

			fontFamily: {
				//all fonts are the same
				// fontSize:24px - headers
				// fontSize:15px - input/text
				// fontSize:10px - link text for location and file upload
				// fontSize:13px - button text/not yet registered text
				// fontSize:16px - continue with apple/google text
				//poppins doesn't work
				poppins: ["Poppins", "sans-serif"],
				sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
			},
			borderRadius: {
				//pics/text cards - 20px
				brm: "1.25rem",
				//buttons 4px
				brs: "0.25rem",
			},
			spacing: {
				sm: "8px",
				md: "12px",
				lg: "16px",
				xl: "24px",
			},
		},
	},
	plugins: [],
};
