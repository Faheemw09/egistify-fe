module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Ensure the correct files are being scanned
  theme: {
    extend: {
      colors: {
        color2: "#df8600",
        color3: "#004de1",
        color4: "#94683e",
        color5: "#ff6868",
      },
    },
  },
  plugins: [],
  mode: "jit", // Ensure JIT mode is enabled
};
