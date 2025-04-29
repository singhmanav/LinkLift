module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          100: '#E0E7FF',
          600: '#4F46E5',
          700: '#4338CA',
        },
        purple: {
          100: '#F3E8FF',
        },
        red: {
          100: '#FEE2E2',
          600: '#DC2626',
        },
      },
    },
  },
  plugins: [],
}
