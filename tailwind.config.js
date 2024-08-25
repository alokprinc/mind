// tailwind.config.js
module.exports = {
  content: [
    "./components/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#76a5a7", // Example custom color
        custom: "#76a5a7", // Example custom color
        // Add more custom colors here
      },
    },
  },
  plugins: [],
};
