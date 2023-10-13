/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        impact: ["Impact", "sans-serif"], // Note: Ensure you've included the 'Impact' font in your project or from a CDN like Google Fonts.
        raleway: ["Raleway", "sans-serif"], // Same note applies for 'Raleway'.
      },
      colors: {
        primary: "#F1ECE0", // Replace with your desired hex code
        secondary: "#19191B", // Replace with your desired hex code
        tertiary: "#ff0900", // Replace with your desired hex code
      },
      borderRadius: {
        Banner: "100px", // Replace '15px' with your desired value
      },

      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [],
};
