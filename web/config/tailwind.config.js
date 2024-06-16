import {default as flattenColorPalette} from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export const content = ['src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    animation: {
      aurora: "aurora 60s linear infinite",
    },
    keyframes: {
      aurora: {
        from: {
          backgroundPosition: "50% 50%, 50% 50%",
        },
        to: {
          backgroundPosition: "350% 50%, 350% 50%",
        },
      },
    },
  },
  // screens: {
  //   xs: '0px',
  //   sm: '600px',
  //   md: '900px',
  //   lg: '1200px',
  //   xl: '1536px',
  // },
};
export const plugins = [
  require('daisyui'),
  addVariablesForColors,
];
export const important = true;
export const corePlugins = {
  preflight: false,
};
export const daisyui = {
  themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  darkTheme: "light", // name of one of the included themes for dark mode
  base: true, // applies background color and foreground color for root element by default
  styled: true, // include daisyUI colors and design decisions for all components
  utils: true, // adds responsive and modifier utility classes
  prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  themeRoot: ":root", // The element that receives theme color CSS variables
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
