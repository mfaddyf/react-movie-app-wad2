import { createTheme } from "@mui/material/styles";

// App-wide theme: every MUI component reads its colours, font, sizes and
// corner rounding from here, so changing a value here restyles the whole app
// easier to colour scheme and schtuff
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#6568ff" },   // coral: buttons, chips, pagination, active tab
        secondary: { main: "#4db6ac" }, // teal: accents
        background: {
            default: "#101014",           // page background
            paper: "#1b1b22",             // cards, header, menus
        },
        divider: "rgba(255,255,255,0.08)",
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
        // MUI's default base size is 14px; 13px shrinks every text variant slightly
        fontSize: 13,
        h1: { fontSize: "2.4rem", fontWeight: 600 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        h3: { fontSize: "1.75rem", fontWeight: 600 },
        h4: { fontSize: "1.45rem", fontWeight: 600 },
        h5: { fontSize: "1.15rem", fontWeight: 600 },
        h6: { fontSize: "1rem", fontWeight: 600 },
        subtitle1: { fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.3 },
        body1: { fontSize: "0.9rem", lineHeight: 1.7 },
        body2: { fontSize: "0.8rem" },
        button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
        },
        MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { border: "1px solid rgba(255,255,255,0.06)" },
            },
        },
        MuiPaper: {
            styleOverrides: {
                // Remove the grey "elevation overlay" MUI adds to paper in dark mode
                root: { backgroundImage: "none" },
            },
        },
        MuiChip: {
            defaultProps: { size: "small" },
        },
        MuiTab: {
            styleOverrides: {
                root: { minHeight: 48, fontWeight: 600 },
            },
        },
    },
});

export default theme;