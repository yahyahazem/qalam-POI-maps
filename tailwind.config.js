/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                qalam: {
                    teal: "#008080",
                    bg: "#F9FAFB",
                    text: "#1F2937",
                }
            },
            borderRadius: {
                'qalam': '12px',
            },
            boxShadow: {
                'qalam': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'qalam-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
};
