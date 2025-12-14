import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Merkl Multi-Address Dashboard',
    description: 'View Merkl rewards across multiple wallet addresses',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
