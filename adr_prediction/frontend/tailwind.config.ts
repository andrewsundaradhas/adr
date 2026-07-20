import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Integrated Biosciences token set
        "bioluminescent-lime": "#cef79e",
        "abyssal-ink": "#222f30",
        "bone-white": "#f7f7f5",
        paper: "#ffffff",
        graphite: "#4d5757",
        lichen: "#c9cbbe",
        tissue: "#e7e8e1",
        frost: "#eeeeee",
        void: "#000000",
        // Reserved status scale (validated against dark surface #222f30)
        status: {
          good: "#cef79e",
          warning: "#e3a53f",
          critical: "#ea7a68",
        },
      },
      fontFamily: {
        aspekta: ["var(--font-aspekta)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        caption: ["13px", { lineHeight: "1.23", letterSpacing: "-0.02em" }],
        body: ["18px", { lineHeight: "1.3", letterSpacing: "-0.001em" }],
        "body-lg": ["22px", { lineHeight: "1.3", letterSpacing: "-0.006em" }],
        subheading: ["24px", { lineHeight: "1.2", letterSpacing: "-0.006em" }],
        "heading-sm": ["36px", { lineHeight: "1.2", letterSpacing: "-0.006em" }],
        "heading-lg": ["58px", { lineHeight: "1.1", letterSpacing: "-0.012em" }],
        display: ["75px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["89px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["111px", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        hero: ["158px", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        nav: "12px",
        tag: "9999px",
        card: "20px",
        "card-lg": "40px",
        btn: "8px",
      },
      spacing: {
        18: "4.5rem",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
