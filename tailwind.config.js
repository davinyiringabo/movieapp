/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Include main app file
    "./**/*.{js,jsx,ts,tsx}", // Include all JS/TS files recursively
    "./navigation/**/*.{js,jsx,ts,tsx}", // Include navigation files and components
    "./components/**/*.{js,jsx,ts,tsx}", // Include components directory
    "./screens/**/*.{js,jsx,ts,tsx}", // Include screens directory
    "./utils/**/*.{js,jsx,ts,tsx}", // Include utils directory
    // Add more paths as needed based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

