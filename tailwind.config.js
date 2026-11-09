/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-yellow': '#FDFD96', // Soft Yellow
                'pastel-blue': '#AEC6CF',   // Sky Blue concept
                'pastel-green': '#77DD77',  // Mint Green
                'pastel-pink': '#FFB7B2',   // Bonus
            },
            fontFamily: {
                sans: ['"Varela Round"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
