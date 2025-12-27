const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                "background-gradient": "background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite",
                aurora: "aurora 60s linear infinite",
            },
            keyframes: {
                "background-gradient": {
                    "0%, 100%": {
                        transform: "translate(0, 0)",
                        animationDelay: "var(--background-gradient-delay, 0s)",
                    },
                    "20%": {
                        transform: "translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))",
                    },
                    "40%": {
                        transform: "translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))",
                    },
                    "60%": {
                        transform: "translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))",
                    },
                    "80%": {
                        transform: "translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))",
                    },
                },
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
    },
    plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
