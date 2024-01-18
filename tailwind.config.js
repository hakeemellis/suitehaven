module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    
  ],
  darkMode: 'class', // If media, this would allow for system pref. versus toggle
  theme: {
    extend: {
      colors: {
        // Customize your colors here
        white: '#ffffff',
        gray: {
          900: '#1a1a1a',
          800: '#333333',
          // Add more shades as needed
        },
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
  
};

