// Root layout - delegates HTML structure to [locale]/layout.tsx
// This file MUST exist for Next.js App Router but should NOT
// render <html> or <body> tags to avoid double-wrapping.

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
