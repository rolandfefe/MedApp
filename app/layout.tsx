import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Geist_Mono, Poppins,  } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";

const poppinsFont = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	style: "normal",
	display: "auto",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Med App",
	description: "Saving Live is all we do.",
};


export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" suppressHydrationWarning>
			<ClerkProvider
				dynamic
				afterSignOutUrl="/"
				appearance={{ baseTheme: shadcn }}
			>
				<body
					className={`${poppinsFont.className} ${geistMono.variable} antialiased`}
				>
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</ClerkProvider>
		</html>
	);
}
