import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
title: "Bubble – Pop Your Bubble",
description: "Meet people by attending events outside your usual zone.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-white text-slate-900 antialiased">
{children}
</body>
</html>
);
}


