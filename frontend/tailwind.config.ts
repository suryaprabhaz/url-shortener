import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#6366f1", // Indigo 500
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1e293b", // Slate 800
                    foreground: "#ffffff",
                },
                destructive: {
                    DEFAULT: "#ef4444", // Red 500
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#f1f5f9", // Slate 100
                    foreground: "#64748b", // Slate 500
                },
                accent: {
                    DEFAULT: "#f8fafc", // Slate 50
                    foreground: "#0f172a", // Slate 900
                },
            },
        },
    },
    plugins: [],
};
export default config;
