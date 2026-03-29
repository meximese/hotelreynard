import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type EmailLayoutProps = {
  previewText: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  outro?: string;
};

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
  text: {
    fontSize: "15px",
    lineHeight: "1.7",
    margin: "0 0 14px",
  },
  outro: {
    color: "#5e513f",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "20px 0 0",
  },
};

export default function EmailLayout({
  previewText,
  title,
  intro,
  children,
  outro,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {intro ? <Text style={styles.intro}>{intro}</Text> : null}
            <Section style={styles.text}>{children}</Section>
            {outro ? <Text style={styles.outro}>{outro}</Text> : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
