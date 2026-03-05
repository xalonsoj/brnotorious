import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#000000",
                secondary: "#E63946",
                "background-light": "#ffffff",
                "background-dark": "#121212",
                "surface-light": "#f4f4f5",
                "surface-dark": "#1e1e1e",
                "text-light": "#1f2937",
                "text-dark": "#f3f4f6",
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0px",
                'lg': "0.5rem",
                'xl': "1rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
};
export default config;
