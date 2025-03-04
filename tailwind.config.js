/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], 
        prata: ["Prata", "serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      keyframes: {
        shine: {
          "0%": { "-webkit-mask-position": "150%" },
          "100%": { "-webkit-mask-position": "-50%" },
        },
        slideArrow: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        shine: "shine 2s infinite",
        'slide-arrow': 'slideArrow 1s infinite',
        "slide-in": "slideIn 1s ease-out",
      },
    },
  },
  plugins: [],
};
