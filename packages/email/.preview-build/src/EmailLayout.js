import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Html, Preview, Section, Text, } from "@react-email/components";
const styles = {
    body: {
        margin: 0,
        backgroundColor: "#efe7d8",
        color: "#1d180f",
        fontFamily: "\"Georgia\", serif",
    },
    container: {
        maxWidth: "640px",
        margin: "0 auto",
        padding: "32px 20px 40px",
    },
    card: {
        backgroundColor: "#fbf8f1",
        border: "1px solid #d7cab2",
        borderRadius: "22px",
        padding: "28px",
    },
    title: {
        fontSize: "28px",
        lineHeight: "1.3",
        margin: "0 0 12px",
    },
    intro: {
        color: "#5e513f",
        fontSize: "15px",
        lineHeight: "1.7",
        margin: "0 0 18px",
    },
    outro: {
        color: "#5e513f",
        fontSize: "13px",
        lineHeight: "1.6",
        margin: "20px 0 0",
    },
};
export function EmailLayout({ previewText, title, intro, children, outro, }) {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: previewText }), _jsx(Body, { style: styles.body, children: _jsx(Container, { style: styles.container, children: _jsxs(Section, { style: styles.card, children: [_jsx(Text, { style: styles.title, children: title }), intro ? _jsx(Text, { style: styles.intro, children: intro }) : null, _jsx(Section, { children: children }), outro ? _jsx(Text, { style: styles.outro, children: outro }) : null] }) }) })] }));
}
